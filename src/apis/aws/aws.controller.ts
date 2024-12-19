import {
    BadRequestException,
    Controller,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import convert from 'heic-convert';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AwsService } from './aws.service';
import mongoose from 'mongoose';
import _ from 'lodash';

@Controller('aws')
@ApiTags('AWS')
export class AwsController {
    constructor(private readonly awsService: AwsService) {}

    @Get('temporary')
    @UseGuards(JwtAuthGuard)
    async generateTemporaryKey() {
        return await this.awsService.getSessionToken();
    }

    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 51380224 }), // 51380224 bytes = 49MB
                    new FileTypeValidator({
                        fileType: new RegExp(
                            '.(gif|heic|jpe?g|tiff?|png|webp|bmp|pdf)$',
                            'i',
                        ),
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Req() req,
    ) {
        const { userId } = req.user;
        const url = await this.awsService.createFile(file, userId);
        if (!url) {
            return new BadRequestException('Upload error');
        }

        return url;
    }

    @Post('convert-heic')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async convertHeicFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 51380224 }), // 51380224 bytes = 49MB
                    new FileTypeValidator({
                        fileType: new RegExp('.(heic)$', 'i'),
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Query('type') type: string,
        @Req() req,
    ) {
        const typeFormat = _.toUpper(type) === 'JPEG' ? 'JPEG' : 'PNG';
        const fileConverted = await convert({
            buffer: file.buffer,
            format: typeFormat,
        });

        const { userId } = req.user;
        const uint8View = new Uint8Array(fileConverted);
        const newId = new mongoose.Types.ObjectId().toString();
        const originFileName = _.first(file.originalname.split('.'));
        const fileName = `${originFileName}_${newId}.${_.toLower(typeFormat)}`;

        const url = await this.awsService.createFileBuffer(
            uint8View,
            fileName,
            type,
            userId,
        );
        return url;
    }

    // @Get('image')
    // async getFile() {
    //     const result = await this.awsService.getFile(
    //         '633b395d249b6de9dd18cfda',
    //     );

    //     const pdfUrl =
    //         'https://extracy-edu-dev.s3.ap-southeast-1.amazonaws.com/templates/GoldCert_blank_FA.pdf';
    //     // await this.awsService.createCertificate(pdfUrl);
    //     return true;
    // }

    // @Get('move')
    // @UseGuards(JwtAuthGuard)
    // async moveFile(@Req() req) {
    //     const { userId } = req.user;
    //     const result = await this.awsService.getFile(
    //         '633b3a9453341197d89a6703',
    //     );

    //     const res = await this.awsService.moveFile(
    //         result.url,
    //         userId,
    //         result.mimeType,
    //     );
    //     return res;
    // }
}
