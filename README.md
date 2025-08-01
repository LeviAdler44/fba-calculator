# Amazon FBA Profit Calculator

This project is a single‑page web tool that estimates per‑unit profit, margin and ROI for products sold through Amazon’s FBA program.  It uses the official 2025 US Amazon fee schedules provided in CSV format and is designed to be easily embedded into other websites via an `<iframe>`.

## How it works

1. **Data tables** – All fulfillment, referral and storage fees are stored in `feeTables.js`, which is generated from the CSV files supplied with this project.  There are separate tables for apparel vs. non‑apparel items and special low‑price tiers (≤ $9.99).  Size‑tier thresholds are taken from the 2024 Amazon size definitions, and a simplified referral fee rate is used for categories with sliding‑scale fees.
2. **User inputs** – The calculator collects the product category, selling price, cost of goods, weight and dimensions.  Optional advanced inputs allow you to add inbound freight, duties/tariffs and prep & pack costs.
3. **Calculations** – Based on the inputs the script determines the correct size tier, looks up the appropriate fulfillment and referral fees, computes monthly storage fees, and then calculates profit per unit, margin % and ROI %.  A price slider lets you experiment with different selling prices around the base price and watch the outputs update live.

## Updating fee tables

When Amazon updates its fee schedules you’ll need to regenerate `feeTables.js`.  Follow these steps:

1. **Replace the CSV files** – Overwrite the existing CSV files in the root of this repository with the new Amazon fee tables.  Keep the filenames the same (`Non-Apparel - Fulfillment.csv`, `Apparel - Fulfillment Costs.csv`, etc.).
2. **Generate new JS** – Run a local script to convert the CSVs into the JSON structures expected by `feeTables.js`.  A sample Python script used to create the initial tables can be found in the project’s history; adapt it as needed to match Amazon’s new formats.  The script should output valid JavaScript objects for the fulfillment fees, referral fees and storage rates.
3. **Update `feeTables.js`** – Replace the contents of `feeTables.js` with the newly generated objects.  Make sure to preserve the exported names (`FULFILLMENT_FEES`, `REFERRAL_FEES`, `STORAGE_RATES`, `SIZE_TIER_LIMITS`, `APPAREL_CATEGORIES`).
4. **Redeploy** – Commit and push your changes to GitHub.  If GitHub Pages is enabled on this repository, it will automatically redeploy the updated site.

## Deployment on GitHub Pages

This project is a simple static site, so deploying to GitHub Pages is straightforward:

1. Create a GitHub repository called **`fba-calculator`** and add the contents of this folder to the root of the repo.
2. In the repository settings under **Pages**, choose the `main` branch and set the source folder to `/` (root).  GitHub will build and serve the site at `https://<username>.github.io/fba-calculator/` within a few minutes.
3. To embed the calculator on another site (such as WordPress), copy the following `<iframe>` snippet and paste it into your page or post:

   ```html
   <iframe src="https://<username>.github.io/fba-calculator/" width="100%" style="max-width:820px;" height="1100" frameborder="0"></iframe>
   ```

   Replace `<username>` with your GitHub username.

## Limitations

The referral fee parser in this version uses the highest applicable rate for categories with sliding‑scale fees.  This simplifies the calculation but may slightly overestimate the referral fee for very high‑priced items.  Always cross‑check the results with Amazon’s official fee schedule when making critical decisions.

## License

This project is provided for educational purposes only and comes with no warranty.  Use at your own risk.