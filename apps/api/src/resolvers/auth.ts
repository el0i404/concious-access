/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import User from '../models/User';
import { COMMON, SECRET_KEY } from '../config';
import { generateUniqueCode } from '../utils';
import { sendMailHandler } from '../utils/mail';

interface RegisterArgs {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  organization: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface AuthPayload {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  token?: string;
  organization: string;
  isVerified: boolean;
}

interface AuthResponseProp {
  status: number;
  message: string;
  data: AuthPayload;
}
interface ForgotPasswordArgs {
  email: string;
}

const generateToken = (user: User): string => {
  const token = sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
  return token;
};

export const isEmailValid = (email: string): boolean => {
  // Regular expression to check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const generateCodeAndSendMail = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new GraphQLError(COMMON.EMAIL_OR_PASSWORD_IS_NOT_CORRECT);
  }
  let uniqueCode = null;
  if (user.isVerified) {
    uniqueCode = await generateUniqueCode('forgotPwd');
    user.forgotPasswordEmailCode = uniqueCode;
    await sendMailHandler(email, uniqueCode, 'forgotResend');
  } else {
    uniqueCode = await generateUniqueCode('registration');
    user.registrationEmailCode = uniqueCode;
    await sendMailHandler(email, uniqueCode, 'registration');
  }
  await user.save();

  return user;
};

const authResolver = {
  Mutation: {
    /*
     * Register Users
     */
    register: async (
      _: any,
      { first_name, last_name, email, password, organization }: RegisterArgs
    ): Promise<AuthResponseProp> => {
      if (!isEmailValid(email)) {
        throw new Error(COMMON.INVALID_EMAIL_FORMAT);
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error(COMMON.USER.USER_ALREADY_EXISTING_SUCCESS);
      }

      const uniqueCode = await generateUniqueCode('registration');
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        first_name,
        last_name,
        email,
        organization,
        password: hashedPassword,
        registrationEmailCode: uniqueCode,
      });

      const savedUser = await newUser.save();

      await sendMailHandler(email, uniqueCode, 'registration');

      return {
        status: 0,
        message: COMMON.USER.USER_REGISTER_SUCCESS,
        data: {
          id: savedUser._id.toString(),
          first_name: savedUser.first_name,
          last_name: savedUser.last_name,
          email: savedUser.email,
          organization: savedUser.organization,
          isVerified: savedUser.isVerified,
        },
      };
    },

    /*
     * Login User
     */
    login: async (
      _: any,
      { email, password }: LoginArgs
    ): Promise<AuthResponseProp> => {
      try {
        if (!isEmailValid(email)) {
          throw new GraphQLError(COMMON.INVALID_EMAIL_FORMAT);
        }
        const user = await User.findOne({ email });

        if (!user) {
          throw new GraphQLError(COMMON.EMAIL_OR_PASSWORD_IS_NOT_CORRECT);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new GraphQLError(COMMON.EMAIL_OR_PASSWORD_IS_NOT_CORRECT);
        }

        const returnData = {
          id: user._id.toString(),
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          organization: user.organization,
          isVerified: user.isVerified,
          role: user.role,
        };

        let token = '';
        if (user.isVerified) {
          token = await generateToken(user);
          returnData['token'] = token;
        }

        user.token = token;
        await user.save();

        return {
          status: 0,
          message: COMMON.USER.USER_LOGIN_SUCCESS,
          data: { ...returnData },
        };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },

    /*
     * Forgot Password use user email and send mail via sendGrid
     */
    forgotPassword: async (_: any, { email }: ForgotPasswordArgs) => {
      try {
        const res = await generateCodeAndSendMail(email);
        if (res) {
          return {
            success: true,
            message: COMMON.USER.IF_YOU_HAVE_REGISTERED_YOU_WILL_RECEIVE_EMAIL,
            id: res._id,
            email: res.email,
          };
        } else {
          return {
            success: false,
            email: res.email,
            message: COMMON.USER.AN_ERROR_OCCURRED_WHILE_SENDING_EMAIL,
          };
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },

    /*
     * Fetch Code and Validate
     */
    verifyCode: async (_, { id, code }) => {
      try {
        const user = await User.findById(id);
        let user1 = null;
        if (user && user.isVerified) {
          user1 = await User.findOne({
            _id: id,
            forgotPasswordEmailCode: code,
          });
        } else {
          user1 = await User.findOne({ _id: id, registrationEmailCode: code });
        }

        if (!user1) {
          throw new GraphQLError(COMMON.ENTERED_CODE_IS_NOT_VALID);
        }

        if (!user1.isVerified) {
          user1.isVerified = true;
        }

        await user1.save();

        return {
          success: true,
          message: COMMON.USER.USER_VERIFIED_SUCCESS,
        };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },

    /*
     * Reset Password Using token and password
     */
    resetPassword: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user || !user.isVerified) {
          throw new GraphQLError('Please Verify your email address.');
        }

        // Update the user's password
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        await user.save();

        return {
          success: true,
          message: COMMON.USER.PASSWORD_RESET_SUCCESS,
        };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },

    /*
     * Resend the code
     */
    resendCode: async (_, { email }) => {
      try {
        const res = await generateCodeAndSendMail(email);
        if (res) {
          return {
            success: true,
            message: COMMON.USER.IF_YOU_HAVE_REGISTERED_YOU_WILL_RECEIVE_EMAIL,
            id: res._id,
          };
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },

    /*
     * Logout
     */
    logout: async (_, __, { req }) => {
      const token = req.headers.authorization.split(' ')[1];

      try {
        // Check if the token exists in the database
        const existingToken = await User.findOne({ token: token });
        existingToken.token = null;
        await existingToken.save();

        return {
          success: true,
          message: COMMON.USER.USER_LOGGED_OUT_SUCCESS,
        };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};

export default authResolver;
