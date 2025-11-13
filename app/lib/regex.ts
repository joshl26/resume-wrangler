// app/lib/regexValidation.ts

// Username: starts with a letter, total length 6..20, letters, digits and underscore allowed
export const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{5,19}$/;

// Email: simple anchored pattern for common emails (name@domain.tld)
export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Password: at least one upper, one lower, one digit, one special char, minimum 6 chars
export const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*\-]).{6,}$/;

// Components (useful for building combined regexes)
export const atLeastOneLowerCaseEnglishRegex = /(?=.*[a-z])/;
export const atLeastOneUpperCaseEnglishRegex = /(?=.*[A-Z])/;
export const atLeastOneNumberZeroToNineRegex = /(?=.*[0-9])/;
export const atLeastOneSpecialCharacterRegex = /(?=.*[#?!@$%^&*\-])/;
export const atLeastSixCharactersRegex = /.{6,}/;

// Letters and numbers only (no underscore/dot/hyphen)
export const lettersAndNumbersRegex = /^[A-Za-z0-9]*$/;

// No whitespace (allows empty string; change to + if you require at least one char)
export const noWhiteSpaceRegex = /^\S*$/;