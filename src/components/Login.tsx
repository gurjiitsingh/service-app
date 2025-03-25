import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import LinkDropdown from "./LinkDropdown";
import { UseSiteContext } from "@/SiteContext/SiteContext";

export default function Login() {
  const { data: session } = useSession(); 
  const {  sideBarToggle } = UseSiteContext();
//console.log("sessiong to find type----------------",session)
  return (
    <>
      <div className="flex items-center gap-2 justify-between  ">
        <div className="flex flex-row gap-5 py-5 justify-end">
        <div className="lg:hidden px-2 py-1 bg-amber-500 rounded-2xl shadow text-white">
            <button onClick={()=>{sideBarToggle(true)}}>Servies</button>
          </div>
          {!session && <Link href="/auth/login">Login</Link>}
          {/* {session&& <button onClick={()=>{signOut()}}>Logout</button>  } */}
          {session && (
            <button
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          )}
          {/* {session&&  <Link href="/user">My Account</Link> } */}
          {!session && <Link href="/auth/register">Register</Link>}
          {session && <LinkDropdown session={session} />}
        </div>
      </div>
    </>
  );
}
