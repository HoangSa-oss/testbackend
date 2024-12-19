import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';

export type RoleDocument = RoleV2 & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(RoleV2.name)}s` })
export class RoleV2 extends AggregateRoot {
    constructor() {
        super();
    }

    @Prop()
    name: string;

    @Prop({ type: Number })
    permission: number;
}

export const RoleSchema = SchemaFactory.createForClass(RoleV2);
