import 'dotenv/config'
import { prisma } from '../server/utils/prisma'

async function seedDB() {
	try {
		console.log('Cleaning up existing users...')
		await prisma.user.deleteMany()

		console.log('Seeding new users...')
		await prisma.user.createMany({
			data: [
				{
					email: 'admin@transpalletplus.com',
					password: 'admin_password_123', // Recuerda hashear (ej. bcrypt) si implementas autenticación real
					role: 'ADMIN',
					account_status: 'ACTIVATED',
				},
				{
					email: 'user@transpalletplus.com',
					password: 'user_password_123',
					role: 'USER',
					account_status: 'ACTIVATED',
				},
				{
					email: 'deactivated@transpalletplus.com',
					password: 'password_123',
					role: 'USER',
					account_status: 'DEACTIVATED',
				},
			],
		})

		console.log('✅ Database seeded successfully')
	} catch (error) {
		console.error('❌ Error seeding database:', error)
	} finally {
		await prisma.$disconnect()
	}
}

seedDB()
