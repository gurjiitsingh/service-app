import type { Metadata } from "next";
import "../globals.css";

import { CartProvider } from "@/store/CartProvider";
import { SiteProvider } from "@/SiteContext/SiteProvider";
import Header from "@/components/Header";

import { SideCart } from "@/components/MiniCart/SideCart";
import { BargerMenu } from "@/components/Bargermenu/Menu";
import Footer from "@/components/Footer";

import Cart from "@/components/CartBottom/CartBottom";
import Modal from "./Components/Modal";
import SideBarPublic from "@/components/SideBarPublic";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <SiteProvider>
          <CartProvider>
            <BargerMenu />
           
            <Modal />
            <SideCart />
            <Header />
            <div className="container px-2 mx-auto">
            <div className="flex justify-center pt-10">
              <div className="hidden lg:block lg:w-[350px]  mr-3">
                <SideBarPublic />
              </div>
              <div className="w-full">{children}</div>
            </div>

            <Footer />
            <div className="sticky  bottom-4 flex justify-end pr-3 z-50">
              {/* <Cart /> */}
            </div>
            </div>
          </CartProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
