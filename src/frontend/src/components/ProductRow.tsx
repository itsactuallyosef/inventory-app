import type { Product } from '../types/ProductType';

type Props = {
  product: Product;
  quantity: number;
  onChange: (id: string, value: string) => void;
};

function ProductRow({ product, quantity, onChange }: Props) {
  // Visually flag products with low stock
  const stockColor = product.quantity <= 3 ? 'text-red-600 font-semibold' : 'text-gray-500';

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {product.name}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${stockColor}`}>
        {product.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${product.price.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          min="0"
          max={product.quantity} // Prevent selling more than is in stock
          value={quantity}
          onChange={(e) => onChange(product._id, e.target.value)}
          className="w-24 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </td>
    </tr>
  );
}

export default ProductRow;