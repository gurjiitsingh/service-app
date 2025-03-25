import { UseSiteContext } from '@/SiteContext/SiteContext';
import React from 'react'

export default function CouponDisc({total}:{total:number}) {
     const { couponDisc } = UseSiteContext();
  return (
    <>
      {couponDisc?.price &&
    <div className="font-semibold border-b py-3 w-full flex justify-between">
              <div className="text-sm font-semibold py-3 w-full text-left">
                Coupon Discunt {couponDisc?.price}%
              </div>
              <div className="flex gap-1">
                - <span>&#8364;</span>{" "}
                <span>{((+total * +couponDisc?.price) / 100).toFixed(2).replace(/\./g, ',') }</span>
              </div>
            </div>}
    </>
  )
}

