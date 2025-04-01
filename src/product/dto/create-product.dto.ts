import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Tshirt',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    example: 500,
  })
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @ApiProperty({
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    example: 'Red one',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
