import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PagingSortDto } from '@/dtos/paging.dto';
import { MerchantSortBy } from '@/entities/merchant.entity';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  async create(@Body() createMerchantDto: CreateMerchantDto) {
    return await this.merchantService.create(createMerchantDto);
  }

  @Get()
  async findAll(@Query() queryParams: PagingSortDto<MerchantSortBy>) {
    return await this.merchantService.findAll(queryParams);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.merchantService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMerchantDto: UpdateMerchantDto) {
    return await this.merchantService.update(id, updateMerchantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.merchantService.remove(id);
  }
}
