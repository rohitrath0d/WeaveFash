import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs' 




const prisma = new PrismaClient();

async function main() {
    const email = 'admin@gmail.com'
    const password = '123456'
    const name =  "Super Admin"


    const exisitingSuperAdmin = await prisma.user.findFirst({
        where : {role : 'SUPER_ADMIN'}
    })

    if(exisitingSuperAdmin){
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const superAdminUSer = await prisma.user.create({
        data : {
            email,
            password : hashedPassword,
            name,
            role : 'SUPER_ADMIN'
        }
    })

    console.log('Super Admin Created Successfully', superAdminUSer.email)
}

main()
    .catch((e) =>{
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await  prisma.$disconnect()
    });
    