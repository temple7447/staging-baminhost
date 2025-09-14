/**
 * Currency utility functions for Nigerian Naira (₦)
 */

/**
 * Format a number as Nigerian Naira currency
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatNaira = (
  amount: number,
  options: {
    showDecimals?: boolean;
    shortFormat?: boolean;
    showSymbol?: boolean;
  } = {}
): string => {
  const {
    showDecimals = false,
    shortFormat = false,
    showSymbol = true,
  } = options;

  // Handle invalid or zero amounts
  if (isNaN(amount) || amount === null || amount === undefined) {
    return showSymbol ? '₦0' : '0';
  }

  // Short format for large numbers (K, M, B)
  if (shortFormat) {
    const abs = Math.abs(amount);
    if (abs >= 1000000000) {
      const formatted = (amount / 1000000000).toFixed(1);
      return `${showSymbol ? '₦' : ''}${formatted}B`;
    }
    if (abs >= 1000000) {
      const formatted = (amount / 1000000).toFixed(1);
      return `${showSymbol ? '₦' : ''}${formatted}M`;
    }
    if (abs >= 1000) {
      const formatted = (amount / 1000).toFixed(1);
      return `${showSymbol ? '₦' : ''}${formatted}K`;
    }
  }

  // Standard formatting with thousands separators
  const formatted = new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);

  return showSymbol ? `₦${formatted}` : formatted;
};

/**
 * Format currency with full Naira symbol and decimals
 */
export const formatNairaFull = (amount: number): string => {
  return formatNaira(amount, { showDecimals: true, showSymbol: true });
};

/**
 * Format currency in compact form (K, M, B)
 */
export const formatNairaCompact = (amount: number): string => {
  return formatNaira(amount, { shortFormat: true, showSymbol: true });
};

/**
 * Format currency without symbol (just the number)
 */
export const formatNairaNumber = (amount: number): string => {
  return formatNaira(amount, { showSymbol: false });
};

/**
 * Parse a string to number for currency calculations
 */
export const parseNaira = (value: string): number => {
  // Remove currency symbols and convert to number
  const cleanValue = value.replace(/[₦,\s]/g, '');
  const parsed = parseFloat(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Calculate percentage with proper formatting
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  if (isNaN(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format a change in currency (with + or - prefix)
 */
export const formatNairaChange = (amount: number): string => {
  if (amount === 0) return '₦0';
  const prefix = amount > 0 ? '+' : '';
  return `${prefix}${formatNaira(amount)}`;
};

/**
 * Get color class based on positive/negative value
 */
export const getCurrencyColorClass = (amount: number): string => {
  if (amount > 0) return 'text-green-600';
  if (amount < 0) return 'text-red-600';
  return 'text-muted-foreground';
};

/**
 * Format Naira for display in tables/cards with responsive formatting
 */
export const formatNairaResponsive = (
  amount: number, 
  screenSize: 'mobile' | 'desktop' = 'desktop'
): string => {
  if (screenSize === 'mobile') {
    return formatNairaCompact(amount);
  }
  return formatNaira(amount);
};

/**
 * Validate if a string is a valid Naira amount
 */
export const isValidNairaAmount = (value: string): boolean => {
  const cleanValue = value.replace(/[₦,\s]/g, '');
  return !isNaN(parseFloat(cleanValue)) && isFinite(parseFloat(cleanValue));
};