"use client";
import React from "react";

import {
 
  PayPalScriptProvider,
 
} from "@paypal/react-paypal-js";



import { loadScript } from "@paypal/paypal-js";
import Checkout from "./components/Checkout";

loadScript({
  "client-id": process.env.PAYPAL_CLIENT_ID,
    // "AW5e7drnAQ7XcIGUsTNi1B88EO_XyXPhMGzm32hUffetc9NWsDBjzua8cGJKVbLbR16XxdlGE0Wh4nUa",
})
  .then((paypal) => {
    // start to use the PayPal JS SDK script
  })
  .catch((err) => {
    console.error("failed to load the PayPal JS SDK script1", err);
  });



const initialOptions = {
  //"client-id": "AaE5j_iAGG8h6JeuW6y3khLvftR8OT2qDi2tqlhTaOeC4QxU3feFgMgF1RYMGe7LuYAtd7EyhQZpUhQz",//
  "client-id": process.env.PAYPAL_CLIENT_ID,
  
  currency: "EUR",
  intent: "capture",
};


function ProviderWrapper() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Checkout />
    </PayPalScriptProvider>
  );
}

export default ProviderWrapper;
