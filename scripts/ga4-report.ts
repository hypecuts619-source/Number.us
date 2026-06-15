/**
 * GA4 Analytics Sanitization Script
 * 
 * Retrieves a clean baseline report excluding anomalous APAC traffic 
 * (specifically Singapore data centers).
 * 
 * Required setup:
 * 1. npm install @google-analytics/data
 * 2. Set export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account.json"
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';

// TODO: Replace with your actual GA4 Property ID
const PROPERTY_ID = 'YOUR_GA4_PROPERTY_ID';

const analyticsDataClient = new BetaAnalyticsDataClient();

async function runCleanReport() {
  console.log(`Pulling sanitized GA4 data for property: ${PROPERTY_ID}...`);

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'sessionSourceMedium',
        },
        {
          name: 'country',
        }
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name: 'bounceRate',
        },
        {
          name: 'averageSessionDuration',
        }
      ],
      dimensionFilter: {
        notExpression: {
          filter: {
            fieldName: 'country',
            stringFilter: {
              value: 'Singapore',
              matchType: 'EXACT',
            },
          },
        },
      },
    });

    console.log('\n--- Sanitized Report Results (Excluding SG) ---');
    if (!response.rows || response.rows.length === 0) {
      console.log('No data found for the given criteria.');
      return;
    }

    response.rows.forEach(row => {
      const sourceMedium = row.dimensionValues?.[0].value;
      const country = row.dimensionValues?.[1].value;
      const users = row.metricValues?.[0].value;
      const bounceRate = row.metricValues?.[1].value;
      const avgDuration = row.metricValues?.[2].value;

      console.log(`Source: ${sourceMedium} | Country: ${country}`);
      console.log(`  Users: ${users} | Bounce Rate: ${bounceRate} | Avg Duration: ${avgDuration}s`);
    });
    console.log('-----------------------------------------------\n');
  } catch (error) {
    console.error('Failed to run GA4 report:', error);
  }
}

runCleanReport().catch(console.error);
