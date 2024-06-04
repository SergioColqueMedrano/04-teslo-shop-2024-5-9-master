'use client'

import { useState } from "react";
import { QuantitySelector } from './QuantitySelector';

interface Counter {
    id: string;
    quantity: number;
    color: string;
}

const QuantitySelectorPadre = () => {
    const [counters, setCounters] = useState<Counter[]>([]);

    const addCounter = (color: string) => {
        setCounters([...counters, { id: crypto.randomUUID(), quantity: 1, color }]);
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        setCounters(counters.map(counter => 
            counter.id === id ? { ...counter, quantity: newQuantity } : counter
        ));
    };

    const updateColor = (id: string, newColor: string) => {
        setCounters(counters.map(counter => 
            counter.id === id ? { ...counter, color: newColor } : counter
        ));
    };

    return (
        <div className="flex flex-col items-center">
            <button onClick={() => addCounter('gray')} className="mb-4 p-2 bg-blue-500 text-white rounded">
                Add Counter
            </button>
            {counters.map(counter => (
                <QuantitySelector
                    key={counter.id}
                    id={counter.id}
                    quantity={counter.quantity}
                    color={counter.color}
                    onQuantityChanged={updateQuantity}
                    onColorChanged={updateColor}
                />
            ))}
        </div>
    )
};

export default QuantitySelectorPadre;
