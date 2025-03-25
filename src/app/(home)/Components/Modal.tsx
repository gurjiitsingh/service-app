"use client"
import { UseSiteContext } from '@/SiteContext/SiteContext';
import React from 'react'
import ChooseProduct from "@/components/ChooseProduct/page";
export default function Modal() {
     const { showProductDetailM } =
        UseSiteContext();
  return (
    <>
   {showProductDetailM && <ChooseProduct />}
    </>
  )
}
