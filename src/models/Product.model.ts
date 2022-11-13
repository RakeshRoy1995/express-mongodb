import { Document, model, Schema } from 'mongoose';

interface ProductDocument extends Document {
    user: Schema.Types.ObjectId | string;
    name: string;
    description: string;
    
}

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            // unique: true,
        },
        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            // unique: true,
        },
        status: {
            type: Number,
            required: true,
        },

        image: {
            type: String,
            required: true,
            // unique: true,
        },
    },
    { timestamps: true }
);

const Product = model<ProductDocument>('products', ProductSchema);

export default Product;
