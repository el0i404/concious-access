import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import User from '../models/User';
import { COMMON } from '../config';
import authenticateToken from '../utils/authenticateToken';
import { isEmailValid } from './auth';

const userResolver = {
  Query: {
    getUser: async (_, { id }, { req, res }) => {
      // Fetch user details based on ID
      const tokenSecret = req.headers?.authorization?.split(' ')[1];
      const isAuthenticated = await authenticateToken(tokenSecret);
      if (!isAuthenticated || !(isAuthenticated?.role === 'admin')) {
        throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
          extensions: { code: '401' },
        });
      }
      try {
        return await User.findById(id);
      } catch (error) {
        return new GraphQLError(error);
      }
    },
    getUsers: async (_, __, { req, res }) => {
      // Fetch all users
      const tokenSecret = req.headers?.authorization?.split(' ')[1];
      const isAuthenticated = await authenticateToken(tokenSecret);
      if (!isAuthenticated || !(isAuthenticated?.role === 'admin')) {
        throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
          extensions: { code: '401' },
        });
      }
      try {
        const users = await User.find({ role: { $ne: 'admin' } }).sort({
          createdAt: -1,
        });
        return users;
      } catch (error) {
        return new GraphQLError(error);
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }, { req }) => {
      const tokenSecret = req.headers?.authorization?.split(' ')[1];
      const isAuthenticated = await authenticateToken(tokenSecret);
      if (!isAuthenticated || !(isAuthenticated?.role === 'admin')) {
        throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
          extensions: { code: '401' },
        });
      }
      const { first_name, last_name, email, password, organization } = input;

      if (!input.organization) {
        throw new GraphQLError('Organization is required');
      }
      if (!input.password) {
        throw new GraphQLError('Password is required');
      }
      if (!input.email) {
        throw new GraphQLError('Email is required');
      }
      if (!isEmailValid(email)) {
        throw new GraphQLError(COMMON.INVALID_EMAIL_FORMAT);
      }
      const user = await User.findOne({ email });
      if (user) {
        throw new GraphQLError(COMMON.THIS_EMAIL_IS_ALREADY_USED);
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user based on the input
      try {
        const newUser = new User({
          first_name,
          last_name,
          email,
          organization,
          password: hashedPassword,
          isVerified: true,
        });
        await newUser.save();
        return newUser;
      } catch (error) {
        return new GraphQLError(error);
      }
    },

    updateUser: async (_, { id, input }, { req }) => {
      // Update an existing user based on ID and input
      const tokenSecret = req.headers?.authorization?.split(' ')[1];
      const isAuthenticated = await authenticateToken(tokenSecret);
      if (!isAuthenticated || !(isAuthenticated?.role === 'admin')) {
        throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
          extensions: { code: '401' },
        });
      }
      const user = await User.findOne({ email: input.email });
      if (user && user.id.toString() !== id) {
        throw new GraphQLError(COMMON.THIS_EMAIL_IS_ALREADY_USED);
      }
      let hashedPassword = null;
      if (input?.password && input?.password !== '') {
        hashedPassword = await bcrypt.hash(input.password, 12);
        input.password = hashedPassword;
      } else {
        delete input.password;
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(id, input, {
          new: true,
        });
        return updatedUser;
      } catch (error) {
        return new GraphQLError(error);
      }
    },

    deleteUser: async (_, { id }, { req }) => {
      const tokenSecret = req.headers?.authorization?.split(' ')[1];
      const isAuthenticated = await authenticateToken(tokenSecret);
      if (!isAuthenticated || !(isAuthenticated?.role === 'admin')) {
        throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
          extensions: { code: '401' },
        });
      }
      // Delete a user based on ID
      try {
        await User.findByIdAndDelete(id);
        return true;
      } catch (error) {
        return new GraphQLError(error);
      }
    },
  },
};
export default userResolver;
