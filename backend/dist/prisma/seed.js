"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const passwordHash = await bcrypt_1.default.hash('ChangeMe123!', 12);
    const district = await prisma.district.upsert({
        where: { code: 'SALEM' },
        update: {},
        create: { code: 'SALEM', name: 'Salem' },
    });
    const shopkeeper = await prisma.user.upsert({
        where: { mobileNumber: '9000000002' },
        update: {},
        create: { fullName: 'Ravi Kumar', mobileNumber: '9000000002', passwordHash, role: 'SHOPKEEPER', districtId: district.id },
    });
    const shop = await prisma.shop.upsert({
        where: { code: 'FPS-102' },
        update: {},
        create: { code: 'FPS-102', name: 'Fair Price Shop - 102', address: 'Salem Main Road', districtId: district.id, shopkeeperId: shopkeeper.id },
    });
    const citizen = await prisma.user.upsert({
        where: { mobileNumber: '9000000001' },
        update: {},
        create: { fullName: 'Aarav Kumar', mobileNumber: '9000000001', passwordHash, role: 'CITIZEN', districtId: district.id },
    });
    await prisma.rationCard.upsert({
        where: { citizenId: citizen.id },
        update: {},
        create: { citizenId: citizen.id, cardNumber: 'TN-102-458-921', aadhaarLast4: '1234', address: 'House 12, Ward 3, Salem', familySize: 4 },
    });
    for (const commodity of [
        { code: 'RICE', name: 'Rice', unit: 'kg' }, { code: 'SUGAR', name: 'Sugar', unit: 'kg' },
        { code: 'OIL', name: 'Oil', unit: 'L' }, { code: 'WHEAT', name: 'Wheat', unit: 'kg' },
    ]) {
        const saved = await prisma.commodity.upsert({ where: { code: commodity.code }, update: { name: commodity.name, unit: commodity.unit }, create: commodity });
        await prisma.inventory.upsert({
            where: { shopId_commodityId: { shopId: shop.id, commodityId: saved.id } },
            update: {}, create: { shopId: shop.id, commodityId: saved.id, quantity: 100, reorderLevel: 25 },
        });
    }
}
main().finally(() => prisma.$disconnect());
