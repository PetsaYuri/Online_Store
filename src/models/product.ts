import mongoose, { Schema } from 'mongoose';

export interface IProduct extends mongoose.Document {
    title: string;
    description?: string;
    price: number;
    amount: number;
    dateOfCreation?: Date;
}

const productSchema: Schema<IProduct> = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        default: 100
    },
    amount: {
        type: Number,
        default: 1
    },
    dateOfCreation: Date
});

const Product: mongoose.Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);
export default Product;