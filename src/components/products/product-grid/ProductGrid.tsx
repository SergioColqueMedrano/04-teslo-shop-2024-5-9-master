

import { Product } from '@/interfaces'
import { ProductGridItem } from './ProductGridItem';

interface Props {
    products: Product[];
}

export const ProductGrid = ({ products }:Props) => {
  return (
    <div className="grid grid-cols-13 sm:grid-cols-5 gap-10 mb-5 bg-gray-700">
        {
            products.map(product => (
            <ProductGridItem
             key={ product.slug }
             product={ product }
             />
            ))
            
        }
    </div>
  )
}
