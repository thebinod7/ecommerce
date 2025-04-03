import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async appStats() {
    const users = await this.prisma.user.count();
    const orders = await this.prisma.order.count();
    const result = await this.prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    return { users, orders, grossSales: result._sum.totalAmount || 0 };
  }
}
