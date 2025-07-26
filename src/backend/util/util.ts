import Product from "../models/product"; // adjust the path if needed

export async function deleteProductById(id: string) {
  try {
    const deleted = await Product.findByIdAndDelete(id);
    return deleted;
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
}
