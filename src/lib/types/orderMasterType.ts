export type orderMasterDataT = {
    id:string;
      customerName: string;
      userId: string;
      addressId: string;
      time: string;
      total:number;
      totalDiscountG:number;
      status:string;
      srno:number;
      timeId:string;
  }


  export type TOrderMaster = {
    id:string;
    addressId:string;
    customerName:string;
    time:string;
    userId:string;
    status:string;
    srno:number;
   }