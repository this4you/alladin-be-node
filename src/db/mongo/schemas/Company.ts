import { Schema, model } from 'mongoose';

interface ICompany {
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

