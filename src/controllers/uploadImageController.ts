const Busboy = require('busboy');
import { randomBytes } from "crypto";
import { Request, Response } from "express";
import uploadImage from "../uploadImage/uploadImage";

const uploadImageController = () => ({
    uploadImage: async (req: Request, res: Response): Promise<void> => {
        const busboy = Busboy({ headers: req.headers });
        busboy.on('file', (name: any, file: any, info: any) => {
            const filename = randomBytes(8).toString('hex');
            uploadImage(file, filename);
        });

        busboy.on('finish', () => {
            res.send("success");
        });

        req.pipe(busboy);
    }
})

export default uploadImageController;