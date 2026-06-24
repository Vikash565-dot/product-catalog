require("dotenv").config();

console.log(process.env.DATABASE_URL);


const prisma = require("../db");
const { faker } = require("@faker-js/faker");
const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Sports",
  "Home",
  "Beauty",
  "Toys",
];
const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;
async function seed() {
  for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {

    const products = [];

    for (let j = 0; j < BATCH_SIZE; j++) {

      products.push({
        name: faker.commerce.productName(),
        category:
          categories[Math.floor(Math.random() * categories.length)],
        price: Number(
          faker.commerce.price({
            min: 100,
            max: 100000,
          })
        ),
      });
    }

    await prisma.product.createMany({
      data: products,
    });

    console.log(`Inserted ${i + BATCH_SIZE}`);
  }

  console.log("Done");
}
seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());