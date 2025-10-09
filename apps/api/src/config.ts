export const SECRET_KEY = 'awareness_backend_rocks';
export const SENDGRID_API_KEY = 'abcdef';
export const EMAIL_FROM = 'awareness@gmail.com';
export const FRONTEND_URL = process.env.NEXT_PUBLIC_GRAPHQL_API;

export const COMMON = {
  USER: {
    USER_REGISTER_SUCCESS: 'User Registered successfully.',
    USER_LOGIN_SUCCESS: 'User Logged in successfully.',
    IF_YOU_HAVE_REGISTERED_YOU_WILL_RECEIVE_EMAIL:
      'If you have registered, you will receive an email.',
    USER_VERIFIED_SUCCESS: 'User verified successfully.',
    PASSWORD_RESET_SUCCESS: 'Password reset successfully.',
    USER_LOGGED_OUT_SUCCESS: 'User logged out successfully.',
    USER_ALREADY_EXISTING_SUCCESS: 'User already exists',
    AN_ERROR_OCCURRED_WHILE_SENDING_EMAIL:
      'An error occurred while attempting to send the email.',
  },

  EMAIL_OR_PASSWORD_IS_NOT_CORRECT:
    'Incorrect email or password, Please try again',
  ENTERED_CODE_IS_NOT_VALID:
    'Entered code is not valid, please resend and validate',
  USER_IS_NOT_VERIFIED: 'You are not verified with your email',
  USER_NOT_FOUND: 'User not found!',
  THIS_EMAIL_IS_ALREADY_USED: 'This Email is already in use.',
  INVALID_EMAIL_FORMAT: 'Invalid email format',
  INVALID_OR_EXPIRED_TOKEN: 'Invalid or expired token',
};
