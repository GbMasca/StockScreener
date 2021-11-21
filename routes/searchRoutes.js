const mongoose = require("mongoose");

const Search = mongoose.model("search");

const yahooFinance = require("yahoo-finance2").default;

const finviz = require("finviz-screener");
const Screener = finviz();

const indexChoices = require("../utils/indexChoices")

module.exports = (app) => {
  app.post("/api/new_search", async (req, res) => {
    const { name, searchIndex, industry, sector } = req.body;

    const search = new Search({
      name,
      industry,
      sector,
      _user: req.user.id,
    });

    if (searchIndex) {
      search.searchIndex = searchIndex.split(",").map((indexes) => {
        return getIndexObject(indexes);
      });
    }

    await search.save();
    req.user.currentSearch = search.id;

    const user = await req.user.save();
    res.send(user);
  });

  app.get("/api/get_search/:thisSearch", async (req, res) => {
    const thisSearch = req.params.thisSearch;
    const result = await Search.findOne({ _id: thisSearch });
    res.send(result);
  });

  app.get("/api/search/:thisSearch", async (req, res) => {
    const thisSearchID = req.params.thisSearch;
    const thisSearch = await Search.findOne({ _id: thisSearchID });
    const searchIndex = thisSearch.searchIndex;

    const results = await Screener.sector(thisSearch.sector)
      .industry(thisSearch.industry)
      .scan();

    const rawFinancials = await getFinancials(results);
    const financials = cleanFinancials(rawFinancials);

    const matches = findMatches(financials, searchIndex);

    res.send(matches);
  });

  app.get("/api/get_user_searches", async (req, res) => {
    const user = req.user;
    const searches = await Search.find({ _user: user.id });

    res.send(searches);
  });

  app.post("/api/update_current_search/", async (req, res) => {
    const { _id } = req.body;
    req.user.currentSearch = _id;

    const user = await req.user.save();
    res.send(user);
  });

  app.post("/api/edit_search/:thisSearch", async (req, res) => {
    const { name, searchIndex, industry, sector } = req.body;
    const thisSearchID = req.params.thisSearch;
    const thisSearch = await Search.findOne({ _id: thisSearchID });

    thisSearch.name = name;
    thisSearch.sector = sector;
    thisSearch.industry = industry;

    if (searchIndex) {
      thisSearch.searchIndex = searchIndex.split(",").map((indexes) => {
        return getIndexObject(indexes);
      });
    } else {
      thisSearch.searchIndex = []
    }
    await thisSearch.save();
    res.send(thisSearch);
  });

};

function getIndexObject(index) {
  const thisIndex = index.split(" ");
  const thisIndexObject = {
    index: thisIndex[0],
    value: thisIndex[1],
  };
  if (thisIndex[2]) {
    thisIndexObject.errorMargin = thisIndex[2];
  }
  return thisIndexObject;
}

function getFinancials(tkrs) {
  const financials = tkrs.map(async (tkr) => {
    let result;
    try {
      result = await yahooFinance.quoteSummary(tkr, {
        modules: [
          "assetProfile",
          "balanceSheetHistory",
          "incomeStatementHistory",
          "cashflowStatementHistory",
          "defaultKeyStatistics",
          "financialData",
          "price",
        ],
      });
    } catch (error) {
      result = error.result;
    }

    return result;
  });

  return Promise.all(financials);
}

function cleanFinancials(financials) {
  return financials.map((financial) => {
    const cleanFin =  {
      profile: financial.assetProfile,
      balanceSheets: {
        lastFiscal: financial.balanceSheetHistory.balanceSheetStatements[0],
        previousFiscal: financial.balanceSheetHistory.balanceSheetStatements[1],
      },
      incomeStatements: financial.incomeStatementHistory.incomeStatementHistory,
      cashflowStatements: financial.cashflowStatementHistory.cashflowStatements,
      keyStats: financial.defaultKeyStatistics,
      financialData: financial.financialData,
      summary: financial.price,
      toSearch: {
        ROA: financial.financialData.returnOnAssets,
        ROE: financial.financialData.returnOnEquity,
        beta: financial.defaultKeyStatistics.beta,
      },
    };
    cleanFin.toSearch = buildToSearch(indexChoices.choices, cleanFin)
    cleanFin.toSearch.dividendsYield = calculateDividendYield(cleanFin)
    cleanFin.toSearch.debtToEbitda = calculateDebtToEbitda(cleanFin)
    return cleanFin
  });
}

function findMatches(financials, indexes) {
  const matches = {
    bestMatch: {},
    matches: [],
  };

  let currentBest = 100000000;
  let isFirst = true;

  financials.map((financial) => {
    const isMatch = findMatch(financial, indexes);
    if (isMatch) {
      if (currentBest > isMatch) {
        if (!isFirst) {
          matches.matches.push(matches.bestMatch);
          isFirst = false;
        }
        matches.bestMatch = financial;
        currentBest = isMatch;
      } else {
        matches.matches.push(financial);
      }
    }
  });

  return matches;
}

function findMatch(financial, indexes) {
  const toSearch = financial.toSearch;
  let isMatch = 0;

  if (indexes.length < 1) {
    return 10000000;
  }

  for (let i = 0; i < indexes.length; i++) {
    const thisIndex = indexes[i];
    const index = thisIndex.index;
    const value = Number(thisIndex.value);
    const upperBound = value + (Number(thisIndex.errorMargin) / 100) * value;
    const lowerBound = value - (Number(thisIndex.errorMargin) / 100) * value;

    const thisValue = Number(toSearch[index]);
    if (thisValue < lowerBound || thisValue > upperBound) {
      return false;
    }

    isMatch += Math.abs(thisValue - value);
  }

  return isMatch;
}

const buildToSearch = (choices, fin) => {
  const toS = {}
  choices.map(i => {
    const thisI = queryIndex(fin, i)
    thisI.map(v => {
      if(v) {
        toS[i] = v
      }
    })
  })

  return toS
};

const queryIndex = (obj, prop) => {
  const s = Object.keys(obj).map(k => {
    if(obj[k][prop]) {
      return obj[k][prop]
    }
    return false
  })

  return s
};

const calculateDividendYield = (fin) => {
  let payed;
  let sharesOutstanding;
  let yield;
  let price;
  try {
    payed = Math.abs(fin.cashflowStatements[0].dividendsPaid)
    sharesOutstanding = fin.keyStats.sharesOutstanding
    price = fin.financialData.currentPrice
    const payedPerShare = payed/sharesOutstanding
    yield = payedPerShare/price
    return yield * 100
  } catch (error) {
    return
  }
};

const calculateDebtToEbitda = (fin) => {
  let ebitda;
  let debt;
  try {
    debt = fin.financialData.totalDebt
    ebitda = fin.financialData.ebitda
    return debt/ebitda

  } catch (error) {
    return
  }
};
