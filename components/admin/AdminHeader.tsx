'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiList, FiMessageSquare, FiPlusCircle, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Home', href: '/admin-dashboard', icon: <FiHome className="w-4 h-4" /> },
    { name: 'Reviews', href: '/admin-dashboard/reviews', icon: <FiMessageSquare className="w-4 h-4" /> },
    { name: 'Perfumes', href: '/admin-dashboard/products-list', icon: <FiList className="w-4 h-4" /> },
    { name: 'Add Perfume', href: '/admin-dashboard/add-product', icon: <FiPlusCircle className="w-4 h-4" /> },
    { name: 'Orders', href: '/admin-dashboard/orders', icon: <FiShoppingBag className="w-4 h-4" /> },
  ];

  if (pathname === "/admin-dashboard/login") {
    return null;
  }

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      router.push("/admin-dashboard/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="relative bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <h1 className="text-xl font-bold md:text-2xl text-main">Admin Panel</h1>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6 text-gray-600">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-2 py-1 transition hover:text-main ${
                    pathname === item.href ? 'text-main font-bold' : ''
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <FiHome className="w-4 h-4" />
            Go Home
          </Link>
          
          <button 
            className="hidden sm:block text-sm underline cursor-pointer hover:text-red-600" 
            onClick={logout}
          >
            Logout
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="p-2 lg:hidden" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 border-t' : 'max-h-0'}`}>
        <ul className="flex flex-col p-4 space-y-3 bg-gray-50 text-gray-600">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 py-2 text-base"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
          <hr className="my-2" />
          <li className="flex flex-col gap-3">
             <Link href="/" className="flex items-center gap-3 py-2 text-base font-medium">
                <FiHome className="w-4 h-4" /> Go Home
             </Link>
             <button 
              onClick={logout}
              className="flex items-center gap-3 py-2 text-base text-red-600 font-medium"
             >
               Logout
             </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;