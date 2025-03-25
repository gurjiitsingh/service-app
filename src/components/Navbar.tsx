import Link from "next/link";
import React from "react";

const menuList = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
 
 
];

function Navbar() {
  return (
    <nav >
      <ul className="hidden lg:w-full lg:flex lg:gap-3 lg:items-center">
        {menuList?.map((item) => {
          return (
            <li className="fit " key={item.name}>
              <Link href={item.link}>{item.name} </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
