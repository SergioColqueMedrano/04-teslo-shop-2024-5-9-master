'use client';

import { useState } from "react";
import Image from 'next/image';
import { Product } from '@/interfaces';

interface Props {
  products: Product[];
}

export const ImageSelectionBoard = ({ products }: Props) => {
  // Inicializar el tablero con una matriz de 4x5
  const initialBoard = Array(4).fill(null).map(() => Array(5).fill(''));
  const [selectedImages, setSelectedImages] = useState<string[][]>(initialBoard);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const currentImage = selectedImages[rowIndex][colIndex];
    const product = products[currentProductIndex];
    const currentIndex = product.images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % product.images.length;
    const newImage = product.images[nextIndex];

    const newSelectedImages = selectedImages.map((row, rIdx) =>
      row.map((img, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? newImage : img))
    );

    setSelectedImages(newSelectedImages);

    // Incrementar currentProductIndex
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  return (
    <div className="flex justify-center items-center p-5">
      <div className="grid grid-cols-5 grid-rows-4 gap-2">
        {selectedImages.map((row, rowIndex) =>
          row.map((image, colIndex) => (
            <div
              key={`${rowIndex}_${colIndex}`}
              className={`w-24 h-24 flex justify-center items-center cursor-pointer transition-all
                ${(rowIndex + colIndex) % 2 === 0 ? 'bg-green-400' : 'bg-green-400'}
                hover:bg-gray-300`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {image && (
                <Image
                  src={`/products/${image}`}
                  alt={`Selected image ${rowIndex}-${colIndex}`}
                  className="object-cover rounded"
                  width={100}
                  height={100}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
