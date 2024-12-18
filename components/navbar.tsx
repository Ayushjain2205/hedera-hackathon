"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";
import { ConnectButton } from "thirdweb/react";
import { mantleSepolia } from "thirdweb/chains";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/register", label: "Register" },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/KYAgent.svg" alt="KYAgent Logo" width={32} height={32} />
          <span className="text-xl font-bold text-blue-600">KYAgent</span>
        </Link>
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ConnectButton client={client} chain={mantleSepolia} theme="light" />
        </div>
      </div>
    </nav>
  );
}
