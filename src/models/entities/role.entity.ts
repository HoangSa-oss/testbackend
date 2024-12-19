import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(Role.name)}s` })
export class Role extends AggregateRoot {
    constructor() {
        super();
    }

    @Prop()
    name: string;

    @Prop({ type: Number })
    permission: number;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
