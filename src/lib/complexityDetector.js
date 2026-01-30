/**
 * Complexity Detection System
 * Analyzes user queries to determine appropriate token limits
 */

// Financial and calculation keywords
const FINANCIAL_KEYWORDS = [
  'loan', 'interest', 'calculate', 'analyze', 'investment', 'return',
  'principal', 'rate', 'payment', 'emi', 'disbursement', 'term',
  'aum', 'portfolio', 'savings', 'mutual fund', 'mf', 'aud', 'inr',
  'usd', 'currency', 'exchange', 'budget', 'expense', 'income',
  'tax', 'fee', 'cost', 'profit', 'loss', 'margin', 'percentage'
];

// Mathematical operation keywords
const MATH_KEYWORDS = [
  'calculate', 'compute', 'formula', 'equation', 'solve', 'derive',
  'simplify', 'expand', 'factor', 'integrate', 'differentiate',
  'matrix', 'vector', 'algebra', 'geometry', 'trigonometry'
];

// Detailed analysis keywords
const ANALYSIS_KEYWORDS = [
  'analyze', 'detailed', 'comprehensive', 'breakdown', 'step-by-step',
  'explain', 'elaborate', 'expand', 'describe', 'outline', 'plan',
  'strategy', 'roadmap', 'guide', 'tutorial', 'walkthrough'
];

// Planning and itinerary keywords
const PLANNING_KEYWORDS = [
  'itinerary', 'itinary', 'road trip', 'trip', 'journey', 'route',
  'stops', 'stopover', 'destination', 'travel', 'tour', 'schedule',
  'agenda', 'suggest', 'recommend', 'places', 'attractions',
  'accommodation', 'hotel', 'restaurant', 'cafe', 'refreshment',
  'visit', 'explore', 'discover', 'day trip', 'vacation', 'holiday',
  'itinerary', 'itinerary planning', 'travel plan', 'trip plan'
];

// Location and geography keywords
const LOCATION_KEYWORDS = [
  'from', 'to', 'between', 'via', 'through', 'across',
  'destination', 'location', 'city', 'town', 'country', 'region'
];

// Complex query indicators
const COMPLEXITY_INDICATORS = {
  // Query length thresholds
  SHORT: 100,      // < 100 words
  MEDIUM: 200,     // 100-200 words
  LONG: 300,       // 200-300 words
  VERY_LONG: 500,  // > 300 words

  // Number of numerical values
  FEW_NUMBERS: 2,
  SOME_NUMBERS: 5,
  MANY_NUMBERS: 10,

  // Currency indicators
  MULTI_CURRENCY: 2,

  // List items
  MANY_ITEMS: 5
};

/**
 * Count words in text
 */
function countWords(text) {
  return text.trim().split(/\s+/).length;
}

/**
 * Count numerical values in text
 */
function countNumbers(text) {
  const numberPattern = /\b\d+(?:[.,]\d+)?\s*(?:lakh|crore|k|m|billion|million|thousand|aud|inr|usd|%|cr)?\b/gi;
  const matches = text.match(numberPattern);
  return matches ? matches.length : 0;
}

/**
 * Count currency mentions
 */
function countCurrencies(text) {
  const currencies = new Set();
  const currencyPattern = /\b(aud|inr|usd|gbp|eur|jpy|cad|aud|rs|₹|\$|£|€|¥)\b/gi;
  const matches = text.match(currencyPattern);
  if (matches) {
    matches.forEach(m => currencies.add(m.toLowerCase()));
  }
  return currencies.size;
}

/**
 * Count keyword occurrences
 */
function countKeywords(text, keywords) {
  const lowerText = text.toLowerCase();
  let count = 0;
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) count += matches.length;
  });
  return count;
}

/**
 * Detect multi-location travel queries (from X to Y pattern)
 */
function detectMultipleLocations(text) {
  const lowerText = text.toLowerCase();
  // Pattern: "from [location] to [location]"
  const multiLocationPattern = /from\s+\w+\s+to\s+\w+/gi;
  return multiLocationPattern.test(lowerText);
}

/**
 * Detect structured output requests (lists, itineraries, schedules)
 */
function detectStructuredOutput(text) {
  const lowerText = text.toLowerCase();
  const structuredKeywords = ['list', 'itinerary', 'schedule', 'steps', 'stages', 'breakdown', 'outline', 'summary', 'plan'];
  return structuredKeywords.some(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(lowerText));
}

/**
 * Count list items (numbered or bulleted)
 */
function countListItems(text) {
  const listPattern = /(?:^|\n)\s*(?:\d+\.|[-*•])\s+/gm;
  const matches = text.match(listPattern);
  return matches ? matches.length : 0;
}

/**
 * Detect if query contains mathematical expressions
 */
function hasMathExpressions(text) {
  const mathPattern = /[\[\(].*?[\)\]]|\\frac|\\times|\\div|\\sqrt|∑|∫|∂|∇|π|θ|α|β|γ|δ|∞|≈|≠|≤|≥|±|×|÷|√|∛/;
  return mathPattern.test(text);
}

/**
 * Main complexity detection function
 * Returns complexity level and recommended token limit
 * @param {string} query - User query
 * @param {boolean} isLoggedIn - Whether user is authenticated (default: false)
 * @returns {Object} Complexity analysis with token limits
 */
export function detectComplexity(query, isLoggedIn = false) {
  if (!query || typeof query !== 'string') {
    return {
      level: 'simple',
      score: 0,
      max_tokens: 512,
      factors: [],
      is_guest: !isLoggedIn
    };
  }

  // CRITICAL: Guest users always get 512 tokens max to prevent server overload
  // Complex queries are only allowed for authenticated users
  if (!isLoggedIn) {
    return {
      level: 'guest_limited',
      score: 0,
      max_tokens: 512,
      factors: ['Guest user - limited to 512 tokens'],
      is_guest: true
    };
  }

  let complexityScore = 0;
  const factors = [];

  // 1. Query length analysis
  const wordCount = countWords(query);
  if (wordCount > COMPLEXITY_INDICATORS.VERY_LONG) {
    complexityScore += 3;
    factors.push(`Very long query (${wordCount} words)`);
  } else if (wordCount > COMPLEXITY_INDICATORS.LONG) {
    complexityScore += 2;
    factors.push(`Long query (${wordCount} words)`);
  } else if (wordCount > COMPLEXITY_INDICATORS.MEDIUM) {
    complexityScore += 1;
    factors.push(`Medium query (${wordCount} words)`);
  }

  // 2. Numerical values analysis
  const numberCount = countNumbers(query);
  if (numberCount > COMPLEXITY_INDICATORS.MANY_NUMBERS) {
    complexityScore += 3;
    factors.push(`Many numerical values (${numberCount})`);
  } else if (numberCount > COMPLEXITY_INDICATORS.SOME_NUMBERS) {
    complexityScore += 2;
    factors.push(`Multiple calculations (${numberCount} numbers)`);
  } else if (numberCount > COMPLEXITY_INDICATORS.FEW_NUMBERS) {
    complexityScore += 1;
    factors.push(`Contains numerical values`);
  }

  // 3. Multi-currency analysis
  const currencyCount = countCurrencies(query);
  if (currencyCount > COMPLEXITY_INDICATORS.MULTI_CURRENCY) {
    complexityScore += 2;
    factors.push(`Multi-currency (${currencyCount} currencies)`);
  }

  // 4. Financial keywords
  const financialKeywordCount = countKeywords(query, FINANCIAL_KEYWORDS);
  if (financialKeywordCount > 5) {
    complexityScore += 3;
    factors.push(`Heavy financial content (${financialKeywordCount} keywords)`);
  } else if (financialKeywordCount > 2) {
    complexityScore += 2;
    factors.push(`Financial calculations needed`);
  } else if (financialKeywordCount > 0) {
    complexityScore += 1;
  }

  // 5. Mathematical keywords
  const mathKeywordCount = countKeywords(query, MATH_KEYWORDS);
  if (mathKeywordCount > 3) {
    complexityScore += 2;
    factors.push(`Mathematical analysis required`);
  }

  // 6. Analysis/detailed keywords
  const analysisKeywordCount = countKeywords(query, ANALYSIS_KEYWORDS);
  if (analysisKeywordCount > 3) {
    complexityScore += 2;
    factors.push(`Detailed analysis requested`);
  }

  // 7. List items
  const listItemCount = countListItems(query);
  if (listItemCount > COMPLEXITY_INDICATORS.MANY_ITEMS) {
    complexityScore += 2;
    factors.push(`Multiple list items (${listItemCount})`);
  }

  // 8. Mathematical expressions
  if (hasMathExpressions(query)) {
    complexityScore += 2;
    factors.push(`Contains mathematical expressions`);
  }

  // 9. Planning/Itinerary keywords
  const planningKeywordCount = countKeywords(query, PLANNING_KEYWORDS);
  if (planningKeywordCount > 0) {
    complexityScore += 3;
    factors.push(`Planning/itinerary query detected (${planningKeywordCount} keywords)`);
  }

  // 10. Multi-location travel queries
  if (detectMultipleLocations(query)) {
    complexityScore += 2;
    factors.push(`Multi-location travel query detected`);
  }

  // 11. Structured output requests
  if (detectStructuredOutput(query)) {
    complexityScore += 1;
    factors.push(`Structured output requested`);
  }

  // Determine complexity level and token limit
  let level = 'simple';
  let max_tokens = 512;

  if (complexityScore >= 10) {
    level = 'very_complex';
    max_tokens = 4096;
  } else if (complexityScore >= 7) {
    level = 'complex';
    max_tokens = 2048;
  } else if (complexityScore >= 4) {
    level = 'medium';
    max_tokens = 1024;
  } else if (complexityScore >= 1) {
    level = 'slightly_complex';
    max_tokens = 768;
  }

  return {
    level,
    score: complexityScore,
    max_tokens,
    factors,
    wordCount,
    numberCount,
    currencyCount,
    financialKeywordCount,
    mathKeywordCount,
    analysisKeywordCount,
    listItemCount,
    planningKeywordCount,
    hasMultipleLocations: detectMultipleLocations(query),
    hasStructuredOutput: detectStructuredOutput(query),
    is_guest: !isLoggedIn,
    is_authenticated: isLoggedIn
  };
}

/**
 * Map complexity level to backend response_length preset
 */
export function mapComplexityToResponseLength(complexityLevel, isGuest = false) {
  // Guest users always get medium (512 tokens)
  if (isGuest) {
    return 'medium';
  }

  // Map complexity levels to backend presets
  // UPDATED: Aggressive token allocation for planning queries
  // All authenticated users get minimum 2048 tokens for planning queries
  switch (complexityLevel) {
    case 'very_complex':
      return 'detailed';  // 2048 tokens
    case 'complex':
      return 'detailed';  // 2048 tokens
    case 'medium':
      return 'detailed';  // 2048 tokens
    case 'slightly_complex':
      return 'detailed';  // 2048 tokens (UPGRADED from 'long')
    case 'simple':
      return 'detailed';  // 2048 tokens (UPGRADED from 'long')
    case 'guest_limited':
      return 'medium';    // 512 tokens (guests protected)
    default:
      return 'detailed';  // 2048 tokens (UPGRADED from 'long')
  }
}

/**
 * Get recommended generation parameters based on complexity
 */
export function getGenerationParams(query, isLoggedIn = false) {
  const complexity = detectComplexity(query, isLoggedIn);
  const isGuest = !isLoggedIn;

  // Map complexity to backend preset
  const response_length = mapComplexityToResponseLength(complexity.level, isGuest);

  return {
    response_length,  // Backend preset: short, medium, long, detailed
    complexity_level: complexity.level,
    complexity_score: complexity.score,
    is_guest: isGuest,
    is_authenticated: isLoggedIn
  };
}

/**
 * Log complexity analysis for debugging
 * @param {string} query - User query
 * @param {boolean} isLoggedIn - Whether user is authenticated
 */
export function logComplexityAnalysis(query, isLoggedIn = false) {
  const analysis = detectComplexity(query, isLoggedIn);
  console.log('[COMPLEXITY_DETECTOR]', {
    level: analysis.level,
    score: analysis.score,
    max_tokens: analysis.max_tokens,
    is_guest: analysis.is_guest,
    is_authenticated: analysis.is_authenticated,
    factors: analysis.factors,
    metrics: {
      words: analysis.wordCount,
      numbers: analysis.numberCount,
      currencies: analysis.currencyCount,
      financial_keywords: analysis.financialKeywordCount,
      math_keywords: analysis.mathKeywordCount,
      analysis_keywords: analysis.analysisKeywordCount,
      list_items: analysis.listItemCount
    }
  });
  return analysis;
}
