const prisma = require("../db");

const getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category;

    let cursor = null;

    if (req.query.cursor) {
      cursor = JSON.parse(
        Buffer.from(req.query.cursor, "base64").toString()
      );
    }

    const where = {};

    if (category) {
      where.category = category;
    }

    // KEYSET PAGINATION CONDITION
    if (cursor) {
      where.OR = [
        {
          createdAt: {
            lt: new Date(cursor.createdAt),
          },
        },
        {
          AND: [
            {
              createdAt: new Date(cursor.createdAt),
            },
            {
              id: {
                lt: cursor.id,
              },
            },
          ],
        },
      ];
    }

    console.time("query");

    const products = await prisma.product.findMany({
      where,
      take: limit,

      orderBy: [
        {
          createdAt: "desc",
        },
        {
          id: "desc",
        },
      ],
    });

    console.timeEnd("query");

    let nextCursor = null;

    if (products.length === limit) {
      const last = products[products.length - 1];

      nextCursor = Buffer.from(
        JSON.stringify({
          createdAt: last.createdAt,
          id: last.id,
        })
      ).toString("base64");
    }

    res.json({
      count: products.length,
      nextCursor,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getProducts,
};