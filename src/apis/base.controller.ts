import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

// @UseInterceptors(TransformInterceptor)
export class BaseController {}
