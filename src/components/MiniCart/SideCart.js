"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";

import { BiHomeSmile, BiUser } from "react-icons/bi";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { FiSettings, FiShoppingCart } from "react-icons/fi";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import ProccedWithEmail from "./components/ProccedWithEmail";
import { SessionProvider } from "next-auth/react";
import { useCartContext } from "@/store/CartContext";
import { useRouter } from "next/navigation";
import SideBarPublic from "../Home/SideBarPublic";
//import Link from "next/link";
export const SideCart = () => {
  //const [ showEmailForm, setShowEmailForm ] = UseSiteContext();
  const { open, sideBarToggle } = UseSiteContext();
  const { openEmailForm, emailFormToggle, customerEmail } = UseSiteContext();
 
  const ref = useRef(null);
  const router = useRouter();
  useClickAway(ref, () => sideBarToggle(false));
  // const sideBarToggle = () => setOpen(prev => !prev)
  // function deliveryHandle(){
  //  /// setShowEmailForm((state)=>!state)
  //  emailFormToggle(false)
  //  chageDeliveryType("delivery")
  // }

  function pickUpHandle() {
    /// setShowEmailForm((state)=>!state)
    // chageDeliveryType("pickup")
    sideBarToggle(ture);
    emailFormToggle(true);
  }

  function shopMoreHandle() {
    // setShowEmailForm((state)=>!state)
    sideBarToggle(true);
    router.push("/");
    // chageDeliveryType("pickup")
    // emailFormToggle()
  }
  return (
    <>
      <SessionProvider>
        {!openEmailForm && (
          <AnimatePresence mode="wait" initial={false}>
            {open && (
              <>
                <motion.div
                  {...framerSidebarBackground}
                  aria-hidden="true"
                  className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(244,243,243,0.1)] backdrop-blur-sm "
                ></motion.div>
                <motion.div
                  {...framerSidebarPanel}
                  className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-lg border-r-2 border-zinc-50 bg-white p-2"
                  ref={ref}
                  aria-label="Sidebar"
                >
                  <div className="flex items-center px-2 pt-2 justify-between p-2  rounded-2xl  border ">
                    <span>Select a service category</span>
                    <button
                      onClick={()=>sideBarToggle(false)}
                      className="p-1 border-zinc-800 rounded-xl"
                      aria-label="close sidebar"
                    >
                      <IoClose size={30} />
                    </button>
                  </div>

                <SideBarPublic />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}
        {openEmailForm && <ProccedWithEmail />}
      </SessionProvider>
    </>
  );
};
//console.log("llllllllllllll", cartData)
const items = [
  { title: "Home", Icon: BiHomeSmile, href: "#" },
  { title: "About", Icon: BiUser },
  { title: "Contact", Icon: HiOutlineChatBubbleBottomCenterText, href: "#" },
  { title: "Settings", Icon: FiSettings, href: "#" },
  { title: "Shop", Icon: FiShoppingCart, href: "#" },
];

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
};
