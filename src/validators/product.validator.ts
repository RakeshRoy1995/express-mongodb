import { body } from 'express-validator';

export const createProductSchema = [
    body('name', 'Product name is required').isString(),
    body('price', 'Price is required').isString(),
    body('description', 'Description is required').isString(),
    body('status', 'Status is required').isString(),
];

export const updateProductSchema = [
    body('name', 'Product name is required').isString(),
    body('price', 'Price is required').isString(),
    body('description', 'Description is required').isString(),
    body('status', 'Status is required').isString(),
];
