import Order from '../models/orders';
import Product from '../models/product';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

async function create(req: Request, res: Response): Promise<void> {
    let body = req.body;
    const totalPrice = await getTotalPrice(body.products);
    body.totalPrice = totalPrice;

    const newOrder = new Order(body);
    res.json(await Order.create(newOrder));
}

async function getTotalPrice(productIds: Array<Types.ObjectId>): Promise<number> {
    const products = await Promise.all(productIds.map(async (productId) => {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error(`product with id: ${productId} doesn't exist`);
        }

        return product;
    }));
    return products.reduce((totalPrice, product) => totalPrice + product.price, 0);
};

export default create;