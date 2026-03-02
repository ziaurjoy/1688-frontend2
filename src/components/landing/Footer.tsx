import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-16 text-white w-full">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <span className="text-sm font-bold text-blue-600">WA</span>
              </div>
              <span className="text-xl font-bold">Prod Query</span>
            </div>
            <p className="text-sm text-blue-100">
              Fast, reliable Prod-Query API for domain data across 500+ TLDs.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  Prod-Query Search
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  Domain Lookup
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  Bulk Operations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-blue-400 pt-8 text-sm text-blue-100 md:flex-row">
          <p>&copy; 2026 Prod-Query API. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-white">
              Twitter
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              LinkedIn
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
