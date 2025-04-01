import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateSlug } from 'src/utils';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateProductDto) {
    const slug = generateSlug(dto.name);
    return this.prisma.product.create({
      data: {
        ...dto,
        slug,
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(uuid: string) {
    return this.prisma.product.findUnique({
      where: {
        uuid,
      },
    });
  }

  update(uuid: string, dto: UpdateProductDto) {
    if (dto.name) {
      dto.slug = generateSlug(dto.name);
    }
    return this.prisma.product.update({
      where: {
        uuid,
      },
      data: dto,
    });
  }
}
