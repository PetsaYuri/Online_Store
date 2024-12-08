import express, { Request, Response } from 'express';
import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import ProccessEnv from './dotenv/processEnv';

import genericCrudRoute from './routes/genericCrudRoute';

const app = express();
const port = process.env.SERVER_PORT || 3000;
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
});

//routes
//product
import Product, { IProduct } from './models/product';
const productRoute: express.Router = genericCrudRoute(Product as Model<IProduct>, "products");
app.use("/api/products", productRoute);

//users
/*const userRoute = require('./routes/userRoute');
app.use("/api/users", userRoute);*/

//order
import orderRoute from './routes/orderRoute';
app.use('/api/orders', orderRoute as express.Router);

//swagger
import swaggerUIPath from 'swagger-ui-express';
import swaggerOptions from './swagger/swagger';

app.get('/api-docs.json', (req: Request, res: Response): void => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerOptions);
});

//supabase
import uploadFileRoute from './routes/uploadFileRoute';
app.use('/api/uploadImage', uploadFileRoute as express.Router);

app.use('/api/docs', swaggerUIPath.serve, swaggerUIPath.setup(swaggerOptions));

//console.log("mongo = " + Procc)
mongoose.connect(process.env.MONGODB_URI || '');