import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';

const genericCrudController = <T extends Document>(Model: Model<T>) => ({
    getAll: async (req: Request, res: Response): Promise<void> => {
        const items = await Model.find();
        res.json(items);
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const item = await Model.findById(id);
        res.json(item);
    },

    create: async (req: Request, res: Response): Promise<void> => {
        const item = new Model(req.body);
        res.json(await Model.create(item));
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        await Model.findByIdAndUpdate(id, req.body);
        res.json(await Model.findById(id));
    },

    removeById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        await Model.findByIdAndDelete(id);
        res.send("success");
    },

    remove: async (req: Request, res: Response): Promise<void> => {
        await Model.deleteMany({});
        res.send("success");
    }

});

export default genericCrudController;