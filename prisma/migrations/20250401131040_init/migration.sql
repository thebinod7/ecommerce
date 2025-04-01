-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('ORDERED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "tbl_users" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_products" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_orders" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "trackingId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "status" "ORDER_STATUS" NOT NULL DEFAULT 'ORDERED',
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_order_items" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_uuid_key" ON "tbl_users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_email_key" ON "tbl_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_contactNumber_key" ON "tbl_users"("contactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_products_uuid_key" ON "tbl_products"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_products_slug_key" ON "tbl_products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_orders_uuid_key" ON "tbl_orders"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_orders_trackingId_key" ON "tbl_orders"("trackingId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_order_items_uuid_key" ON "tbl_order_items"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_order_items_orderId_productId_key" ON "tbl_order_items"("orderId", "productId");

-- AddForeignKey
ALTER TABLE "tbl_orders" ADD CONSTRAINT "tbl_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_order_items" ADD CONSTRAINT "tbl_order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "tbl_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_order_items" ADD CONSTRAINT "tbl_order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "tbl_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
