/**
 * Password validation and strength checking utilities
 */

export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate password strength
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export function validatePasswordStrength(password: string): PasswordValidation {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[@$!%*?&#^()_+=\-\[\]{};:'",.<>?/\\|`~]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Check if password is commonly used (basic check)
 */
const commonPasswords = [
  'password', 'password123', '123456', '12345678', 'qwerty', 
  'abc123', 'monkey', '1234567', 'letmein', 'trustno1',
  'dragon', 'baseball', 'iloveyou', 'master', 'sunshine',
  'ashley', 'bailey', 'passw0rd', 'shadow', '123123',
  'admin', 'admin123', 'root', 'toor', 'pass', 'test'
];

export function isCommonPassword(password: string): boolean {
  const lowerPassword = password.toLowerCase();
  return commonPasswords.some(common => 
    lowerPassword === common || lowerPassword.includes(common)
  );
}

/**
 * Comprehensive password validation
 */
export function validatePassword(password: string): PasswordValidation {
  const strengthValidation = validatePasswordStrength(password);
  
  if (!strengthValidation.isValid) {
    return strengthValidation;
  }

  if (isCommonPassword(password)) {
    return {
      isValid: false,
      errors: ['Password is too common. Please choose a more unique password.'],
    };
  }

  return {
    isValid: true,
    errors: [],
  };
}

