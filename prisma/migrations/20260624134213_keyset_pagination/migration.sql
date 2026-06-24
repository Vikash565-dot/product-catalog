-- DropIndex
DROP INDEX "Product_category_updatedAt_id_idx";

-- DropIndex
DROP INDEX "Product_updatedAt_id_idx";

-- CreateIndex
CREATE INDEX "Product_createdAt_id_idx" ON "Product"("createdAt" DESC, "id" DESC);

-- CreateIndex
CREATE INDEX "Product_category_createdAt_id_idx" ON "Product"("category", "createdAt" DESC, "id" DESC);
