import { Request, Response } from 'express';
import logger from '../config/logger';
import { iApiUser } from '../interfaces/auth.interface';
import Product from '../models/Product.model';
import { formatError } from '../utils/error.util';
const NAMESPACE = 'Product Controller';


// Create Categories
export const createProduct = async (req: any, res: any) => {
    try {
        const { name, description , price , status } = req.body;
        const newCategorie = new Product({ name, description , price , status , image : req?.files?.image[0].filename});
        await newCategorie.save();

        res.json({ success: true , newCategorie });
    } catch (err: any) {
        logger.error(NAMESPACE, 'Create Product error', err);
        res.status(500).json(formatError(err));
    }
};

// Update Product
export const updateProduct = async (req: any, res: any) => {
    

    try {
        const { id , name, description , price , status } = req.body;
        const categorieFound = await Product.findById(id);

        if (!categorieFound) {
            return res.status(404).json(formatError('Product not found'));
        }

        const to_update: any = {
            name,
            description,
            price,
            status,
            
        };

        console.log("req?.files" , req?.files , req.body);
        

        if (req?.files?.image) {
            to_update.image = req?.files?.image[0].filename
        }

        await Product.findByIdAndUpdate(id, to_update);

        res.json({ success: true });
    } catch (err: any) {
        logger.error(NAMESPACE, 'Update Product error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// View Single Product
export const singleProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productFound = await Product.findById(id);

        if (!productFound) {
            return res.status(404).json(formatError('No Product found'));
        }

        res.json(productFound);
    } catch (err: any) {
        logger.error(NAMESPACE, 'View single categorie error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// delete Single Product
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categorieFound = await Product.findById(id);

        if (!categorieFound) {
            return res.status(404).json(formatError('No Product found'));
        }

        await Product.findByIdAndDelete(id);

        res.json({ msg: 'success' });
    } catch (err: any) {
        logger.error(NAMESPACE, 'View single categorie error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// Get All Products
export const getAllProduct = async (req: Request, res: Response) => {
    try {
        const published = req.query.published;

        if (published === 'true') {
            const today = new Date().toISOString();
            const data = await Product.find({ publish: true }).sort({ date: 'asc' });
            return res.json(data);
        } else {
            const data = await Product.find({}).sort({ date: 'asc' });
            return res.json(data);
        }
    } catch (err: any) {
        logger.error(NAMESPACE, 'View all data error', err);
        res.status(500).json(formatError('Server error'));
    }
};
