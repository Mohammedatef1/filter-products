import { Index } from "@upstash/vector";
import * as dotenv from "dotenv";

dotenv.config();

export type Product = {
  name: string;
  color: "white" | "biege" | "green" | "blue" | "purple";
  size: "S" | "M" | "L";
  imageId: string;
  price: number;
};

export const db = new Index<Product>();
