
export type Casing = 'capitalize' | 'uppercase' | 'lowercase' | 'titlecase' | 'camelcase' | 'decamelcase' | 'snakecase';

const SMALL_WORDS = ['and', 'or', 'of', 'buy', 'by', 'for', 'if', 'in', 'on', 'the', 'to', 'via', 'as', 'at', 'an', 'a', 'en', 'vs', 'v'];

/**
 * Truncates a string to the specified length with trailing string.
 * 
 * @param len the max length.
 * @param trail the trailing string.
 */
export function truncate(len: number, trail = '...') {
  const max = len - trail.length;
  const timeFormatter = (value: any) => {
    if (typeof value !== 'string' || value.length < max)
      return value;
    return value.slice(0, max) + trail;
  };
  return timeFormatter;
}

/**
 * Styles text for console.log output in browser.
 * 
 * @param text the text to be styled.
 * @param styles the styles to be applied.
 */
export function stylize(text: string, ...styles: string[]) {
  const params = [] as any[];
  text = text.replace(/{{([\s\S]+?)}}/g, (template, val, i) => {
    if (styles[i]) {
      params.push(styles[i]);
      return `%c${val}`;
    }
    return val;
  });
  return [text, ...params];
}

/**
 * Converts string to camelcase.
 * 
 * @param value the string to be converted.
 */
export function camelize(value: string) {
  return value.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

/**
 * Decamelizes a string.
 * 
 * @param value the value to be decamelized.
 * @param separator the separator used for camelized values.
 */
export function decamelize(value: string, separator: string = '_') {
  return value
        .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();

    
}

/**
 * Converts string to specified casing.
 * NOTE: May need to improve some of these coverage is limited.
 * 
 * @param value the value to change case for.
 */
export function toCase(type: Casing, value: string): string {
  if (typeof value !== 'string')
    return value;
  if (type === 'capitalize')
    return value.charAt(0).toUpperCase() + value.slice(1);
  if (type === 'uppercase')
    return value.toUpperCase();
  if (type === 'lowercase')
    return value.toLowerCase();
  if (type === 'camelcase')
    return camelize(value);
  if (type === 'decamelcase')
    return decamelize(value);
  if (type === 'snakecase')
    return value.replace(/(\s+|-)/g, '_').toLowerCase();
  // titlecase
  return value.replace(/\w\S*/g, (txt) => {
    if (SMALL_WORDS.includes(txt.toLowerCase()))
      return txt.toLowerCase();
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * Capitalizes string.
 * 
 * @param value the value to capitalize.
 */
export const capitalize = (value: string) => toCase('capitalize', value);

/**
 * Converts to lowercase string.
 * 
 * @param value the value to lowercase.
 */
export const lowercase = (value: string) => toCase('lowercase', value);

/**
 * Converts to uppercase string.
 * 
 * @param value the value to uppercase.
 */
export const uppercase = (value: string) => toCase('uppercase', value);

/**
 * Converts to titlecase string.
 * 
 * @param value the value to titlecase.
 */
export const titlecase = (value: string) => toCase('titlecase', value);

/**
 * Camelizes string.
 * 
 * @param value the value to camelize.
 */
export const camelcase = (value: string) => toCase('camelcase', value);

/**
 * Decamelizes string.
 * 
 * @param value the value to decamelize.
 */
export const decamelcase = (value: string) => toCase('decamelcase', value);

/**
 * Snakecases string.
 * 
 * @param value the value to snakecase.
 */
export const snakecase = (value: string) => toCase('snakecase', value);

/**
 * Generates a cheap unique ID. 
 * 
 * @param radix the numberic value used to convert to strings.
 */
export function generateUID(radix = 16) {
  return '#' + (Math.random() * 0xFFFFFF << 0).toString(radix);
}