import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ORDER_STATUS_ENUM } from 'src/constants/enum';

export class CreateOrderDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john@mailinator.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '980000000',
  })
  @IsString()
  contactNumber: string;

  @ApiProperty({
    example: '5000',
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    example: 'COD',
  })
  @IsString()
  paymentMethod: string;

  @ApiProperty({
    example: 'Kathmandu, Nepal',
  })
  @IsString()
  shippingAddress: string;

  @ApiProperty({
    example: [
      {
        productId: 1,
        quantity: 2,
        unitPrice: 1000,
      },
    ],
  })
  @IsArray()
  orderItems: any;

  @ApiProperty({
    example: 'PROCESSING',
  })
  @IsOptional()
  @IsEnum(ORDER_STATUS_ENUM)
  status?: ORDER_STATUS_ENUM;
}
