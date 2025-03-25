"use client";
import { fetchProductByCategoryId } from "@/app/action/productsbase/dbOperation";
import React, { useEffect, useState } from "react";
import {  ProductType } from "@/lib/types/productType";
import { useSearchParams } from "next/navigation";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import PageProductDetailComponent from "./Components/PageProductDetailComponent";
import Hero from "./Components/Hero";
//import { auth } from "@/auth";
//import { useSession } from "next-auth/react"
//import AuthButton from "../AuthButton.client";
//import { TnewProductSchema } from '@/lib/types';
// import {  TnewProductSchema } from '@/lib/type/productType';

export default function PageComponent() {
const useSearch = useSearchParams();
let id = useSearch.get("id") as string;


const {  sideBarToggle } = UseSiteContext();
  const [products, setProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    sideBarToggle(false)
   // console.log("id-----",id)
if(id ===undefined || id === null){
  id='3zjaNnwUILmHFFeP4gk2';
}
//console.log("id-----",id)
    async function fetchproductData() {
     
      const productData = await fetchProductByCategoryId(id);
      console.log("service list",productData);

     setProduct(productData);
    }
    fetchproductData();
  }, [id]);
  
 // const { data: session } = useSession()
  return (
    <div className="overflow-hidden min-h-screen">
      <div className="container mx-auto ">
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-3">
          {/* <AuthButton /> */}
          <Hero />
          {products.map((product, i) => {
            return <PageProductDetailComponent key={i} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
