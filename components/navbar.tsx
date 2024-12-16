import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"
        >
          KYAgent
        </Link>
        <div className="space-x-4">
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/register"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Register
          </Link>
          <Link
            href="/verify"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Verify
          </Link>
          <Link
            href="/docs"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Docs
          </Link>
          <Button
            variant="outline"
            className="ml-4 text-blue-600 border-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-300"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
}
