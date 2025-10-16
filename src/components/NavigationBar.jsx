import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const NavigationBar = () => {
  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "All Volunteers", path: "/allvolunteerneedposts" },
    { id: 3, name: "Contact", path: "/contact" },
  ];

  const { user, Logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    Logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* 🌈 Full-width navbar background */}
      <div
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/20 backdrop-blur-md shadow-md"
            : "bg-[#511AB7FF]/20 backdrop-blur-0"
        }`}
      >
        {/* 🌈 Center-aligned container for navbar content */}
        <div className="max-w-7xl mx-auto px-4">
          <Navbar fluid rounded className="w-full bg-transparent">
            {/* Brand */}
            <NavbarBrand
              className="flex font-bold gap-2 text-2xl items-center"
              as={Link}
              to="/"
            >
              <FaHeart className="text-red-500" />
              <p className="text-[#511AB7FF]">
                <span className="text-green-500">Volunteer</span> Hub
              </p>
            </NavbarBrand>

            {/* Avatar + Toggle */}
            <div className="flex items-center md:order-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img={user?.photoURL}
                    rounded
                    bordered
                    size="sm"
                  />
                }
              >
                <DropdownHeader>
                  <span className="block text-sm font-medium text-gray-800">
                    {user?.displayName || "Guest"}
                  </span>
                  {user && (
                    <span className="block truncate text-sm text-gray-500">
                      {user.email}
                    </span>
                  )}
                </DropdownHeader>

                {user && (
                  <>
                    <DropdownItem as={Link} to="/add-post">
                      Add Volunteer Need Post
                    </DropdownItem>
                    <DropdownItem as={Link} to="/my-posts">
                      Manage My Posts
                    </DropdownItem>
                    <DropdownDivider />
                  </>
                )}
                {user ? (
                  <DropdownItem
                    onClick={handleLogout}
                    className="hover:text-red-500"
                  >
                    Log out
                  </DropdownItem>
                ) : (
                  <DropdownItem as={Link} to="/login">
                    Log in
                  </DropdownItem>
                )}
              </Dropdown>

              {/* Mobile Sidebar Toggle */}
              <NavbarToggle
                className="ml-2 text-gray-600 hover:text-[#511AB7FF] block md:hidden"
                onClick={() => setSidebarOpen(true)}
              />
            </div>

            {/* Navbar Links for large screen */}
            <NavbarCollapse className="hidden md:flex md:justify-center md:space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative block py-2 px-3 rounded-md transition duration-200 ${
                      isActive
                        ? "text-[#511AB7FF] font-semibold"
                        : "text-gray-700 hover:text-[#511AB7FF]"
                    }
                      after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 
                      after:bg-[#511AB7FF] after:transition-all after:duration-1000 hover:after:w-[100%]`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </NavbarCollapse>
          </Navbar>
        </div>
      </div>

      {/* ✅ Sidebar (for small devices) */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white/90 backdrop-blur-md shadow-lg transform transition-transform duration-500 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl flex items-center gap-1  font-bold text-[#511AB7FF]">
            <FaHeart className="text-red-500" />
              <p>
                <span className="text-green-500">Volunteer</span> Hub
              </p>
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-3xl text-gray-600 hover:text-red-500"
          >
            <IoClose />
          </button>
        </div>

        <nav className="flex flex-col mt-4 space-y-2 px-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md text-lg font-medium transition duration-200 ${
                  isActive
                    ? "text-[#511AB7FF] bg-purple-100"
                    : "text-gray-700 hover:bg-purple-50 hover:text-[#511AB7FF]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="border-t mt-4 pt-3">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setSidebarOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-100"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setSidebarOpen(false)}
                className="block px-3 py-2 rounded-md text-[#511AB7FF] hover:bg-purple-100"
              >
                Log in
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default NavigationBar;
