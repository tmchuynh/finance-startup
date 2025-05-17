/**
 * Capitalizes a string by replacing hyphens and underscores with spaces,
 * and converting the first character of each word to uppercase.
 *
 * Numbers and special characters are preserved as-is and do not affect capitalization.
 *
 * @param str - The input string to capitalize.
 * @returns The capitalized string with hyphens and underscores replaced by spaces.
 *
 * @example
 * ```typescript
 * capitalize("hello-world"); // Returns "Hello World"
 * capitalize("hello_world"); // Returns "Hello World"
 * capitalize("hello world"); // Returns "Hello World"
 * capitalize("123-hello_world"); // Returns "123 Hello World"
 * capitalize("hello@world"); // Returns "Hello@World"
 * ```
 */
export const capitalize = (str: string) => {
  return str
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b[a-zA-Z]/g, (char) => char.toUpperCase());
};

/**
 * Converts a camelCase string to Title Case format
 * Example: "costOfGoodsSold" becomes "Cost Of Goods Sold"
 */
export function formatCamelCaseToTitle(camelCase: string): string {
  // Add space before capital letters and convert to lowercase
  const withSpaces = camelCase.replace(/([A-Z])/g, ' $1').toLowerCase();
  
  // Capitalize the first letter of each word
  return withSpaces
    .split(' ')
    .map(word => word.trim())
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}