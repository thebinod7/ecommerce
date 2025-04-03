import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateUniqueId } from 'src/utils';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async upsertUserByEmail({ name, email, contactNumber }) {
    return this.prisma.user.upsert({
      where: {
        email,
      },
      update: {
        name,
        contactNumber,
      },
      create: {
        name,
        email,
        contactNumber,
      },
    });
  }

  async create(dto: CreateOrderDto) {
    const { name, email, contactNumber, orderItems } = dto;
    // 1. Create or update user
    const user = await this.upsertUserByEmail({ name, email, contactNumber });
    if (!user) throw new Error('User not found');
    // 2. Create Atomic Order
    return this.prisma.$transaction(async (txn: PrismaClient) => {
      const order = await txn.order.create({
        data: {
          userId: user.id,
          trackingId: generateUniqueId(),
          quantity: orderItems.length,
          paymentMethod: dto.paymentMethod,
          shippingAddress: dto.shippingAddress,
          totalAmount: dto.totalAmount,
        },
      });
      // 3. Create OrderItems
      const orderItemsPayload = orderItems.map((item: any) => ({
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.quantity * item.unitPrice,
        productId: item.productId,
        orderId: order.id,
      }));
      return this.createOrderItems(txn, orderItemsPayload);
    });
  }

  createOrderItems(txn: PrismaClient, payload: any) {
    return txn.orderItem.createMany({
      data: payload,
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(uuid: string) {
    return this.prisma.order.findUnique({
      where: {
        uuid,
      },
    });
  }

  update(uuid: string, dto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: {
        uuid,
      },
      data: {
        ...dto,
      },
    });
  }
}
