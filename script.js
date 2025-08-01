// Main logic for the Amazon FBA profit calculator.
// This script runs in module context and imports static data from feeTables.js.

// Note: Data tables are attached to the global `window` object by feeTables.js.

// Populate category dropdown on page load
function populateCategories() {
  const select = document.getElementById('category');
  // Sort categories alphabetically for nicer UX
  const sorted = [...REFERRAL_FEES].sort((a, b) => a.category.localeCompare(b.category));
  sorted.forEach(item => {
    const option = document.createElement('option');
    option.value = item.category;
    option.textContent = item.category;
    select.appendChild(option);
  });
}

// Toggle advanced fields
function setupAdvancedToggle() {
  const toggleBtn = document.getElementById('toggle-advanced');
  const fields = document.getElementById('advanced-fields');
  const icon = document.getElementById('advanced-icon');
  toggleBtn.addEventListener('click', () => {
    fields.classList.toggle('hidden');
    // rotate arrow
    icon.textContent = fields.classList.contains('hidden') ? '▼' : '▲';
  });
}

// Determine size tier based on weight and dimensions (lbs and inches)
function determineSizeTier(weight, length, width, height) {
  // Sort dimensions descending to get longest, median, shortest
  const dims = [length, width, height].sort((a, b) => b - a);
  const longest = dims[0];
  const median = dims[1];
  const shortest = dims[2];
  const lengthPlusGirth = longest + 2 * (median + shortest);

  // Small standard-size
  const s = SIZE_TIER_LIMITS.smallStandard;
  if (
    weight <= s.weight &&
    longest <= s.longest &&
    median <= s.median &&
    shortest <= s.shortest
  ) {
    return 'Small standard';
  }
  // Large standard-size
  const l = SIZE_TIER_LIMITS.largeStandard;
  if (
    weight <= l.weight &&
    longest <= l.longest &&
    median <= l.median &&
    shortest <= l.shortest
  ) {
    return 'Large standard';
  }
  // Large bulky
  const b = SIZE_TIER_LIMITS.largeBulky;
  if (
    weight <= b.weight &&
    longest <= b.longest &&
    median <= b.median &&
    shortest <= b.shortest &&
    lengthPlusGirth <= b.lengthPlusGirth
  ) {
    return 'Large bulky';
  }
  // Extra-large categories
  if (weight <= 50) {
    return 'Extra-large 0 to 50 lb';
  }
  if (weight > 50 && weight <= 70) {
    return 'Extra-large 50+ to 70 lb';
  }
  if (weight > 70 && weight <= 150) {
    return 'Extra-large 70+ to 150 lb';
  }
  return 'Extra-large 150+ lb';
}

// Lookup fulfillment fee
function getFulfillmentFee(category, sizeTier, weight, price) {
  // Determine if this is low-price item
  const lowPrice = price <= 9.99;
  const isApparel = APPAREL_CATEGORIES.includes(category);
  let tableKey;
  if (lowPrice) {
    tableKey = isApparel ? 'low_price_apparel' : 'low_price_non_apparel';
  } else {
    tableKey = isApparel ? 'apparel' : 'non_apparel';
  }
  const table = FULFILLMENT_FEES[tableKey];
  if (!table) return 0;
  const brackets = table[sizeTier];
  if (!brackets) return 0;
  // Find the bracket matching the weight
  for (const br of brackets) {
    const min = br.min ?? 0;
    const max = br.max;
    const withinMin = weight >= min;
    const withinMax = max === null || weight <= max;
    if (withinMin && withinMax) {
      const c = br.cost;
      if (typeof c === 'number') {
        return c;
      } else if (typeof c === 'object') {
        const { base, extra, interval, threshold } = c;
        if (weight <= threshold) return base;
        const over = weight - threshold;
        const intervals = Math.ceil(over / interval);
        return base + intervals * extra;
      }
    }
  }
  // Fallback
  return 0;
}

// Lookup referral fee
function getReferralFee(category, price) {
  const item = REFERRAL_FEES.find(r => r.category === category) || REFERRAL_FEES.find(r => r.category === 'Everything Else');
  const rate = item.rate;
  const minFee = item.min_fee;
  const fee = price * rate;
  return Math.max(fee, minFee);
}

// Compute storage fees (per month) in USD based on volume and size tier type
function getStorageFees(sizeTier, length, width, height) {
  const volumeFt = (length * width * height) / 1728; // cubic inches to cubic feet
  // Determine if item is standard or oversize
  const isStandard = sizeTier === 'Small standard' || sizeTier === 'Large standard';
  const type = isStandard ? 'standard' : 'oversize';
  const offSeason = volumeFt * STORAGE_RATES.offSeason[type];
  const peak = volumeFt * STORAGE_RATES.peak[type];
  return { offSeason, peak };
}

// Perform all calculations and update the UI
function calculateAndDisplay(currentPrice) {
  // Retrieve inputs
  const category = document.getElementById('category').value;
  const priceVal = parseFloat(currentPrice ?? document.getElementById('price').value);
  const cogs = parseFloat(document.getElementById('cogs').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const length = parseFloat(document.getElementById('length').value);
  const width = parseFloat(document.getElementById('width').value);
  const height = parseFloat(document.getElementById('height').value);
  const inbound = parseFloat(document.getElementById('inbound').value) || 0;
  const duties = parseFloat(document.getElementById('duties').value) || 0;
  const prep = parseFloat(document.getElementById('prep').value) || 0;

  if (isNaN(priceVal) || isNaN(cogs) || isNaN(weight) || isNaN(length) || isNaN(width) || isNaN(height)) {
    return;
  }
  // Determine size tier
  const sizeTier = determineSizeTier(weight, length, width, height);
  // Fulfillment fee
  const fulfillmentFee = getFulfillmentFee(category, sizeTier, weight, priceVal);
  // Referral fee
  const referralFee = getReferralFee(category, priceVal);
  // Storage fees
  const { offSeason, peak } = getStorageFees(sizeTier, length, width, height);
  // Landed cost (COGS + advanced)
  const advanced = inbound + duties + prep;
  const landedCost = cogs + advanced;
  // Profit calculation
  const totalCost = landedCost + referralFee + fulfillmentFee;
  const profit = priceVal - totalCost;
  const margin = priceVal > 0 ? (profit / priceVal) * 100 : 0;
  const roi = landedCost > 0 ? (profit / landedCost) * 100 : 0;
  // Update UI values
  const profitEl = document.getElementById('profit-per-unit');
  const marginEl = document.getElementById('margin');
  const roiEl = document.getElementById('roi');
  profitEl.textContent = '$' + profit.toFixed(2);
  marginEl.textContent = margin.toFixed(2) + '%';
  roiEl.textContent = roi.toFixed(2) + '%';
  document.getElementById('referral-fee').textContent = '$' + referralFee.toFixed(2);
  document.getElementById('fulfillment-fee').textContent = '$' + fulfillmentFee.toFixed(2);
  document.getElementById('storage-off').textContent = '$' + offSeason.toFixed(2);
  document.getElementById('storage-peak').textContent = '$' + peak.toFixed(2);
  // Landed cost label
  const landedLabelCell = document.querySelector('#landed-cost').previousElementSibling;
  if (advanced > 0) {
    landedLabelCell.textContent = 'Landed cost per unit';
  } else {
    landedLabelCell.textContent = 'Landed cost per unit (est.)';
  }
  document.getElementById('landed-cost').textContent = '$' + landedCost.toFixed(2);
  // Display results section
  document.getElementById('results').classList.remove('hidden');

  // Apply dynamic styling based on thresholds for profit, margin and ROI
  applyRating('profit', profit, profitEl, document.getElementById('profit-card'));
  applyRating('margin', margin, marginEl, document.getElementById('margin-card'));
  applyRating('roi', roi, roiEl, document.getElementById('roi-card'));
}

// Map rating names to Tailwind classes for backgrounds and text colors.
// Colors follow conventional semantic meanings: red=very bad, orange=risky, yellow=neutral, green=profitable, emerald=very profitable.
const RATING_STYLES = {
  'very-bad': { bg: 'bg-red-50', text: 'text-red-700' },
  'risky': { bg: 'bg-orange-50', text: 'text-orange-700' },
  'neutral': { bg: 'bg-yellow-50', text: 'text-yellow-700' },
  'profitable': { bg: 'bg-green-50', text: 'text-green-700' },
  'very-profitable': { bg: 'bg-emerald-50', text: 'text-emerald-700' }
};

// List of all possible classes added for ratings; used for cleanup
const ALL_RATING_BG_CLASSES = ['bg-red-50','bg-orange-50','bg-yellow-50','bg-green-50','bg-emerald-50'];
const ALL_RATING_TEXT_CLASSES = ['text-red-700','text-orange-700','text-yellow-700','text-green-700','text-emerald-700'];

/**
 * Determine rating category for a metric value.
 * @param {string} type - 'profit', 'margin', 'roi'
 * @param {number} value - numeric value to classify
 * @returns {string} rating key
 */
function getRating(type, value) {
  if (type === 'profit') {
    if (value <= 0) return 'very-bad';
    if (value > 0 && value <= 2) return 'risky';
    if (value > 2 && value <= 5) return 'neutral';
    if (value > 5 && value <= 10) return 'profitable';
    return 'very-profitable';
  }
  if (type === 'margin') {
    // Profit margin classification based on private label guidelines:
    // <15%: very bad (should be avoided)
    // 15%-25%: risky but manageable under specific conditions
    // 25%-30%: neutral (minimum acceptable)
    // 30%-40%: profitable (target range)
    // >40%: very profitable
    if (value < 15) return 'very-bad';
    if (value >= 15 && value < 25) return 'risky';
    if (value >= 25 && value < 30) return 'neutral';
    if (value >= 30 && value < 40) return 'profitable';
    return 'very-profitable';
  }
  if (type === 'roi') {
    // ROI classification based on private label guidelines:
    // <20%: very bad (too risky)
    // 20%-40%: risky (slightly risky)
    // 40%-50%: neutral (minimum for consistent demand)
    // 50%-100%: profitable (good ROI)
    // >100%: very profitable (ideal target)
    if (value < 20) return 'very-bad';
    if (value >= 20 && value < 40) return 'risky';
    if (value >= 40 && value < 50) return 'neutral';
    if (value >= 50 && value < 100) return 'profitable';
    return 'very-profitable';
  }
  return 'neutral';
}

/**
 * Apply rating styles to the card and value elements.
 * @param {string} type - metric type (profit, margin, roi)
 * @param {number} value - numeric value to classify
 * @param {HTMLElement} valueEl - element displaying the value
 * @param {HTMLElement} cardEl - container card element
 */
function applyRating(type, value, valueEl, cardEl) {
  const rating = getRating(type, value);
  const styles = RATING_STYLES[rating];
  // Remove previous rating classes
  cardEl.classList.remove(...ALL_RATING_BG_CLASSES);
  valueEl.classList.remove(...ALL_RATING_TEXT_CLASSES);
  // Apply new classes
  cardEl.classList.add(styles.bg);
  valueEl.classList.add(styles.text);
}

// Configure price slider after initial calculation
function configureSlider(basePrice) {
  const sliderContainer = document.getElementById('slider-container');
  const slider = document.getElementById('price-slider');
  const sliderValue = document.getElementById('slider-value');
  // Determine range: ±$5 or ±50% if price > $40
  let min, max;
  if (basePrice > 40) {
    min = basePrice * 0.5;
    max = basePrice * 1.5;
  } else {
    min = Math.max(0, basePrice - 5);
    max = basePrice + 5;
  }
  slider.min = min.toFixed(2);
  slider.max = max.toFixed(2);
  slider.step = 0.01;
  slider.value = basePrice.toFixed(2);
  sliderValue.textContent = '$' + basePrice.toFixed(2);
  // Show slider
  sliderContainer.classList.remove('hidden');
  // Assign event handler to update price and recalculate on change.
  // Use oninput to ensure only one handler is active at a time.
  slider.oninput = () => {
    const newPrice = parseFloat(slider.value);
    sliderValue.textContent = '$' + newPrice.toFixed(2);
    // Keep the price input field in sync with the slider value
    document.getElementById('price').value = newPrice.toFixed(2);
    calculateAndDisplay(newPrice);
  };
}

// Initialize page
function init() {
  populateCategories();
  setupAdvancedToggle();
  const form = document.getElementById('calc-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const priceVal = parseFloat(document.getElementById('price').value);
    if (isNaN(priceVal) || priceVal <= 0) {
      return;
    }
    calculateAndDisplay();
    configureSlider(priceVal);
  });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', init);