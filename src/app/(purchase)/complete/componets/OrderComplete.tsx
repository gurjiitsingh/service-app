import CartContext from "@/store/CartContext";
import { createNewOrderFile } from "@/app/action/newOrderFile/newfile";
import { useContext, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
//import OrderList from './OrderList'
export default function OrderComplete() {
  const searchParams = useSearchParams();
  const PaymentType = searchParams.get("paymentypte");
  const router = useRouter();
  // const { data: session } = useSession();

  const { cartData, endTotalG, totalDiscountG, productTotalCost, emptyCart } =
    useContext(CartContext);
  useEffect(() => {
    createOrder();
  }, []);

  async function createOrder() {
    let address;
    if (typeof window !== "undefined") {
      address = localStorage.getItem("customer_address");
    }
    if (cartData.length) {
      const result = await createNewOrderFile(
        cartData,
        address,
        endTotalG,
        productTotalCost,
        totalDiscountG,
        PaymentType
      );

      if (result === "success") {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("cart_product_data");

          emptyCart();
        }
      }
    }
  }

  return (
    <div className="container bg-slate-100 mp flex rounded-2xl my-9 flex-col w-[90%] lg:w-[50%] mx-auto">
      <div className="flex flex-col  gap-6 items-center">
        <div className="text-2xl font-semibold text-center ">
          Ihre Bestellung ist abgeschlossen
        </div>
        <div>
          <button
            onClick={() => {
              router.push("/");
            }}
            className="min-w-[200px] mt-5 py-1 text-center bg-blue-500 rounded-2xl text-white text-[1rem]"
          >
            Mehr einkaufen
          </button>
        </div>
        {/* <div className="">

         { purchase_order.map((item) => <OrderList key={item.id} item={item} />) }
         </div> */}
      </div>
    </div>
  );
}
