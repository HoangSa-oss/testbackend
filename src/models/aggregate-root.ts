import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export abstract class AggregateRoot extends Document {
    @Prop()
    createdBy: string;
    @Prop()
    updatedBy: string;
}
