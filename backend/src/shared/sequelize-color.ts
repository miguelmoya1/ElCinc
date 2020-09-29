import { Colors } from './colors';

const REGEX_EXECUTE = /Executing \(default\): /g;
const REGEX_DOUBLE_QUOTES = /\"(\w*?|\d*?|-?|:?|\+?)\"/g;
const REGEX_SINGLE_QUOTES = /\'(\w| |\d|-|,|-|\.|\+|:|\@|\$|\/|ñ|\n)*\'/gi;
const REGEX_TYPES = /(\w*?)\(/g;
const REGEX_PARENTHESIS = /([\(\)])/g;
const REGEX_BOOLEAN = /true|false/gi;
const REGEX_COMMA = /\,/gi;

const keyWords = [
  /\b(TIMESTAMP WITH TIME ZONE)\b/g, /\b(auto_increment)\b/g, /\b(CURRENT_DATE)\b/g, /\b(CURRENT_TIME)\b/g, /\b(REFERENCES)\b/g,
  /\b(INDEX_LIST)\b/g, /\b(RETURNING)\b/g, /\b(constCHAR)\b/g, /\b(DATETIME)\b/g, /\b(DISTINCT)\b/g, /\b(INTERVAL)\b/g, /\b(UNSIGNED)\b/g,
  /\b(EXCLUDED)\b/g, /\b(INTEGER)\b/g, /\b(PRIMARY)\b/g, /\b(BETWEEN)\b/g, /\b(REPLACE)\b/g, /\b(TINYINT)\b/g, /\b(CASCADE)\b/g, /\b(DEFAULT)\b/g,
  /\b(PRAGMA)\b/g, /\b(CREATE)\b/g, /\b(EXISTS)\b/g, /\b(DELETE)\b/g, /\b(ELSEIF)\b/g, /\b(HAVING)\b/g, /\b(INSERT)\b/g, /\b(OPTION)\b/g, /\b(SELECT)\b/g,
  /\b(UPDATE)\b/g, /\b(VALUES)\b/g, /\b(UNIQUE)\b/g, /\b(ENGINE)\b/g, /\b(FALSE)\b/g, /\b(GROUP)\b/g, /\b(LIMIT)\b/g, /\b(MATCH)\b/g, /\b(ORDER)\b/g,
  /\b(OUTER)\b/g, /\b(RIGHT)\b/g, /\b(TABLE)\b/g, /\b(WHERE)\b/g, /\b(INDEX)\b/g, /\b(NULL)\b\b/g, /\b(CASE)\b/g, /\b(DESC)\b/g, /\b(EACH)\b/g,
  /\b(ELSE)\b/g, /\b(FROM)\b/g, /\b(INTO)\b/g, /\b(JOIN)\b/g, /\b(KEYS)\b/g, /\b(LEFT)\b/g, /\b(LIKE)\b/g, /\b(THEN)\b/g, /\b(TRUE)\b/g,
  /\b(WHEN)\b/g, /\b(TEXT)\b/g, /\b(SHOW)\b/g, /\b(AND)\b/g, /\b(ASC)\b/g, /\b(FOR)\b/g, /\b(KEY)\b/g, /\b(NOT)\b/g, /\b(OUT)\b/g, /\b(SET)\b/g,
  /\b(AS)\b/g, /\b(BY)\b/g, /\b(IF)\b/g, /\b(IN)\b/g, /\b(IS)\b/g, /\b(ON)\b/g, /\b(OR)\b/g, /\b(TO)\b/g,
];

export const highliteSQL = (textToEdit: string) => {
  let newText = textToEdit.replace(REGEX_EXECUTE, '')
    .replace(/á/gi, 'a')
    .replace(/é/gi, 'e')
    .replace(/í/gi, 'i')
    .replace(/ó/gi, 'o')
    .replace(/ú/gi, 'u')
    .replace(REGEX_DOUBLE_QUOTES, `${Colors.FgBlue}"$1"${Colors.Reset}`)
    .replace(REGEX_SINGLE_QUOTES, text => `${Colors.FgGreen}${text}${Colors.Reset}`)
    .replace(REGEX_BOOLEAN, text => `${Colors.FgCyan}${text}${Colors.Reset}`)
    .replace(REGEX_TYPES, `${Colors.FgRed}$1${Colors.Reset}(`)
    .replace(REGEX_PARENTHESIS, `${Colors.FgYellow}$1${Colors.Reset}`)
    .replace(REGEX_COMMA, `${Colors.FgYellow}, ${Colors.Reset}`);

  keyWords.forEach(key => newText = newText.replace(key, `${Colors.FgMagenta}$1${Colors.Reset}`));

  return newText;
};
