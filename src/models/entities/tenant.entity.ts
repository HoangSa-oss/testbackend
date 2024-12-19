import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';

export type TenantDocument = TenantV2 & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(TenantV2.name)}s` })
export class TenantV2 extends AggregateRoot {
    @Prop()
    name: string;
}

export const TenantSchema = SchemaFactory.createForClass(TenantV2);
