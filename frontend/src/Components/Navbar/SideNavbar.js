import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(location.pathname);

  const navbar = [
    { id: 1, link: "", name: "Contact", style: "bg-blue-400 text-white", style1: "bg-white text-blue-400" },
    { id: 2, link: "experience", name: "Experience", style: "bg-orange-400 text-white", style1: "bg-white text-orange-400" },
    { id: 3, link: "education", name: "Education", style: "bg-green-400 text-white", style1: "bg-white text-green-400" },
    { id: 4, link: "certifications", name: "Certifications", style: "bg-yellow-400 text-white", style1: "bg-white text-yellow-400" },
    { id: 5, link: "skills", name: "Skills", style: "bg-pink-400 text-white", style1: "bg-white text-pink-400" },
    { id: 6, link: "summary", name: "Summary", style: "bg-blue-500 text-white", style1: "bg-white text-blue-400" },
    { id: 7, link: "references", name: "References", style: "bg-red-500 text-white", style1: "bg-white text-red-400" },
  ];

  const handleNavClick = (link) => {
    setActiveNav(`/${link}`);
  };

  return (
    <div className="flex h-screen">
      <aside className="sticky w-[270px] top-0">
        <div>
          {navbar.map((nav) => (
            <ul
              className="flex flex-col font-medium bg-white px-[12px]"
              key={nav.id}
            >
              <Link to={nav.link} onClick={() => handleNavClick(nav.link)}>
                <li
                  className={`flex items-center gap-3 py-[8px] pl-7 text-lg rounded-lg ${
                    activeNav === `/${nav.link}`
                      ? `${nav.style}`
                      : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-[30px] h-[30px] flex items-center justify-center rounded-full ${
                      activeNav === `/${nav.link}`
                        ? `${nav.style1}`
                        : "bg-blue-300 text-white"
                    }`}
                  >
                    O
                  </span>
                  <span>{nav.name}</span>
                </li>
              </Link>
            </ul>
          ))}
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SideNavbar;
