import { date } from "zod";
import prisma from '../lib/prisma'
import { initialData } from "./seed";
import { countries } from "./seed-countries";


interface Abc {
    asd:String
}

async function main() {

    // 1 Borrar registros previos
    await Promise.all([
        
        prisma.orderItem.deleteMany(),
        prisma.orderAddress.deleteMany(),
        prisma.order.deleteMany(),

        prisma.userAddress.deleteMany(),
        prisma.user.deleteMany(),
        prisma.country.deleteMany(),
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
    ])

    await prisma.category.deleteMany();

    const { categories, products, users } = initialData;
    
    await prisma.user.createMany({
        data: users
    });

    await prisma.country.createMany({
        data: countries
    })
    
    // Categorias
    const categoriesData = categories.map((name) => ({name}));
    
    await prisma.category.createMany({
        data: categoriesData
    });

    // Productos

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) =>{
        map[ category.name.toLowerCase() ] = category.id;
    
        return map;
    }, {} as Record<string, string>);

    products.forEach( async(product) =>{
        const { type, images, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[ type]
            }
        })

        const imagesData = images.map( image => ({
            url: image,
            productId: dbProduct.id
        
        }));
    -               
        await prisma.productImage.createMany({
            data: imagesData
        });
    });
   

    console.log('Seed ejecutado correctamente')
}

(() =>{
    if (process.env.NODE_ENV === 'production') return;

    main();
})(); 