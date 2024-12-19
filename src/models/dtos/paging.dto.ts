import { Transform } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsOptional,
    IsString,
} from 'class-validator';
import mongoose, { SortOrder } from 'mongoose';

export class PagingDto {
    @IsOptional()
    @Transform(({ value }) => Number.parseInt(value, 10))
    page: number;

    @IsOptional()
    @Transform(({ value }) => Number.parseInt(value, 10))
    size: number;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    getAll?: boolean;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsArray()
    array: any;

    @IsOptional()
    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    endDate: Date;

    // json ignore
    skip() {
        if (!this.page || this.page < 1) {
            this.page = 1;
        }

        if (!this.size || this.size < 1) {
            this.size = 10;
        }

        return (this.page - 1) * this.size;
    }
}

export class PagingSortDto<T> extends PagingDto {
    sort?: SortOrder; // example: 'asc' | 'desc'
    sortBy?: T;
}

export class PageResult<T> {
    items: T[];
    page?: number;
    pageSize?: number;
    size?: number;
    total?: number;
}

export class KeyValuePair {
    [key: string]:
        | string
        | boolean
        | number
        // eslint-disable-next-line @typescript-eslint/ban-types
        | Function
        | mongoose.Types.ObjectId
        | object;
}
