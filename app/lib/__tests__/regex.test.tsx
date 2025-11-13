/**
 * app/lib/__tests__/regex.test.tsx
 *
 * Tests for regex validation patterns used in the application.
 */

import {
    usernameRegex,
    emailRegex,
    passwordRegex,
    atLeastOneLowerCaseEnglishRegex,
    atLeastOneUpperCaseEnglishRegex,
    atLeastOneNumberZeroToNineRegex,
    atLeastOneSpecialCharacterRegex,
    atLeastSixCharactersRegex,
    lettersAndNumbersRegex,
    noWhiteSpaceRegex,
  } from "@/app/lib/regex"; // adjust import path if needed
  
  import { describe, it, expect } from "@jest/globals";
  
  function testRegex(pattern: string | RegExp, validCases: string[], invalidCases: string[]) {
    const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern;
  
    validCases.forEach((validCase) => {
      expect(regex.test(validCase)).toBe(true);
    });
  
    invalidCases.forEach((invalidCase) => {
      expect(regex.test(invalidCase)).toBe(false);
    });
  }
  
  describe("Username Validation Regex", () => {
    it("should validate usernames correctly", () => {
      // Valid usernames (start with letter, total length 6-20, underscores allowed)
      const validUsernames = [
        "username",
        "Username123",
        "user_name",
        "User123Name",
        "a123456", // minimum 6 characters
        "abcdefghijklmnopqrst", // 20 characters
      ];
  
      // Invalid usernames
      const invalidUsernames = [
        "user", // too short
        "123username", // starts with number
        "username!", // contains special character
        "user name", // contains space
        "_username", // starts with underscore
        "abcdefghijklmnopqrstuvwxyz", // too long
      ];
  
      testRegex(usernameRegex, validUsernames, invalidUsernames);
    });
  });
  
  describe("Email Validation Regex", () => {
    it("should validate email addresses correctly", () => {
      // Valid emails
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "user123@test-domain.org",
        "firstname.lastname@sub.domain.com",
      ];
  
      // Invalid emails
      const invalidEmails = [
        "plainaddress",
        "@missingdomain.com",
        "missing@.com",
        "missing@domain.",
        "missing@domain",
        "spaces @domain.com",
        "special!char@domain.com", // our simplified pattern disallows ! in local-part
      ];
  
      testRegex(emailRegex, validEmails, invalidEmails);
    });
  });
  
  describe("Password Validation Regex", () => {
    it("should validate passwords correctly", () => {
      // Valid passwords (min 6, includes upper, lower, digit, special)
      const validPasswords = [
        "Password1!",
        "MySecure123@",
        "TestPass123#",
        "Complex$Password456",
        "Pass1!", // 6 characters, meets the stated requirements
      ];
  
      // Invalid passwords
      const invalidPasswords = [
        "password", // missing uppercase, number, special char
        "PASSWORD", // missing lowercase, number, special char
        "Password", // missing number, special char
        "Password1", // missing special char
        "PASSWORD123!", // missing lowercase
        "password123!", // missing uppercase
        "PasswordOneTwo!", // missing number
      ];
  
      testRegex(passwordRegex, validPasswords, invalidPasswords);
    });
  });
  
  describe("At Least One Lower Case English Regex", () => {
    it("should detect presence of lowercase letters", () => {
      const validCases = ["password", "Password", "123abc", "TESTINGa"];
      const invalidCases = ["PASSWORD", "123456", "!@#$%^", ""];
  
      testRegex(atLeastOneLowerCaseEnglishRegex, validCases, invalidCases);
    });
  });
  
  describe("At Least One Upper Case English Regex", () => {
    it("should detect presence of uppercase letters", () => {
      const validCases = ["PASSWORD", "Password", "123ABC", "testingA"];
      const invalidCases = ["password", "123456", "!@#$%^", ""];
  
      testRegex(atLeastOneUpperCaseEnglishRegex, validCases, invalidCases);
    });
  });
  
  describe("At Least One Number Zero To Nine Regex", () => {
    it("should detect presence of numbers", () => {
      const validCases = ["123456", "Password1", "test123", "a1b2c3"];
      const invalidCases = ["password", "PASSWORD", "!@#$%^", "abcdef", ""];
  
      testRegex(atLeastOneNumberZeroToNineRegex, validCases, invalidCases);
    });
  });
  
  describe("At Least One Special Character Regex", () => {
    it("should detect presence of special characters", () => {
      const validCases = ["Password!", "test@123", "#$%^&*", "a!b@c#"];
      const invalidCases = ["password", "PASSWORD", "123456", "abcdef", ""];
  
      testRegex(atLeastOneSpecialCharacterRegex, validCases, invalidCases);
    });
  });
  
  describe("At Least Six Characters Regex", () => {
    it("should validate minimum length", () => {
      const validCases = ["123456", "password", "testing", "a!b@c#d$"];
      const invalidCases = ["", "1", "12", "123", "1234", "12345"];
  
      testRegex(atLeastSixCharactersRegex, validCases, invalidCases);
    });
  });
  
  describe("Letters And Numbers Only Regex", () => {
    it("should validate letters and numbers only", () => {
      const validCases = ["abc123", "ABCDEF", "123456", "a1b2c3", "", "test123"];
      const invalidCases = ["test!", "hello@world", "pass word", "test-123", "user.name", "user_name"];
  
      testRegex(lettersAndNumbersRegex, validCases, invalidCases);
    });
  });
  
  describe("No White Space Regex", () => {
    it("should detect absence of white spaces", () => {
      const validCases = ["password", "test123", "a!b@c#", "", "no-spaces-here"];
      const invalidCases = ["pass word", "test 123", " a", "b ", "a b c"];
  
      testRegex(noWhiteSpaceRegex, validCases, invalidCases);
    });
  });