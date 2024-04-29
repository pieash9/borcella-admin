"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navLinks } from "@/lib/constants";

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 max-sm:px-4 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex items-center gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 items-center">
        <Menu
          onClick={() => setDropdownMenu(!dropdownMenu)}
          className="cursor-pointer md:hidden"
        />
        {dropdownMenu && (
          <div className="absolute top-12 right-6 flex flex-col gap-6 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className={`flex items-center gap-4 text-body-medium ${
                  pathname === link.url ? "text-blue-1" : "text-grey-1"
                }`}
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
