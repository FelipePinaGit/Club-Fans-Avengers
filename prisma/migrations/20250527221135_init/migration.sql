-- CreateTable
CREATE TABLE `Avenger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `actor` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Habilidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `habilidad` VARCHAR(191) NOT NULL,
    `avengerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Habilidad` ADD CONSTRAINT `Habilidad_avengerId_fkey` FOREIGN KEY (`avengerId`) REFERENCES `Avenger`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
