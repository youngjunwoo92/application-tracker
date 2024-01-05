import * as yup from 'yup';

const emailValidation = yup
  .string()
  .email('Invalid email')
  .required('This field is required');

const passwordValidation = yup
  .string()
  .required('This field is required')
  .matches(/^.{8,16}$/, 'Must be 8 - 16 chracters')
  .matches(/[a-z]+/, 'At least 1 lowercase letter')
  .matches(/[A-Z]+/, 'At least 1 uppercase letter')
  .matches(/[@$!%*#?&]+/, 'At least 1 special character')
  .matches(/\d+/, 'At least 1 number');

const _passwordValidation = yup //
  .string()
  .test({
    test: (value: string, context) => {
      const atLeast8Chars = /^.{8,16}$/.test(value);
      const atLeastLowerCase = /[a-z]+/.test(value);
      const atLeastUpperCase = /[A-Z]+/.test(value);
      const atLeastSpecialChar = /[@$!%*#?&]+/.test(value);
      const atLeastNumber = /\d+/.test(value);

      const isValid =
        atLeast8Chars &&
        atLeastLowerCase &&
        atLeastUpperCase &&
        atLeastSpecialChar &&
        atLeastNumber;

      if (!isValid) {
        const errors = [];
        if (!atLeast8Chars)
          errors.push({ type: 'length', message: 'Must be 8 - 16 characters' });
        if (!atLeastLowerCase)
          errors.push({
            type: 'lowercase',
            message: 'At least 1 lowercase letter',
          });
        if (!atLeastUpperCase)
          errors.push({
            type: 'uppercase',
            message: 'At least 1 uppercase letter',
          });
        if (!atLeastSpecialChar)
          errors.push({
            type: 'special',
            message: 'At least 1 special character',
          });
        if (!atLeastNumber)
          errors.push({ type: 'number', message: 'At least 1 number' });
        return context.createError({ message: JSON.stringify(errors) });
      }

      return true;
    },
  });

export const loginSchema = yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export const registerSchema = yup.object({
  email: emailValidation,
  password: _passwordValidation,
  confirmPassword: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password')], 'The passwords you entered do not match.'),
});
