import { Stock } from "@/lib/interfaces/stock";

export const MOCK_STOCKS: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 170.35 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 300.12 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 120.55 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 650.4 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 3300.0 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 220.5 },
  { symbol: "DIS", name: "Walt Disney Co.", price: 180.0 },
  { symbol: "V", name: "Visa Inc.", price: 250.0 },
  { symbol: "FB", name: "Meta Platforms Inc.", price: 350.25 },
  { symbol: "JNJ", name: "Johnson & Johnson", price: 160.0 },
  { symbol: "PG", name: "Procter & Gamble Co.", price: 140.0 },
  { symbol: "UNH", name: "UnitedHealth Group Inc.", price: 400.0 },
  { symbol: "HD", name: "Home Depot Inc.", price: 300.0 },
  { symbol: "VZ", name: "Verizon Communications Inc.", price: 55.0 },
  { symbol: "PEP", name: "PepsiCo Inc.", price: 150.0 },
  { symbol: "KO", name: "Coca-Cola Co.", price: 60.0 },
  { symbol: "CMCSA", name: "Comcast Corp.", price: 50.0 },
  { symbol: "T", name: "AT&T Inc.", price: 30.0 },
  { symbol: "MRK", name: "Merck & Co. Inc.", price: 80.0 },
  { symbol: "PFE", name: "Pfizer Inc.", price: 40.0 },
  { symbol: "CSCO", name: "Cisco Systems Inc.", price: 55.0 },
  { symbol: "INTC", name: "Intel Corp.", price: 55.0 },
  { symbol: "AMD", name: "Advanced Micro Devices Inc.", price: 100.0 },
  { symbol: "ADBE", name: "Adobe Inc.", price: 500.0 },
  { symbol: "PYPL", name: "PayPal Holdings Inc.", price: 250.0 },
  { symbol: "CRM", name: "Salesforce.com Inc.", price: 250.0 },
  { symbol: "NFLX", name: "Netflix Inc.", price: 500.75 },
  { symbol: "BA", name: "Boeing Co.", price: 210.45 },
  { symbol: "WMT", name: "Walmart Inc.", price: 158.32 },
  { symbol: "MCD", name: "McDonald's Corp.", price: 282.19 },
  { symbol: "SBUX", name: "Starbucks Corp.", price: 98.44 },
  { symbol: "NKE", name: "Nike Inc.", price: 112.67 },
  { symbol: "ORCL", name: "Oracle Corp.", price: 120.55 },
  { symbol: "COST", name: "Costco Wholesale Corp.", price: 715.23 },
  { symbol: "TMO", name: "Thermo Fisher Scientific Inc.", price: 540.12 },
  { symbol: "ABT", name: "Abbott Laboratories", price: 110.33 },
  { symbol: "LLY", name: "Eli Lilly and Co.", price: 780.45 },
  { symbol: "CVX", name: "Chevron Corp.", price: 162.88 },
  { symbol: "XOM", name: "Exxon Mobil Corp.", price: 110.12 },
  { symbol: "WFC", name: "Wells Fargo & Co.", price: 56.77 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 195.33 },
  { symbol: "GS", name: "Goldman Sachs Group Inc.", price: 410.22 },
  { symbol: "BLK", name: "BlackRock Inc.", price: 780.11 },
  { symbol: "AXP", name: "American Express Co.", price: 210.55 },
  { symbol: "BKNG", name: "Booking Holdings Inc.", price: 3400.0 },
  { symbol: "QCOM", name: "QUALCOMM Inc.", price: 175.44 },
  { symbol: "TXN", name: "Texas Instruments Inc.", price: 170.12 },
  { symbol: "HON", name: "Honeywell International Inc.", price: 202.33 },
  { symbol: "MMM", name: "3M Co.", price: 98.22 },
  { symbol: "GE", name: "General Electric Co.", price: 162.77 },
  { symbol: "CAT", name: "Caterpillar Inc.", price: 325.66 },
  { symbol: "UPS", name: "United Parcel Service Inc.", price: 151.22 },
  { symbol: "FDX", name: "FedEx Corp.", price: 256.33 },
  { symbol: "GM", name: "General Motors Co.", price: 44.12 },
  { symbol: "F", name: "Ford Motor Co.", price: 13.55 },
  { symbol: "DE", name: "Deere & Co.", price: 382.44 },
  { symbol: "SPGI", name: "S&P Global Inc.", price: 425.11 },
  { symbol: "ICE", name: "Intercontinental Exchange Inc.", price: 135.22 },
  { symbol: "MO", name: "Altria Group Inc.", price: 43.77 },
  { symbol: "SO", name: "Southern Co.", price: 74.88 },
  { symbol: "DUK", name: "Duke Energy Corp.", price: 98.33 },
  { symbol: "NEE", name: "NextEra Energy Inc.", price: 72.44 },
  { symbol: "D", name: "Dominion Energy Inc.", price: 51.22 },
  { symbol: "AEP", name: "American Electric Power Co.", price: 87.55 },
  { symbol: "PLD", name: "Prologis Inc.", price: 120.33 },
  { symbol: "CCI", name: "Crown Castle Inc.", price: 98.44 },
  { symbol: "EQIX", name: "Equinix Inc.", price: 820.11 },
  { symbol: "PSA", name: "Public Storage", price: 285.77 },
  { symbol: "O", name: "Realty Income Corp.", price: 54.22 },
  { symbol: "SBAC", name: "SBA Communications Corp.", price: 210.66 },
  { symbol: "AMT", name: "American Tower Corp.", price: 190.44 },
  { symbol: "AVB", name: "AvalonBay Communities Inc.", price: 190.22 },
  { symbol: "EQR", name: "Equity Residential", price: 65.33 },
  { symbol: "ESS", name: "Essex Property Trust Inc.", price: 245.11 },
  { symbol: "MA", name: "Mastercard Inc.", price: 410.55 },
  { symbol: "LMT", name: "Lockheed Martin Corp.", price: 470.33 },
  { symbol: "GD", name: "General Dynamics Corp.", price: 295.44 },
  { symbol: "RTN", name: "Raytheon Technologies Corp.", price: 105.22 },
  { symbol: "NOC", name: "Northrop Grumman Corp.", price: 470.77 },
  { symbol: "ADP", name: "Automatic Data Processing Inc.", price: 245.88 },
  { symbol: "INTU", name: "Intuit Inc.", price: 620.44 },
  { symbol: "NOW", name: "ServiceNow Inc.", price: 700.11 },
  { symbol: "ISRG", name: "Intuitive Surgical Inc.", price: 390.22 },
  { symbol: "MDT", name: "Medtronic plc", price: 85.33 },
  { symbol: "SYK", name: "Stryker Corp.", price: 340.44 },
  { symbol: "BSX", name: "Boston Scientific Corp.", price: 72.55 },
  { symbol: "ZTS", name: "Zoetis Inc.", price: 180.66 },
  { symbol: "GILD", name: "Gilead Sciences Inc.", price: 68.77 },
  { symbol: "VRTX", name: "Vertex Pharmaceuticals Inc.", price: 420.88 },
  { symbol: "REGN", name: "Regeneron Pharmaceuticals Inc.", price: 950.22 },
  { symbol: "BIIB", name: "Biogen Inc.", price: 225.44 },
  { symbol: "BMY", name: "Bristol-Myers Squibb Co.", price: 45.33 },
  { symbol: "ABBV", name: "AbbVie Inc.", price: 160.22 },
  { symbol: "AZN", name: "AstraZeneca PLC", price: 78.44 },
  { symbol: "SNY", name: "Sanofi", price: 52.11 },
  { symbol: "NVS", name: "Novartis AG", price: 105.77 },
  { symbol: "UBER", name: "Uber Technologies Inc.", price: 68.44 },
  { symbol: "LYFT", name: "Lyft Inc.", price: 15.33 },
  { symbol: "SQ", name: "Block Inc.", price: 70.22 },
  { symbol: "SHOP", name: "Shopify Inc.", price: 65.44 },
  { symbol: "TWTR", name: "Twitter Inc.", price: 54.2 },
  { symbol: "SNAP", name: "Snap Inc.", price: 11.55 },
  { symbol: "ZM", name: "Zoom Video Communications Inc.", price: 65.33 },
  { symbol: "DOCU", name: "DocuSign Inc.", price: 52.44 },
  { symbol: "ROKU", name: "Roku Inc.", price: 70.11 },
  { symbol: "SPOT", name: "Spotify Technology S.A.", price: 285.77 },
  { symbol: "NET", name: "Cloudflare Inc.", price: 90.22 },
  { symbol: "CRWD", name: "CrowdStrike Holdings Inc.", price: 320.44 },
  { symbol: "OKTA", name: "Okta Inc.", price: 85.33 },
  { symbol: "ZS", name: "Zscaler Inc.", price: 180.55 },
  { symbol: "DDOG", name: "Datadog Inc.", price: 120.44 },
  { symbol: "MDB", name: "MongoDB Inc.", price: 370.22 },
  { symbol: "PLTR", name: "Palantir Technologies Inc.", price: 22.44 },
  { symbol: "FSLY", name: "Fastly Inc.", price: 12.33 },
  { symbol: "SPLK", name: "Splunk Inc.", price: 150.22 },
  { symbol: "TEAM", name: "Atlassian Corp.", price: 190.44 },
  { symbol: "WDAY", name: "Workday Inc.", price: 230.55 },
  { symbol: "PANW", name: "Palo Alto Networks Inc.", price: 320.66 },
  { symbol: "FTNT", name: "Fortinet Inc.", price: 65.77 },
  { symbol: "DOCN", name: "DigitalOcean Holdings Inc.", price: 38.44 },
  { symbol: "HUBS", name: "HubSpot Inc.", price: 570.22 },
  { symbol: "ASML", name: "ASML Holding NV", price: 950.33 },
  { symbol: "TMUS", name: "T-Mobile US Inc.", price: 160.44 },
  { symbol: "CHTR", name: "Charter Communications Inc.", price: 290.22 },
  { symbol: "DASH", name: "DoorDash Inc.", price: 110.55 },
  { symbol: "TDG", name: "TransDigm Group Inc.", price: 1300.12 },
  { symbol: "MTCH", name: "Match Group Inc.", price: 36.44 },
  { symbol: "ROST", name: "Ross Stores Inc.", price: 142.55 },
  { symbol: "DLTR", name: "Dollar Tree Inc.", price: 120.33 },
  { symbol: "KHC", name: "Kraft Heinz Co.", price: 35.22 },
  { symbol: "STZ", name: "Constellation Brands Inc.", price: 260.44 },
  { symbol: "EL", name: "Estee Lauder Companies Inc.", price: 145.77 },
  { symbol: "CL", name: "Colgate-Palmolive Co.", price: 93.88 },
  { symbol: "KR", name: "Kroger Co.", price: 54.22 },
  { symbol: "ADM", name: "Archer-Daniels-Midland Co.", price: 61.33 },
  { symbol: "GIS", name: "General Mills Inc.", price: 68.44 },
  { symbol: "KMB", name: "Kimberly-Clark Corp.", price: 128.55 },
  { symbol: "HSY", name: "Hershey Co.", price: 197.22 },
  { symbol: "MKC", name: "McCormick & Co. Inc.", price: 77.44 },
  { symbol: "TSN", name: "Tyson Foods Inc.", price: 56.33 },
  { symbol: "CAG", name: "Conagra Brands Inc.", price: 29.88 },
  { symbol: "SJM", name: "J.M. Smucker Co.", price: 114.22 },
  { symbol: "HRL", name: "Hormel Foods Corp.", price: 33.44 },
  { symbol: "CPB", name: "Campbell Soup Co.", price: 44.11 },
  { symbol: "K", name: "Kellanova", price: 59.22 },
  { symbol: "LW", name: "Lamb Weston Holdings Inc.", price: 98.33 },
  { symbol: "POST", name: "Post Holdings Inc.", price: 101.44 },
  { symbol: "BG", name: "Bunge Global SA", price: 113.22 },
  { symbol: "FMC", name: "FMC Corp.", price: 58.77 },
  { symbol: "MOS", name: "Mosaic Co.", price: 29.44 },
  { symbol: "CF", name: "CF Industries Holdings Inc.", price: 80.33 },
  { symbol: "NTR", name: "Nutrien Ltd.", price: 56.22 },
  { symbol: "SMG", name: "Scotts Miracle-Gro Co.", price: 67.11 },
  { symbol: "AVY", name: "Avery Dennison Corp.", price: 210.44 },
  { symbol: "PKG", name: "Packaging Corp. of America", price: 182.33 },
  { symbol: "IP", name: "International Paper Co.", price: 36.22 },
  { symbol: "WRK", name: "WestRock Co.", price: 51.44 },
  { symbol: "SEE", name: "Sealed Air Corp.", price: 33.77 },
  { symbol: "SON", name: "Sonoco Products Co.", price: 56.88 },
  { symbol: "GPK", name: "Graphic Packaging Holding Co.", price: 27.44 },
  { symbol: "SLGN", name: "Silgan Holdings Inc.", price: 44.22 },
  { symbol: "BERY", name: "Berry Global Group Inc.", price: 62.33 },
  { symbol: "BLL", name: "Ball Corp.", price: 62.44 },
  { symbol: "OI", name: "O-I Glass Inc.", price: 13.22 },
  { symbol: "AMCR", name: "Amcor PLC", price: 9.88 },
  { symbol: "CCK", name: "Crown Holdings Inc.", price: 81.44 },
  { symbol: "ATR", name: "AptarGroup Inc.", price: 143.22 },
  { symbol: "AVNT", name: "Avient Corp.", price: 44.11 },
  { symbol: "EMN", name: "Eastman Chemical Co.", price: 98.44 },
  { symbol: "CE", name: "Celanese Corp.", price: 153.33 },
  { symbol: "LYB", name: "LyondellBasell Industries NV", price: 97.22 },
  { symbol: "HUN", name: "Huntsman Corp.", price: 22.44 },
  { symbol: "ALB", name: "Albemarle Corp.", price: 120.55 },
  { symbol: "ASH", name: "Ashland Inc.", price: 98.77 },
  { symbol: "RPM", name: "RPM International Inc.", price: 110.44 },
  { symbol: "FUL", name: "H.B. Fuller Co.", price: 78.33 },
  { symbol: "PPG", name: "PPG Industries Inc.", price: 138.22 },
  { symbol: "SHW", name: "Sherwin-Williams Co.", price: 312.44 },
  { symbol: "VAL", name: "Valvoline Inc.", price: 41.22 },
  { symbol: "GRA", name: "W.R. Grace & Co.", price: 69.44 },
  { symbol: "APD", name: "Air Products & Chemicals Inc.", price: 260.33 },
  { symbol: "LIN", name: "Linde PLC", price: 420.44 },
  { symbol: "ECL", name: "Ecolab Inc.", price: 230.22 },
  { symbol: "ALC", name: "Alcon Inc.", price: 85.33 },
  { symbol: "STE", name: "STERIS plc", price: 220.44 },
  { symbol: "WST", name: "West Pharmaceutical Services Inc.", price: 340.55 },
  { symbol: "DHR", name: "Danaher Corp.", price: 250.66 },
  { symbol: "MTD", name: "Mettler-Toledo International Inc.", price: 1450.22 },
  { symbol: "IDXX", name: "IDEXX Laboratories Inc.", price: 510.44 },
  { symbol: "BIO", name: "Bio-Rad Laboratories Inc.", price: 320.33 },
  { symbol: "BRKR", name: "Bruker Corp.", price: 72.44 },
  { symbol: "TECH", name: "Bio-Techne Corp.", price: 78.22 },
  { symbol: "A", name: "Agilent Technologies Inc.", price: 130.44 },
  { symbol: "PKI", name: "PerkinElmer Inc.", price: 140.33 },
  { symbol: "WAT", name: "Waters Corp.", price: 320.44 },
  { symbol: "CRL", name: "Charles River Laboratories Intl.", price: 210.22 },
  { symbol: "LH", name: "Laboratory Corp. of America Holdings", price: 210.44 },
  { symbol: "DGX", name: "Quest Diagnostics Inc.", price: 135.22 },
  { symbol: "IQV", name: "IQVIA Holdings Inc.", price: 220.33 },
  { symbol: "INCY", name: "Incyte Corp.", price: 58.44 },
  { symbol: "ALNY", name: "Alnylam Pharmaceuticals Inc.", price: 170.22 },
];
