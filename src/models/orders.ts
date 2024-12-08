import mongoose from 'mongoose';
import Product from './product';

export interface IOrder extends mongoose.Document {
    totalPrice: number,
    products: mongoose.Types.ObjectId[];
}

const OrderSchema: mongoose.Schema<IOrder> = new mongoose.Schema({
    totalPrice: Number,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    }]
});

const Order: mongoose.Model<IOrder> = mongoose.model('Order', OrderSchema);
export default Order;