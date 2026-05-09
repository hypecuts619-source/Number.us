# Routing Number Data Strategy & Compliance Guide

USRoutingNumber.com currently hosts **17,777 active ABA routing numbers**. This covers approximately 95% of active routes used in the United States today.

To acquire the final few hundred routing numbers and maintain continuous updates, you must adhere strictly to compliance regulations. The Federal Reserve's `FedACHdir.txt` file is **no longer publicly downloadable** as of late 2018; access requires authorized FedLine Web credentials, which cannot be used to power a public commercial directory.

## How to Get the Full, Updated Database Compliantly

ABA Routing Transit Numbers are intellectual property of the **American Bankers Association (ABA)**. To compliantly host a commercial directory and get daily updates, follow these steps:

### 1. Purchase a Commercial License
The sole official registrar for ABA routing numbers is **LexisNexis Risk Solutions (formerly Accuity)**.
To get daily or monthly updates of the complete routing number database:
- Contact LexisNexis Risk Solutions (Accuity).
- Request the **"ABA Routing Number Subscription"** (often delivered via SFTP as a flat file or CSV).
- You will need a commercial licensing agreement to display these publicly on your site.

### 2. Alternative: Third-Party Validation APIs
If you cannot afford the enterprise license from Accuity, you can rely on third-party APIs that have already licensed the data, combining them with your existing directory.
- **Stripe API:** Bank Account Validation (for verification only).
- **Melissa Data / RoutingNumbers.info:** Often provide cheaper tiered API endpoints.

### 3. Community / Manual Verification
Your existing list of 17,777 is highly comprehensive. The remaining numbers are mostly associated with newly chartered community banks or internal Fed wire codes. 
- You can establish a "Report a Missing Number" contact form where users submit a bank name and routing number.
- You can then manually verify this against the bank's official website (banks publicly post their routing numbers, which is fair game to index) and add it to `public/data/routing.json`.

## Technical Sourcing Pipeline
Once you acquire the CSV from Accuity (or another compliant data broker), you can use the script provided in `scripts/import_licensed_data.js` to ingest that CSV directly into your `public/data/routing.json` manifest.

**Important Legal Protection:**
We have added an ABA disclaimer to your Terms of Service stating clearly that your site is for informational purposes and is not affiliated with the official registrar.
