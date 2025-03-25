"use client";

import { couponDiscType } from "@/lib/types/couponDiscType";
import { deliveryType } from "@/lib/types/deliveryType";
import { createContext, useContext } from "react";

type SiteContextType = {
  open: boolean;
  deliveryType: string;
  sideBarToggle: (e: boolean) => void;
  openBargerMenu: boolean;
  bargerMenuToggle: (e: boolean) => void;
  openEmailForm: boolean;
  emailFormToggle: (e: boolean) => void;
  chageDeliveryType: (e: string) => void;
  couponDisc: couponDiscType | undefined;
  setCouponDisc: (e: couponDiscType) => void;
  deliveryDis: deliveryType | undefined;
  setdeliveryDis: (e: deliveryType) => void;
  showProductDetailM: boolean;
  setShowProductDetailM: (e: boolean) => void;
  baseProductId: string ;
  setBaseProductId: (e: string) => void;
  adminSideBarToggle:boolean;
  setAdminSideBarToggleG:(e:boolean) => void;
  setCustomerEmailG:(e:string) => void;
  customerEmail:string;
  productCategoryIdG:string,
     setProductCategoryIdG:(e:string)=> void,
};

const SiteContext = createContext<SiteContextType>({
  open: false,
  deliveryType: "pickup",
  sideBarToggle: () => {},
  openBargerMenu: false,
  bargerMenuToggle: () => {},
  openEmailForm: false,
  emailFormToggle: (e) => {return e;},
  chageDeliveryType: (e) => {
    return e;
  },
  couponDisc: {
    couponDesc: "",
    isFeatured: false,
    minSpend: "",
    name: "",
    price: "",
    productCat: "",
  },

  setCouponDisc: (e) => {
    return e;
  },
  deliveryDis: {
    id: "",
    name: "",
    price: "",
    minSpend: "",
    deliveryDesc: "",
    productCat: "",
    //image: string;
    deliveryDistance: "",
  },
  setdeliveryDis: (e) => {
    return e;
  },
  showProductDetailM: false,
  setShowProductDetailM: (e) => {
    return e;
  },
  baseProductId: "",
  setBaseProductId: (e) => {
    return e;
  },
  adminSideBarToggle:false,
     setAdminSideBarToggleG:(e)=> {return e},
     setCustomerEmailG:(e)=>{return e;},
     customerEmail:"",

     productCategoryIdG:"",
     setProductCategoryIdG:(e)=>{return e;},
     



});

export const UseSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

export default SiteContext;
