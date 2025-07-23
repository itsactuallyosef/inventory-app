
async function getProducts() {
    const res = await fetch("/api/products");
    return await res.json()
}

export default { getProducts }