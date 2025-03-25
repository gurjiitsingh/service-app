import { UseSiteContext } from '@/SiteContext/SiteContext';
import React from 'react'

export default function Pickup({total}:{total:number}) {
  const {   deliveryType } = UseSiteContext();
  const pickupDiscount = (+total * 0.1).toFixed(2);
 
  return (
    <>{deliveryType === "pickup" &&
       
                <div className="font-semibold border-b border-slate-200 py-3 w-full flex justify-between">
                  <button className="text-sm font-semibold py-3 w-full text-left">
                  Abholrabatt 10%
                  </button>
                  <div className="flex gap-1">
                    - <span>&#8364;</span> <span> 
                        {pickupDiscount}
                        </span>
                  </div>
                </div>}
             
    
    </>
  )
}
