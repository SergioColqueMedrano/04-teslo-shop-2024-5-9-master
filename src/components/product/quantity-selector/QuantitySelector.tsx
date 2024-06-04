'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    id: string;
    quantity: number;
    color: string;
    onQuantityChanged: (id: string, value: number) => void;
    onColorChanged: (id: string, color: string) => void;
}

const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

export const QuantitySelector = ({ id, quantity, color, onQuantityChanged, onColorChanged }: Props) => {

    const onValueChanged = (value: number) => {
        if (quantity + value < 1) return;
        onQuantityChanged(id, quantity + value);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex mb-2">
                <button onClick={() => onValueChanged(-1)}>
                    <IoRemoveCircleOutline size={30} />
                </button>
                <span
                    className="w-20 mx-3 px-5 text-center rounded"
                    style={{ backgroundColor: color }}
                >
                    {quantity}
                </span>
                <button onClick={() => onValueChanged(1)}>
                    <IoAddCircleOutline size={30} />
                </button>
            </div>
            <select
                value={color}
                onChange={(e) => onColorChanged(id, e.target.value)}
                className="mt-2 p-1 border rounded"
            >
                {colors.map((color) => (
                    <option key={color} value={color}>
                        {color}
                    </option>
                ))}
            </select>
        </div>
    )
}
