import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';

export type TenantDocument = Tenant & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(Tenant.name)}s` })
export class Tenant extends AggregateRoot {
    @Prop()
    name: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
