import { Product } from "@/models/products"

export const totalPrice = (products: Product[]): number => {
    let sum = 0
    products.forEach(product => sum += product.price)
    return sum
}