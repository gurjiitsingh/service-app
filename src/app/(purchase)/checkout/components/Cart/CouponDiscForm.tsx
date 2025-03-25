import { fetchcouponByCode } from "@/app/action/coupon/dbOperation";
import { couponCodeSchema, TcouponCodeSchema } from "@/lib/types/couponDiscType";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CouponDiscount() {

  const { setCouponDisc } = UseSiteContext();

  

    const {
      register,
      formState: { errors },
      //setValue,
      // control,
      // watch,
      handleSubmit,
      // setError,
      formState: {}, //dirtyFields
    } = useForm<TcouponCodeSchema>({
      resolver: zodResolver(couponCodeSchema),
    });

   async function onSubmit(data: TcouponCodeSchema) {
    const couponCode = (data.coupon).toUpperCase()
   
  
     const result = await fetchcouponByCode(couponCode);

    // console.log("00000000000", result[0])
     setCouponDisc(result[0])
    //  if (!result?.errors) {
    //    // router.push('/admin/coupons')
 
    //  } else {
    //    alert("Some thing went wrong");
    //  }
     type Terror = {
      coupon: string ;
     }
 
    //  if (result.errors) {
    //    // not network error but data validation error
    //    const errors: Terror = result.errors;
 
    //    if (errors.coupon) {
    //      setError("coupon", {
    //        type: "server",
    //        message: errors.coupon,
    //      });
    //    } 
    //  }
 
     console.log("response in create coupon form ", result);
   }

  return (
    <>
      <div className="w-full border rounded-xl py-2 px-2 shadow-md">
       
        <div className="flex gap-2">
          <form onSubmit={handleSubmit(onSubmit)}>
           
<div className="flex gap-2 items-end">
            <div className="flex flex-col gap-1">
              <label className="label-style text-[.5rem]">
              Gutschein ausfüllen und Button klicken*
              {/* Fill coupon and click button */}
              <span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("coupon")}  className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.coupon?.message && <span>{errors.coupon?.message}</span>}
              </span>
            </div>
<div className="">

            <button
              className="w-[200px] py-1 h-8 text-center bg-red-200 text-white font-semibold rounded-2xl text-[1rem]"
              onClick={() => {}}
              name="button_1"
            >
              Anwenden
              {/* Apply */}
            </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
