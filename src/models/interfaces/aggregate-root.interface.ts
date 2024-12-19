import { Types } from 'mongoose';

export interface AggregateRootModel {
    _id: Types.ObjectId;
    createdBy: string;
}
