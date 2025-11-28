"use client"

import { useState } from "react";

export const CardCounter = () => {
    const [first, setfirst] = useState(1);

  const sumarCount = () => {
    setfirst(first + 1);
  }

  const RestarCount = () => {
    setfirst(first - 1);
  }
    return (
        <div className="flex flex-col">
            <span className="text-9xl">{first}</span>
            <button
                onClick={sumarCount}
                className="flex items-center justify-center p-2 rounded-2xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">+1</button>
            <button
                onClick={RestarCount}
                className="flex items-center justify-center p-2 rounded-2xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">-1</button>
        </div>
    )
}
