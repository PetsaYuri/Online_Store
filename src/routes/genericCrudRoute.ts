import express from 'express';
import genericCrudController from '../controllers/genericCrudController';
import swaggerDocument from '../swagger/swagger';
import { Model, Document } from 'mongoose';

const genericCrudRoute = <T extends Document>(Model: Model<T>, tag: string): express.Router => {
    const router: express.Router = express.Router();
    const controller = genericCrudController(Model);

    //const swaggerDocs = generateCrudSwaggerDocs(tag);
    swaggerDocument.paths[`/api/${tag}`] = {
        get: {
            tags: [`${tag} API`],
            responses: {
                200: {
                    description: 'success',
                }
            }
        }
    }
    router.get('/', controller.getAll);

    router.get('/:id', controller.getById);

    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.removeById);
    router.delete('/', controller.remove);

    return router;
}

export default genericCrudRoute;