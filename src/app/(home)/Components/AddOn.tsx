import { AddOnProductSchemaType } from '@/lib/types/productAddOnType';
import React from 'react'
import { IoMdAdd } from "react-icons/io";

export default function AddOn({addOnData}:{addOnData:AddOnProductSchemaType[]}) {
   
  return (
    <div className='flex flex-col gap-3'> {addOnData.map((addon,i) => {
        return <div key={i}><div className="flex items-center bg-amber-300 justify-between p-1  rounded-3xl">
        <div>{addon.name}</div> <div>&euro;{addon.price}</div>
        <div>
          <button
            className="px-1 py-1 bg-slate-400 shadow-emerald-400 shadow-2xl  rounded-full w-fit"
           
          >
            <IoMdAdd size={20} className="text-white " />
          </button>
        </div>
      </div></div>
 })}</div>
  )
}




