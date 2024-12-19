import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

export function AutoGenerateSwagger(dto: any) {
    const schemaProperties = {};

    Object.keys(new dto()).forEach((key) => {
        const propertyType = Reflect.getMetadata(
            'design:type',
            dto.prototype,
            key,
        );

        // Set default values based on the property type
        let exampleValue;
        switch (propertyType) {
            case String:
                exampleValue = '';
                break;
            case Number:
                exampleValue = 0;
                break;
            case Boolean:
                exampleValue = false;
                break;
            default:
                // For objects or other types, assume it's an empty object or read child properties
                exampleValue = {};
        }

        // Construct Swagger schema property
        schemaProperties[key] = {
            type: typeof exampleValue,
            example: exampleValue,
        };
    });

    return applyDecorators(
        ApiBody({
            schema: {
                type: 'object',
                properties: schemaProperties,
            },
        }),
    );
}
