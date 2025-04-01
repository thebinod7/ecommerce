import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.productService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(uuid, dto);
  }
}
