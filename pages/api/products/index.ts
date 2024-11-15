import { db } from "@/db";
import { ProductFilterValidator } from "@/lib/validators/ProductValidator";
import { NextApiRequest, NextApiResponse } from "next";

class Filter {
  private filters: Map<string, string[]> = new Map();

  hasFilters() {
    return this.filters.size > 0;
  }

  add(key: string, operator: string, value: string | number) {
    const filter = this.filters.get(key) || [];
    filter.push(`${key} ${operator} ${typeof value === "number" ? value : `"${value}"`}`);
    this.filters.set(key, filter);
  }

  addRow(key: string, row: string) {
    this.filters.set(key, [row]);
  }

  get() {
    const parts: string[] = [];
    this.filters.forEach((filter) => {
      const groupedValues = filter.join(" OR ");
      parts.push(`(${groupedValues})`);
    });
    return parts.join(" AND ");
  }
}

const AVG_PRODUCT_PRICE = 25
const MAX_PRODUCT_PRICE = 50

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allowed" });
  }

  try {
    const { filter: data } = req.body;
    const { color, size, price, sort } = ProductFilterValidator.parse(data);
    const filter = new Filter();

    color.length === 0 ? filter.addRow("color", `color = ""`) : color.forEach((color: string | number) => filter.add("color", "=", color));
    size.length === 0 ? filter.addRow("size", `size = ""`) : size.forEach((size: string | number) => filter.add("size", "=", size));
    filter.addRow("price", `price >= ${price[0]} AND price <= ${price[1]}`);

    const products = await db.query({
      topK: 40,
      vector: [
        0,
        0,
        sort === 'none'
          ? AVG_PRODUCT_PRICE
          : sort === 'price-asc'
          ? 0
          : MAX_PRODUCT_PRICE,
      ],
      includeMetadata: true,
      filter: filter.hasFilters() ? filter.get() : undefined,
    });

    return res.status(200).json(products);
  } catch (e) {
    return res.status(500).json({ message: "Interval server error." });
  }
}
