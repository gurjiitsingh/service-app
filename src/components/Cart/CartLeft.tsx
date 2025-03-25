//import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "@/store/CartContext";

import { ProductType } from "@/lib/types/productType";
import { useSearchParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { cartProductType } from "@/lib/types/cartDataType";
//import { FaCheckCircle } from 'react-icons/fa';

export default function CartLeft() {

  const searchParams = useSearchParams();
  const deliveryType = searchParams.get("deliverytype");
const [addCoupon, setAddCoupon] = useState<boolean>(false);
  console.log("del type------", searchParams.get("deliverytype"))
  //const { cartData } =  useCartContext();
  const { cartData } = useContext(CartContext);
  //console.log("kljjljlkll", cartData.lenght)
  let total = 0;
  cartData.forEach((item: cartProductType) => { 
    total += item.quantity! * + item.price;
    // total += parseInt(item.quantity) * +parseFloat(item.price);
  });

  useEffect(()=>{
    
  },[deliveryType])
  console.log("total---------",total)
  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-col bg-white p-5 h-full w-full gap-7 rounded-2xl">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl font-semibold border-b py-3 w-full uppercase">
            Shopping cart total
          </h2>

          <div className="font-semibold border-b py-3 w-full flex flex-col justify-between gap-4">
            <div className="w-fit">
            <button onClick={()=>setAddCoupon(!addCoupon)} className="flex gap-2 items-center text-sm text-slate-600 bg-green-200 rounded-2xl px-3 font-semibold py-1 w-full text-left ">
             
             <span>Add a coupon </span><span><FaChevronDown /></span> 
            </button>
            </div>

{addCoupon &&<><div className="w-full border rounded-xl py-2 px-2 shadow-md"> 
 <div className="text-sm text-slate-500">Fill coupon and click button</div>
  <div className="flex gap-2">
  <input type="text" name="coupon" className="input-style"></input>

  <button
              className="w-[200px] py-1 text-center bg-red-200 text-white font-semibold rounded-2xl text-[1rem]"
             onClick={()=>{}}
            
              name="button_1"
            >
              Get discount
            </button>
            </div>
  </div></>}
    
           
          </div>
       {deliveryType === "pickup" &&   <div className="font-semibold border-b py-3 w-full flex justify-between">
            <button className="text-sm font-semibold py-3 w-full text-left">
              {" "}
              Pickup Discunt 
            </button>
            <div className="flex gap-1"><span>&#8364;</span> <span>{ (+total*0.1)}</span></div>
          </div>}

          <div className="font-semibold border-b py-3 w-full ">
            <h3 className="text-sm font-semibold py-3 w-full text-left">
              {" "}
              Subtotal
            </h3>
          </div>

          <div className="font-semibold border-b py-3 w-full ">
            <h3 className="text-sm font-semibold py-3 w-full text-left">
              {" "}
              Local Pickup (Restaurant)
            </h3>
          </div>

          <div className="border-b py-3 w-full ">
            <h3 className="text-sm font-semibold pt-3 pb-1 w-full text-left">
              {" "}
              Flat Rate
            </h3>
            <p className="text-sm  pb-3 w-full text-left"> $4</p>
          </div>

          <div className="flex border-b py-3 w-full items-center">
            <div className="text-xl font-semibold py-3 w-[50%] text-left">
              {" "}
              Total
            </div>
            <div className="text-sm  py-3 w-[50%] text-left"> $24</div>
          </div>
          {/* <FaCheckCircle className="text-red-500" size={40} />
              <span className="text-[.7rem] text-blue-500">
                Part of your order qualifies for FREE Delivery. Choose FREE
                Delivery option at checkout.
              </span> */}
        </div>
        <div className="text-[1.1rem]">
          <span className="text-xl">Subtotal ({cartData.length} items) </span>{" "}
          :${total}
        </div>
        {/* <div className="flex items-center justify-center">
          <Link
            href={{
              pathname: "/checkout",
              //  query:{ userId: session?.user?.id}
            }}
          >
            <div className="w-[200px] py-1 text-center bg-yellow-500 rounded-2xl text-[.8rem]">
              Procces to buy
            </div>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
