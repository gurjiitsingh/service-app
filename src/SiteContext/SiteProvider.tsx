"use client";
import { boolean, number, string } from "zod";
import SiteContext from "./SiteContext";
import { useEffect, useState } from "react";
import { deliveryType } from "@/lib/types/deliveryType";
import { couponDiscType } from "@/lib/types/couponDiscType";

interface Props {
  children: React.ReactNode;
}

export const SiteProvider: React.FC<Props> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  //     const setCouponDiscType ={
  //         couponDesc:{},
  // isFeatured:boolean,
  // minSpend:number,
  // name:string,
  // price:string,
  // productCat:string,
  // deliveryDis:{},
  // setdeliveryDis:(e)=>{return e}

  //  }

  const [open, setIsOpen] = useState<boolean>(false);
  const [openBargerMenu, setOpenBargerMenu] = useState<boolean>(false);
  const [openEmailForm, setEmailFormToggle] = useState<boolean>(false);
  const [customerEmail, setCustomerEmailL] = useState<string>("");
  const [deliveryType, setDeliveryType] = useState<string>("pickup");
  const [couponDisc, setCouponDiscU] = useState<couponDiscType | undefined>();
  const [deliveryDis, setdeliveryDisU] = useState<deliveryType | undefined>();
  const [showProductDetailM, setShowProductDetailML] = useState<boolean>(false);
  const [baseProductId, setBaseProductIdL] = useState<string>("");
  const [adminSideBarToggle, setAdminSideBarToggleL] = useState<boolean>(false);
  const [productCategoryIdG, setProductCategoryIdL] = useState<string>("");

  useEffect(() => {
    const deliveryType = window.localStorage.getItem("delivery_type") as string;
    if (deliveryType !== undefined) {
      const deliveryTypeS = JSON.parse(deliveryType) as string;
      setDeliveryType(deliveryTypeS);
    }
  }, []);

  function togleMenu() {
    setIsOpen(!open);
  }
  function bargerMenuToggle() {
    setOpenBargerMenu(!openBargerMenu);
  }
  function chageDeliveryType(t: string) {
    window.localStorage.setItem("delivery_type", JSON.stringify(t));
    setDeliveryType(t);
  }

  function setCouponDisc(e: couponDiscType | undefined) {
    setCouponDiscU(e);
  }
  function setdeliveryDis(e: deliveryType | undefined) {
    setdeliveryDisU(e);
  }
  // deliveryDis:{},
  // setdeliveryDis:(e)=>{}

  // openEmailForm:false,
  function emailFormToggle(e: boolean) {
    setEmailFormToggle(e);
  }

  function setShowProductDetailM() {
    setShowProductDetailML(!showProductDetailM);
    //showProductDetailM,
  }

  function setBaseProductId(e: string) {
    setBaseProductIdL(e);
  }

  function setCustomerEmailG(e: string) {
    setCustomerEmailL(e);
  }

  function setAdminSideBarToggleG(e:boolean) {
    setAdminSideBarToggleL(e);
  }

  function setProductCategoryIdG(id:string) {
    setProductCategoryIdL(id);
  }

  return (
    <SiteContext.Provider
      value={{
        open,
        openBargerMenu,
        sideBarToggle: togleMenu,
        bargerMenuToggle,
        openEmailForm,
        emailFormToggle,
        deliveryType,
        chageDeliveryType,
        couponDisc,
        setCouponDisc,
        deliveryDis,
        setdeliveryDis,
        showProductDetailM,
        setShowProductDetailM,
        baseProductId,
        setBaseProductId,
        adminSideBarToggle,
        setAdminSideBarToggleG,
        setCustomerEmailG,
        customerEmail,
        setProductCategoryIdG,
        productCategoryIdG,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
