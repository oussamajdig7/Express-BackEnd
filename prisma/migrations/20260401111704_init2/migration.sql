/*
  Warnings:

  - Added the required column `updatedAt` to the `Categorie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Vendeur` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Produit_IdCategorie_fkey` ON `produit`;

-- AlterTable
ALTER TABLE `categorie` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `produit` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `vendeur` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `idVendeur` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idProduit` INTEGER NOT NULL,
    `idClient` INTEGER NOT NULL,
    `Qte` INTEGER NOT NULL,
    `CordonnéGPS` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produit` ADD CONSTRAINT `Produit_IdCategorie_fkey` FOREIGN KEY (`IdCategorie`) REFERENCES `Categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_idVendeur_fkey` FOREIGN KEY (`idVendeur`) REFERENCES `Vendeur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vente` ADD CONSTRAINT `Vente_idProduit_fkey` FOREIGN KEY (`idProduit`) REFERENCES `Produit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vente` ADD CONSTRAINT `Vente_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
