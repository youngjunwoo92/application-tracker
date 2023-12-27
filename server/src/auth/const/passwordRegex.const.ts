/**
 * - Must be 8 - 16 characters long
 * - At least one lowercase letter
 * - At least one uppercase letter
 * - At least one special chracter
 */

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;
