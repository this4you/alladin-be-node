import { Schema, model } from 'mongoose';

export interface ICompany {
    _id: string;
    name: string;
}

const schema = new Schema<ICompany>(
    {
        name: { type: String, required: true, unique: true },
    },
    {
        id: true,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

export const CompanyEntity = model<ICompany>('Company', schema);

