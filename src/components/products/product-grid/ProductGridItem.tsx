'use client'

import { Product } from '@/interfaces';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }:Props) => {

    const [ displayImage, setDisplayImage ] = useState( product.images[0] )

    return (
    <div className="rounded-md overflow-hidden fade-in">
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Construir</Link>
        <Link href={ `/product/${ product.slug }` }>
            <Image 
                src={`/products/${ displayImage }`}
                alt={product.title}
                className="w-full object-cover rounded"
                width={ 500 }
                height={ 500 }
            />
        </Link>

    </div>

   
  )
}
