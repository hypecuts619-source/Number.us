# Moving to Production with Real Routing Data

If you want to launch this directory as a real, revenue-generating website, you must replace the locally generated mock data in `src/data/routing.json` with authentic Federal Reserve data.

### Is the data free?
**Yes.** The US Federal Reserve provides this data to the public for **free**.

### Are there free APIs?
Yes, there are third-party free APIs (like `routingnumbers.info`), but **you should not use an external API for this application.** 
Why? Because your site relies on pre-rendering thousands of bank pages to rank on Google (SEO). If you have to query an external API 20,000 times during your build step to generate the sitemaps and pages, the API will likely block or rate-limit you. 

**The Best Approach:** Download the raw data, process it into a JSON file (or a database like SQLite/PostgreSQL), and serve it locally.

---

### Step-by-Step Guide to Getting the Real Data:

1. **Visit the Federal Reserve Website:**
   Go to the [Federal Reserve E-Payments Routing Directory](https://www.frbservices.org/resources/routing-number-directory).
2. **Accept the Terms:**
   Scroll to the bottom to read and agree to their terms of use for accessing the public directory.
3. **Download the FedACH Directory:**
   Download the **FedACH® Participant RDFIs** document. You can usually download this as a text file (fixed-width) or CSV.
4. **Format into JSON:**
   Once you have the CSV file, you need to map it into the format the app expects. We have provided a script to help you do this.

---

### How to Import the Data

We have created an import script for you. 

1. Save the downloaded CSV file into the root of this project and name it `fed-routing.csv`.
2. Ensure it has columns for Routing Number, Bank Name, Address, City, State, and Zip (or adjust the script to match the Fed's columns).
3. Run the following command in your terminal:

```bash
npm run import-real-data
```

This will automatically read the CSV, parse out all the real bank locations, and overwrite your `src/data/routing.json` file with the authentic data.

Once that runs, do a new production build (`npm run build`), and your site will be officially serving real banking information!
