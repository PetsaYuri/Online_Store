import express from 'express';
import { Model } from 'mongoose';
const router: express.Router = express.Router();
import Order, { IOrder } from '../models/orders';

import createOrder from '../controllers/orderController';
import genericCrudRoute from './genericCrudRoute';

router.post('/', createOrder);
router.use(genericCrudRoute(Order as Model<IOrder>, "orders"));

export default router;