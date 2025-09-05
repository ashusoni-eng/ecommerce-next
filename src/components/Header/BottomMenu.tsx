import React from "react";
import Link from "next/link";

const menuItems = [
  {
    title: "Home",
    path: "/",
    icon: (
      <svg className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    ),
  },
  {
    title: "Categories",
    path: "/shop-with-sidebar",
    icon: (
        <svg className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
    ),
  },
  {
    title: "Orders",
    path: "/my-account",
    icon: (
        <svg className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" x2="21" y1="6" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
    ),
  },
  {
    title: "Profile",
    path: "/my-account",
    icon: (
        <svg className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    ),
  },
  {
    title: "Cart",
    path: "/cart",
    icon: (
        <svg className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"></path></svg>
    ),
  },
];

const BottomMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 z-999 w-full h-16 bg-white border-t border-gray-3 xl:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {menuItems.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          >
            {item.icon}
            <span className="text-sm text-gray-500 group-hover:text-blue">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomMenu;
