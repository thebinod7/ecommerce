import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { calculateTotalAmount, generateUniqueId } from 'src/utils';

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
    // 1. Create User
    const user = await this.upsertUserByEmail({ name, email, contactNumber });
    if (!user) throw new Error('User not found');
    // 2. Create Order
    const order = await this.prisma.order.create({
      data: {
        userId: user.id,
        trackingId: generateUniqueId(),
        quantity: orderItems.length,
        paymentMethod: dto.paymentMethod,
        shippingAddress: dto.shippingAddress,
        totalAmount: calculateTotalAmount(orderItems),
      },
    });
    // 3. Create OrderItems
    const orderItemsPayload = orderItems.map((item: any) => ({
      ...item,
      orderId: order.id,
      total: item.quantity * item.unitPrice,
    }));
    return this.createOrderItems(orderItemsPayload);
  }

  createOrderItems(payload: any) {
    return this.prisma.orderItem.createMany({
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
