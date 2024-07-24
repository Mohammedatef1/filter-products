import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allowed" });
  }

  try {
    const products = await db.query({
      topK: 12,
      vector: [0, 0, 0],
      includeData: true,
    });

    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Interval server error." });
  }
}
