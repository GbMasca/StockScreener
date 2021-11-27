export const indexChoice = {
    choice: [
        "returnOnAssets",
        "returnOnEquity",
        "totalCash",
        "ebitda",
        "profitMargins",
        "grossProfits",
        "marketCap",
        "debtToEquity",
        "enterpriseToRevenue",
        "enterpriseToEbitda",
        "dividendsYield",
        "debtToEbitda",
    ],
    toFront:  {
        "returnOnAssets": "Return on Assets",
        "returnOnEquity": "Return on Equity",
        "totalCash": "Total Cash",
        "ebitda": "EBITDA",
        "profitMargins": "Profit Margins",
        "grossProfits": "Gross Profit",
        "marketCap": "Market Cap",
        "debtToEquity": "Debt/Equity",
        "enterpriseToRevenue": "EV/Revenue",
        "enterpriseToEbitda": "EV/EBITDA",
        "dividendsYield": "Dividend Yield",
        "debtToEbitda": "Debt/EBITDA",
    }
}

export const formatNumber = (value, index) => {
    const million = 1000000
    const billion = 1000000000
    const isPercentList = ["dividendsYield", "profitMargins"]

    if (isPercentList.includes(index)) {
        const formatted = Number(value*100).toFixed(2)
        return formatted + "%"
    }
    if (value > 1000000 && value < 1000000000) {
        const formatted = String(Math.round(value/million))
        return formatted + "M"
    } else if (value > billion) {
        const formatted = String(Math.round(value/billion))
        return formatted + "B"
    } else {
        return Number(value).toFixed(2)
    }
}
