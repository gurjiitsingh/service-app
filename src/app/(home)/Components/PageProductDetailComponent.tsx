"use client";
import { fetchProductByBaseProductId } from "@/app/action/productsaddon/dbOperation";
import { AddOnProductSchemaType } from "@/lib/types/productAddOnType";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import React, { useEffect, useState } from "react";
import AddOn from "./AddOn";
import CartButton from "@/components/AddToCart/CartButton";
import { cartProductType } from "@/lib/types/cartDataType";
import { ProductType } from "@/lib/types/productType";

export default function PageProductDetailComponent({
  product,
}: {
  product: ProductType;
}) {
  const [addOnData, setAddOnData] = useState<AddOnProductSchemaType[]>([]);
const { productCategoryIdG } = UseSiteContext();
  useEffect(() => {
    if (product.flavors) {
      async function fetchProduct() {
        try {
          // const result = await fetchProducts();
          // console.log("---------", result)
          const result = await fetchProductByBaseProductId(product.id!);
       
          setAddOnData(result);
        } catch (error) {
          console.log(error);
        }
      }
      fetchProduct();
    }
  }, []);

  // console.log("this is price ---------", addOnData)
  const price = product.price.toString().replace(/\./g, ",");
  //bg-[#D3E671]
  

 
  const cartProduct:cartProductType ={
    id:product.id,
    quantity:1,
    price:product.price,
    name:product.name,
    image:product.image,
  } 
  return (
    <div
      className="w-full   bg-zinc-50 shadow-lg flex flex-row   rounded-2xl items-center"
     
    >
    
        <div className="rounded-full flex items-center justify-center w-[70px] h-[65px]  md:w-[90px]  md:h-[80px]  overflow-hidden">
          <img
            src={product.image}
            className="h-[65px]  md:h-[85px]"
          />
        </div>
   
      <div className="w-full flex flex-col p-3 justify-between ">
        <div className="w-full flex-col gap-4 justify-between ">
          <div className="w-full flex gap-2 mb-2 justify-between ">
            <div className="flex items-center justify-center text-nowrap text-center px-2 py-1 bg-[#64870d] w-fit  rounded-3xl  text-white">
           {productCategoryIdG!=="" && <>{product.sortOrder}.&nbsp;</>}   
              
              
              {product.name}
            </div>
            <div className="text-sm">
              <div className="max-w-[240px] max-h-[22px] overflow-hidden">
                {product.productDesc}
              </div>
            </div>
          </div>

          {!product.flavors && (
            <div className="flex text-slate-500 items-center bg-amber-300 justify-between pt-1 pl-2 pr-1  rounded-3xl">
              <div>Pack</div> <div>&euro;{price}</div>
              <div>
              <CartButton cartProduct={cartProduct} />
                {/* <button
                  className="px-1 py-1 bg-slate-400 shadow-emerald-400 shadow-2xl  rounded-full w-fit"
                  onClick={() => {
                    setShowProductDetailM(false);
                  }}
                >
                  <IoMdAdd size={20} className="text-white " />
                </button> */}
              </div>
            </div>
          )}
        </div>

        {product.flavors && <AddOn addOnData={addOnData} />}
      </div>
    </div>
  );
}

//bg-[#FF8989]
//bg-amber-400
