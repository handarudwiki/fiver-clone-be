-- CreateTable
CREATE TABLE `logbook_sosialisasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `province` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `cretaed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logbook_monitoring_debitur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `finance_condition` VARCHAR(191) NOT NULL,
    `business_condition` VARCHAR(191) NOT NULL,
    `guarantor` VARCHAR(191) NOT NULL,
    `control` VARCHAR(191) NOT NULL,
    `payment_constraints` VARCHAR(191) NOT NULL,
    `conclusion` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logbook_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logbookSosialisasiId` INTEGER NULL,
    `logbookMonitoringDebiturId` INTEGER NULL,
    `image` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `logbook_images` ADD CONSTRAINT `logbook_images_logbookSosialisasiId_fkey` FOREIGN KEY (`logbookSosialisasiId`) REFERENCES `logbook_sosialisasi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logbook_images` ADD CONSTRAINT `logbook_images_logbookMonitoringDebiturId_fkey` FOREIGN KEY (`logbookMonitoringDebiturId`) REFERENCES `logbook_monitoring_debitur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
