import mongoose from 'mongoose';
mongoose.set('strictPopulate', false);

const uname = 'shrey';
const pwd = '6rdh4brBkfiod5uZ';

const mongoDB = `mongodb+srv://eloi:Awarenesspass2023!@cluster0.8j1pgnc.mongodb.net`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
};

export default connectDB;
