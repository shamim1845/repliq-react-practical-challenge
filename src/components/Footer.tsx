import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo.svg";
import { MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container flex flex-col items-start  sm:flex-row sm:flex-wrap sm:justify-between gap-14  py-16">
        <div className="flex flex-col gap-10">
          <Image src={Logo} alt="logo" />
          <div className="flex items-center gap-5 border p-5 rounded-md">
            <MapPin />
            <p className="text-sm font-bold">Mirpur-1, Dhaka, Bangladesh</p>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-500">
              <span>Moday-Friday :</span>
              <span>9:00 am - 8:00 pm</span>
            </div>
            <div className="text-sm text-gray-500">
              <span>Saturday :</span>
              <span>11:00 am- 5:00 pm</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h4 className="font-semibold">Customer</h4>
          <div className="space-y-2 flex flex-col">
            <Link href="/account" className="text-sm text-gray-500">
              My account
            </Link>
            <Link href="/orders" className="text-sm text-gray-500">
              My orders
            </Link>
            <Link href="#" className="text-sm text-gray-500">
              Return
            </Link>
            <Link href="#" className="text-sm text-gray-500">
              Compare{" "}
            </Link>
            <Link href="#" className="text-sm text-gray-500">
              Wishlist
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h4 className="font-semibold">Information</h4>
          <div className="space-y-2 flex flex-col">
            <Link href="/#" className="text-sm text-gray-500">
              About us
            </Link>
            <Link href="#" className="text-sm text-gray-500">
              Contact us
            </Link>
            <Link href="#" className="text-sm text-gray-500">
              Store list
            </Link>
            <Link href="#" className="text-sm text-gray-500">
              Shipping & return
            </Link>
            <Link href="#" className="text-sm text-gray-500">
              FAQ
            </Link>
          </div>
        </div>
      </div>
      <hr />
      {/* copywrite */}
      <div className="container py-5 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} GOFARM. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
