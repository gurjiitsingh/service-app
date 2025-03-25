import React from 'react'
import {
    PayPalButtons,
   
    usePayPalScriptReducer,
  } from "@paypal/react-paypal-js";
  
  import { useRouter } from "next/navigation";
  import { useCartContext } from "@/store/CartContext";

export default function Checkout(){
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    //const [currency, setCurrency] = useState(options.currency);
    const router = useRouter();
    const {  productTotalCost, endTotalG } = useCartContext();
   const endTotalG1 = endTotalG.toFixed(2)
  //  console.log("amount--------------",productTotalCost,typeof(productTotalCost), endTotalG1,typeof(endTotalG1),endTotalG,typeof(endTotalG))
  
    // const onCurrencyChange = ({ target: { value } }) => {
    //   setCurrency(value);
    //   dispatch({
    //     type: "resetOptions",
    //     value: {
    //       ...options,
    //       currency: value,
    //     },
    //   });
    // };
   // console.log("productTotalCost----------",productTotalCost,typeof(productTotalCost),"endTotalG----------",endTotalG,typeof(endTotalG))
  
    //var products =  JSON.parse(window.localStorage.getItem("cart_product_data"));
    // type customerAddressType =	{
		// 	firstNamestring: string;
    //         lastName: string;
		// 	address_line_1: string;
    //         address_line_2: string;
    //         admin_area_2: string;
    //         admin_area_1: string;
    //         postal_code: string;
    //         country_code: string;
		// 	}
    let customerAddress;
    if (typeof window !== 'undefined') {
     customerAddress = JSON.parse(localStorage.getItem("customer_address") || '""')  ;
    }
  //console.log("cartData ", productTotalCost)
      const onCreateOrder = (data, actions) => {
      return actions.order.create({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              value: endTotalG,
            },
          },
        ], 
        items: [
          {
            "name": "All products", /* Shows within upper-right dropdown during payment approval */
            "description": "Total amount", /* Item details will also be in the completed paypal.com transaction view */
            "unit_amount": {
              "currency_code": "EUR",
              "value": endTotalG,
            },
            "quantity": 2
          },
        ],
        payer: {
          name: {
            given_name: customerAddress.firstName,
            surname: customerAddress.lastName,
          },
          address:
           {
            address_line_1: customerAddress.addressLine1,
            address_line_2: customerAddress.addressLine2,
            admin_area_2: customerAddress.city,
            admin_area_1: customerAddress.state,
            postal_code: customerAddress.zipCode,
            country_code: "DE",
          },
          email_address: customerAddress.email,
          phone: {
            phone_type: "MOBILE",
            phone_number: {
              national_number: customerAddress.mobNo,
            },
          },
        },
      });
    };
  
    const onApproveOrder = (data, actions) => {
      return actions.order.capture().then((details) => {
        const name = details.payer.name.given_name;
       // alert(`Transaction completed by ${name}`);
       router.push(`/complete?paymentypte=paypal`)
      // router.push(`/checkout?email=${data.email}&deliverytype=${deliveryType}`)
      //  router.push({
      //   pathname: "/complete",
      //   query: { data: details.payer },
      // })
      });
    };
  
    return (<div className="flex container mx-auto px-[30%] items-center justify-center my-[20%] ">
      <div className="checkout">
        {isPending  ? (
          <p>LOADING...</p>
        ) : (
          <>
            <PayPalButtons
              message={{
                amount: endTotalG,
                align: "center",
                color: "black",
                position: "top",
              }}
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => onCreateOrder(data, actions)}
              onApprove={(data, actions) => onApproveOrder(data, actions)}
            />
          </>
        )}
      </div></div>
    );
  };
