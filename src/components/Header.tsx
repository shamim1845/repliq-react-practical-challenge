import Link from "next/link";
import SideMenu from "./SideMenu";
import Cart from "./Cart";
import BottomNavigationMenu from "./BottomNavigationMenu";
import SearchBox from "./SearchBox";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import { User } from "lucide-react";

const Header = () => {
  return (
    <div className="container py-5 space-y-5">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <SearchBox className="max-w-[400px] hidden md:block" />
        </div>
        <div className="flex items-center gap-5">
          {/* Auth */}
          <Link href="/auth" title="Login/Register">
            <User />
          </Link>
          {/* Shopping cart */}
          <Cart />

          <SideMenu />
        </div>
      </div>
      <BottomNavigationMenu />
    </div>
  );
};

export default Header;

const menuList = [
  {
    id: 1,
    title: "Products",
    link: "/products",
  },
  {
    id: 2,
    title: "Login",
    link: "/auth",
  },
];

const NavLinks = () => {
  return (
    <div className="flex gap-10">
      {menuList.map((menu) => (
        <Link
          key={menu.id}
          href={menu.link}
          className="hover:text-green-600 transition-all"
        >
          {menu.title}
        </Link>
      ))}
    </div>
  );
};
