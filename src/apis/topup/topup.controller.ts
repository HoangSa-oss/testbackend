import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TopupService } from './topup.service';
import { CreateTopupDto } from './dto/create-topup.dto';
import { UpdateTopupDto } from './dto/update-topup.dto';

@Controller('topup')
export class TopupController {
  constructor(private readonly topupService: TopupService) {}

  @Post()
  async create(@Body() createTopupDto: CreateTopupDto) {
    return await this.topupService.create(createTopupDto);
  }

  @Get()
  findAll() {
    return this.topupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.topupService.findOne(id);
  }

  @Get('merchant/:merchantId')
  async findByMerchant(@Param('merchantId') merchantId: string) {
    return await this.topupService.findByMerchant(merchantId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTopupDto: UpdateTopupDto) {
    return await this.topupService.update(id, updateTopupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.topupService.remove(id);
  }
}
