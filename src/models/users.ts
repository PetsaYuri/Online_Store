import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
    fullName: string,
    email: string,
    password: string
};

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String
});

const User: mongoose.Model<IUser> = mongoose.model('User', userSchema);
export default User;