const yahooFinance = require("yahoo-finance2").default;

module.exports = (app) => {
  app.get("/api/get_balance/:tkr", async (req, res) => {
    const tkr = req.params.tkr.toUpperCase();
    const result = await yahooFinance.quoteSummary(tkr, {
      modules: ["balanceSheetHistory"],
    });
    const lastFiscal = result.balanceSheetHistory.balanceSheetStatements[0];
    const previousFiscal = result.balanceSheetHistory.balanceSheetStatements[1];
    res.send({ lastFiscal, previousFiscal });
  });
  app.get("/api/get_financials/:tkr", async (req, res) => {
    const tkr = req.params.tkr.toUpperCase();
    const result = await yahooFinance.quoteSummary(tkr, {
      modules: ["incomeStatementHistory"],
    });

    res.send(result.incomeStatementHistory.incomeStatementHistory);
  });
  app.get("/api/get_cashflow/:tkr", async (req, res) => {
    const tkr = req.params.tkr.toUpperCase();
    const result = await yahooFinance.quoteSummary(tkr, {
      modules: ["cashflowStatementHistory"],
    });

    res.send(result.cashflowStatementHistory.cashflowStatements);
  });
  app.get("/api/get_key_stats/:tkr", async (req, res) => {
    const tkr = req.params.tkr.toUpperCase();
    const result = await yahooFinance.quoteSummary(tkr, {
      modules: ["defaultKeyStatistics"],
    });

    res.send(result.defaultKeyStatistics);
  });
  app.get("/api/get_financial_data/:tkr", async (req, res) => {
    const tkr = req.params.tkr.toUpperCase();
    const result = await yahooFinance.quoteSummary(tkr, {
      modules: ["financialData"],
    });

    res.send(result.financialData);
  });
  app.get("/api/get_asset_profile/:tkr", async (req, res) => {
    const tkr = req.params.tkr.toUpperCase();
    const result = await yahooFinance.quoteSummary(tkr, {
      modules: ["assetProfile"],
    });

    res.send(result.assetProfile);
  });
  app.get("/api/get_all_financials/:tkr", async (req, res) => {
    const tkr = req.params.tkr.toUpperCase();
    const result = await yahooFinance.quoteSummary(tkr, {
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

    const cleanResult = {
      profile: result.assetProfile,
      balanceSheets: {
        lastFiscal: result.balanceSheetHistory.balanceSheetStatements[0],
        previousFiscal: result.balanceSheetHistory.balanceSheetStatements[1],
      },
      incomeStatements: result.incomeStatementHistory.incomeStatementHistory,
      cashflowStatements: result.cashflowStatementHistory.cashflowStatements,
      keyStats: result.defaultKeyStatistics,
      financialData: result.financialData,
      summary: result.price,
    };

    res.send(cleanResult);
  });
};
