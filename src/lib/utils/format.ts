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
