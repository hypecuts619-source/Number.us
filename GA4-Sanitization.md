# GA4 Analytics Sanitization Protocol

To ensure your reporting remains unpolluted from the current scraping attack originating from Singapore data centers, follow this step-by-step developer protocol to apply data filters and retrieve clean baseline data.

## Phase 1: Configuring a Permanent Data Filter in GA4

You must set up rules at the property level to permanently filter out known internal developer activity and apply blocks for anomalous regions.

### Step 1: Filter Internal Developer Traffic
1. Navigate to **Admin** > **Data Streams** and select your primary web data stream for `usroutingnumber.com`.
2. Click **Configure tag settings** > **Show all** > **Define internal traffic**.
3. Create a rule: Click **Create**, name it "Internal Developers", set Traffic type value to `internal`, and define the IP addresses (e.g., your office/VPN IPs) using "IP address equals".
4. Return to **Admin** > **Data Settings** > **Data Filters**.
5. You'll see an "Internal Traffic" filter. Change its state from *Testing* to **Active**. This ensures your own testing doesn't inflate metrics.

### Step 2: Excluding Known Bot Data Centers (Like SG)
While GA4 automatically filters known bots (using IAB spider/bot lists), specialized scraping scripts often bypass this core filter. Currently, GA4 does not support blocking by 'Country' directly in native Data Filters (it only supports internal/developer traffic filters). 

To permanently exclude Singapore traffic moving forward, you must handle this upstream via **Google Tag Manager (GTM)**:

1. **Capture Region in GTM:** Utilize your server-side GTM setup or a Cloudflare Worker integration to identify the user's country and pass it as a Data Layer variable. Alternately, use Cloudflare to rewrite scripts.
2. **Setup Trigger:** Create a Trigger Exception in GTM that fires when `Country` equals `SG`.
3. **Apply Exception:** Apply this trigger exception to your main GA4 Configuration Tag: **Do not fire if `Country` equals `SG`**.

*To retroactively filter the views in the GA4 Dashboard without API usage, you must use Segments or Explore Reports to build a funnel that excludes Country: Singapore.*

## Phase 2: Generating a Clean Baseline Report

We have constructed a Node.js API script to pull a clean baseline report excluding the anomalous Singapore traffic. This provides an unpolluted look at our actual US human traffic for the week.

### Instructions:
1. Ensure you have your Google Cloud Service Account credentials configured. 
2. Set the environment variable: `export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account.json"`.
3. Ensure the `@google-analytics/data` package is installed: `npm install @google-analytics/data`.
4. Run the script located at `scripts/ga4-report.ts` using `npx tsx scripts/ga4-report.ts`.
