'use client'

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) =>{
  const [stock, setStock] = useState(0);
  const [isLoding, setIsLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getStock = async() =>{
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  }

  useEffect(() =>{
    getStock();
  }, [getStock]);

  return (
    <>
      { isLoding ? (
         <h1 className={ ` ${ titleFont.className } antialiased font-bold text-lg bg-gray-200 animate-pulse` }>
         &nbsp;
         </h1>
      ) : (
        <h1 className={ ` ${ titleFont.className } antialiased font-bold text-lg` }>
        Stock: { stock }
      </h1>
      )
    }
     
     
    </>
    
    )
}
