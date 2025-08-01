// This file contains static data tables used by the FBA calculator.
// It is generated from the CSVs supplied by the user for 2025 US Amazon fees.

// Fulfillment fees by size tier and weight.  
// Each entry contains an array of weight brackets with their corresponding fee.  
// For brackets with dynamic pricing, the cost object includes:  
//   base: base cost in USD  
//   extra: cost per interval (USD)  
//   interval: interval size (lbs)  
//   threshold: weight threshold after which the extra charge applies  
// Weight values are in pounds (lbs).  
// Expose data structures on the global `window` object instead of using ES module exports.
window.FULFILLMENT_FEES = {
  "non_apparel": {
    "Small standard": [
      { min: 0.0, max: 0.125, cost: 3.06 },
      { min: 0.125, max: 0.25, cost: 3.15 },
      { min: 0.25, max: 0.375, cost: 3.24 },
      { min: 0.375, max: 0.5, cost: 3.33 },
      { min: 0.5, max: 0.625, cost: 3.43 },
      { min: 0.625, max: 0.75, cost: 3.53 },
      { min: 0.75, max: 0.875, cost: 3.6 },
      { min: 0.875, max: 1.0, cost: 3.65 }
    ],
    "Large standard": [
      { min: 0.0, max: 0.25, cost: 3.68 },
      { min: 0.25, max: 0.5, cost: 3.9 },
      { min: 0.5, max: 0.75, cost: 4.15 },
      { min: 0.75, max: 1.0, cost: 4.55 },
      { min: 1.0, max: 1.25, cost: 4.99 },
      { min: 1.25, max: 1.5, cost: 5.37 },
      { min: 1.5, max: 1.75, cost: 5.52 },
      { min: 1.75, max: 2.0, cost: 5.77 },
      { min: 2.0, max: 2.25, cost: 5.87 },
      { min: 2.25, max: 2.5, cost: 6.05 },
      { min: 2.5, max: 2.75, cost: 6.21 },
      { min: 2.75, max: 3.0, cost: 6.62 },
      { min: 3.0, max: 20.0, cost: { base: 6.92, extra: 0.08, interval: 1.0, threshold: 3.0 } }
    ],
    "Large bulky": [
      { min: 0.0, max: 50.0, cost: { base: 9.61, extra: 0.38, interval: 1.0, threshold: 0.0 } }
    ],
    "Extra-large 0 to 50 lb": [
      { min: 0.0, max: 50.0, cost: { base: 26.33, extra: 0.38, interval: 1.0, threshold: 0.0 } }
    ],
    "Extra-large 50+ to 70 lb": [
      { min: 50.0, max: 70.0, cost: { base: 40.12, extra: 0.75, interval: 1.0, threshold: 51.0 } }
    ],
    "Extra-large 70+ to 150 lb": [
      { min: 70.0, max: 150.0, cost: { base: 54.81, extra: 0.75, interval: 1.0, threshold: 71.0 } }
    ],
    "Extra-large 150+ lb": [
      { min: 150.0, max: null, cost: { base: 194.95, extra: 0.19, interval: 1.0, threshold: 151.0 } }
    ]
  },
  "apparel": {
    "Small standard": [
      { min: 0.0, max: 0.25, cost: 3.27 },
      { min: 0.25, max: 0.5, cost: 3.42 },
      { min: 0.5, max: 0.75, cost: 3.72 },
      { min: 0.75, max: 1.0, cost: 3.98 }
    ],
    "Large standard": [
      { min: 0.0, max: 0.25, cost: 4.25 },
      { min: 0.25, max: 0.5, cost: 4.45 },
      { min: 0.5, max: 0.75, cost: 4.67 },
      { min: 0.75, max: 1.0, cost: 5.12 },
      { min: 1.0, max: 1.5, cost: 5.9 },
      { min: 1.5, max: 2.0, cost: 6.14 },
      { min: 2.0, max: 2.5, cost: 6.6 },
      { min: 2.5, max: 3.0, cost: 6.81 },
      { min: 3.0, max: 20.0, cost: { base: 6.92, extra: 0.16, interval: 0.5, threshold: 3.0 } }
    ],
    "Large bulky": [
      { min: 0.0, max: 50.0, cost: { base: 9.61, extra: 0.38, interval: 1.0, threshold: 0.0 } }
    ],
    "Extra-large 0 to 50 lb": [
      { min: 0.0, max: 50.0, cost: { base: 26.33, extra: 0.38, interval: 1.0, threshold: 0.0 } }
    ],
    "Extra-large 50+ to 70 lb": [
      { min: 50.0, max: 70.0, cost: { base: 40.12, extra: 0.75, interval: 1.0, threshold: 51.0 } }
    ],
    "Extra-large 70+ to 150 lb": [
      { min: 70.0, max: 150.0, cost: { base: 54.81, extra: 0.75, interval: 1.0, threshold: 71.0 } }
    ],
    "Extra-large 150+ lb": [
      { min: 150.0, max: null, cost: { base: 194.95, extra: 0.19, interval: 1.0, threshold: 151.0 } }
    ]
  },
  "low_price_non_apparel": {
    "Small standard": [
      { min: 0.0, max: 0.125, cost: 2.29 },
      { min: 0.125, max: 0.25, cost: 2.38 },
      { min: 0.25, max: 0.375, cost: 2.47 },
      { min: 0.375, max: 0.5, cost: 2.56 },
      { min: 0.5, max: 0.625, cost: 2.66 },
      { min: 0.625, max: 0.75, cost: 2.76 },
      { min: 0.75, max: 0.875, cost: 2.83 },
      { min: 0.875, max: 1.0, cost: 2.88 }
    ],
    "Large standard": [
      { min: 0.0, max: 0.25, cost: 2.91 },
      { min: 0.25, max: 0.5, cost: 3.13 },
      { min: 0.5, max: 0.75, cost: 3.38 },
      { min: 0.75, max: 1.0, cost: 3.78 },
      { min: 1.0, max: 1.25, cost: 4.22 },
      { min: 1.25, max: 1.5, cost: 4.6 },
      { min: 1.5, max: 1.75, cost: 4.75 },
      { min: 1.75, max: 2.0, cost: 5.0 },
      { min: 2.0, max: 2.25, cost: 5.1 },
      { min: 2.25, max: 2.5, cost: 5.28 },
      { min: 2.5, max: 2.75, cost: 5.44 },
      { min: 2.75, max: 3.0, cost: 5.85 },
      { min: 3.0, max: 20.0, cost: { base: 6.15, extra: 0.08, interval: 1.0, threshold: 3.0 } }
    ],
    "Large bulky": [
      { min: 0.0, max: 50.0, cost: { base: 8.84, extra: 0.38, interval: 1.0, threshold: 0.0 } }
    ],
    "Extra-large 0 to 50 lb": [
      { min: 0.0, max: 50.0, cost: { base: 25.56, extra: 0.38, interval: 1.0, threshold: 0.0 } }
    ],
    "Extra-large 50+ to 70 lb": [
      { min: 50.0, max: 70.0, cost: { base: 39.35, extra: 0.75, interval: 1.0, threshold: 51.0 } }
    ],
    "Extra-large 70+ to 150 lb": [
      { min: 70.0, max: 150.0, cost: { base: 54.04, extra: 0.75, interval: 1.0, threshold: 71.0 } }
    ],
    "Extra-large 150+ lb": [
      { min: 150.0, max: null, cost: { base: 194.18, extra: 0.19, interval: 1.0, threshold: 151.0 } }
    ]
  },
  "low_price_apparel": {
    "Small standard": [
      { min: 0.0, max: 0.25, cost: 2.5 },
      { min: 0.25, max: 0.5, cost: 2.65 },
      { min: 0.5, max: 0.75, cost: 2.95 },
      { min: 0.75, max: 1.0, cost: 3.21 }
    ],
    "Large standard": [
      { min: 0.0, max: 0.25, cost: 3.48 },
      { min: 0.25, max: 0.5, cost: 3.68 },
      { min: 0.5, max: 0.75, cost: 3.9 },
      { min: 0.75, max: 1.0, cost: 4.35 },
      { min: 1.0, max: 1.5, cost: 5.13 },
      { min: 1.5, max: 2.0, cost: 5.37 },
      { min: 2.0, max: 2.5, cost: 5.83 },
      { min: 2.5, max: 3.0, cost: 6.04 },
      { min: 3.0, max: 20.0, cost: { base: 6.15, extra: 0.16, interval: 0.5, threshold: 3.0 } }
    ],
    "Large bulky": [
      { min: 0.0, max: 50.0, cost: { base: 8.84, extra: 0.38, interval: 1.0, threshold: 0.0 } }
    ],
    "Extra-large 0 to 50 lb": [
      { min: 0.0, max: 50.0, cost: { base: 25.56, extra: 0.38, interval: 1.0, threshold: 0.0 } }
    ],
    "Extra-large 50+ to 70 lb": [
      { min: 50.0, max: 70.0, cost: { base: 39.35, extra: 0.75, interval: 1.0, threshold: 51.0 } }
    ],
    "Extra-large 70+ to 150 lb": [
      { min: 70.0, max: 150.0, cost: { base: 54.04, extra: 0.75, interval: 1.0, threshold: 71.0 } }
    ],
    "Extra-large 150+ lb": [
      { min: 150.0, max: null, cost: { base: 194.18, extra: 0.19, interval: 1.0, threshold: 151.0 } }
    ]
  }
};

// Referral fee table.  
// Each entry has a category name, a flat percentage rate and a minimum fee.  
// Some categories in Amazon have tiered referral rates; for simplicity the highest
// applicable rate is used here as an approximation.
window.REFERRAL_FEES = [
  { category: "Amazon Device Accessories", rate: 0.45, min_fee: 0.3 },
  { category: "Appliances - Compact", rate: 0.15, min_fee: 0.3 },
  { category: "Appliances - Full-size", rate: 0.08, min_fee: 0.3 },
  { category: "Automotive and Powersports", rate: 0.12, min_fee: 0.3 },
  { category: "Base Equipment Power Tools", rate: 0.12, min_fee: 0.3 },
  { category: "Baby Products", rate: 0.08, min_fee: 0.3 },
  { category: "Backpacks, Handbags, and Luggage", rate: 0.15, min_fee: 0.3 },
  { category: "Beauty, Health, and Personal Care", rate: 0.08, min_fee: 0.3 },
  { category: "Business, Industrial, and Scientific Supplies", rate: 0.12, min_fee: 0.3 },
  { category: "Clothing and Accessories", rate: 0.05, min_fee: 0.3 },
  { category: "Computers", rate: 0.08, min_fee: 0.3 },
  { category: "Consumer Electronics", rate: 0.08, min_fee: 0.3 },
  { category: "Electronics Accessories", rate: 0.15, min_fee: 0.3 },
  { category: "Eyewear", rate: 0.15, min_fee: 0.3 },
  { category: "Fine Art", rate: 0.2, min_fee: 0.0 },
  { category: "Footwear", rate: 0.15, min_fee: 0.3 },
  { category: "Furniture", rate: 0.15, min_fee: 0.3 },
  { category: "Gift Cards", rate: 0.2, min_fee: 0.0 },
  { category: "Grocery and Gourmet", rate: 0.08, min_fee: 0.0 },
  { category: "Home and Kitchen", rate: 0.15, min_fee: 0.3 },
  { category: "Jewelry", rate: 0.2, min_fee: 0.3 },
  { category: "Lawn and Garden", rate: 0.15, min_fee: 0.3 },
  { category: "Lawn Mowers and Snow Throwers", rate: 0.15, min_fee: 0.3 },
  { category: "Mattresses", rate: 0.15, min_fee: 0.3 },
  { category: "Media - Books, DVD, Music, Software, Video", rate: 0.15, min_fee: 0.0 },
  { category: "Merchant Fulfilled Services", rate: 0.2, min_fee: 0.3 },
  { category: "Musical Instruments and AV Production", rate: 0.15, min_fee: 0.3 },
  { category: "Office Products", rate: 0.15, min_fee: 0.3 },
  { category: "Pet Supplies", rate: 0.15, min_fee: 0.3 },
  { category: "Sports and Outdoors", rate: 0.15, min_fee: 0.3 },
  { category: "Tires", rate: 0.10, min_fee: 0.3 },
  { category: "Tools and Home Improvement", rate: 0.15, min_fee: 0.3 },
  { category: "Toys and Games", rate: 0.15, min_fee: 0.3 },
  { category: "Video Games and Gaming Accessories", rate: 0.15, min_fee: 0.0 },
  { category: "Video Game Consoles", rate: 0.08, min_fee: 0.0 },
  { category: "Watches", rate: 0.16, min_fee: 0.3 },
  { category: "Everything Else", rate: 0.15, min_fee: 0.3 }
];

// Storage rates per cubic foot (USD).  
// Off-season covers January through September and Peak covers October through December.  
window.STORAGE_RATES = {
  offSeason: { standard: 0.78, oversize: 0.56 },
  peak: { standard: 2.40, oversize: 1.40 }
};

// Size-tier limits derived from the 2024 Amazon size tier definitions.  
// Values are stored in inches and pounds (lbs).  
window.SIZE_TIER_LIMITS = {
  smallStandard: { weight: 1, longest: 15, median: 12, shortest: 0.75 },
  largeStandard: { weight: 20, longest: 18, median: 14, shortest: 8 },
  largeBulky: { weight: 50, longest: 59, median: 33, shortest: 33, lengthPlusGirth: 130 }
};

// Helper list of categories that should be treated as apparel for fulfillment fees.
// These include clothing, footwear, handbags, jewelry and watches.
window.APPAREL_CATEGORIES = [
  "Clothing and Accessories",
  "Footwear",
  "Backpacks, Handbags, and Luggage",
  "Jewelry",
  "Watches",
  "Eyewear"
];