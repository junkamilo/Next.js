"use client"

import { useAppDispatch, useAppSelector } from "@/src/store";
import { addOne, initCounterState, substracOne } from "@/src/store/counter/counterSlice";
import { useEffect, useState } from "react";

interface Props{
  value?:number
}

export const CardCounter = ({value = 0}:Props) => {
  const count = useAppSelector(state => state.counterReducer.count);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(initCounterState(value))
  },[dispatch,value]);

  return (
    <div className="flex flex-col">
      <span className="text-9xl">{count}</span>
      <button
        onClick={() => dispatch(addOne())}
        className="flex items-center justify-center p-2 rounded-2xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">+1</button>
      <button
        onClick={() => dispatch(substracOne())}
        // onClick={RestarCount}
        className="flex items-center justify-center p-2 rounded-2xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">-1</button>
    </div>
  )
}
