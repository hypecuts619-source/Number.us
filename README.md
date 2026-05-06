# US Routing Number Lookup

This application provides a directory and search interface for US Bank Routing Numbers (FedACH and Fedwire).

## Updating Data

As of December 2018, the Federal Reserve no longer allows public manual downloads of the FedACH directory without a FedLine account. To keep this dataset up-to-date, this project relies on a community-maintained GitHub repository tracking the data.

To fetch the latest data and merge it for the application:

```bash
npm run update-data
```

Running this will:
1. Reach out to the public repositories.
2. Download both the FedACH and Fedwire lists.
3. Automatically merge, format, and save the updated file to `src/data/routing.json`.

After the data is successfully updated, rebuild the site to apply the new data:
```bash
npm run build
```
