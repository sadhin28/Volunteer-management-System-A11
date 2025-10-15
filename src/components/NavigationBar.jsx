import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
  
const NavigationBar = () => {
    // ✅ navLinks data
    const navLinks = [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "All Volunteers", path: "/allvolunteerneedposts" },
        { id: 3, name: "Contact", path: "/contact" },
    ];

    const { user, Logout } = useContext(AuthContext);

    const handelLogout = () => {
        console.log("logout");
        Logout()
            .then(() => {}) .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Navbar
            fluid
            rounded
            className="bg-[#511AB7FF]/20 backdrop-blur-md shadow-sm sticky top-0 z-50 "
        >
            {/* Brand */}
            <NavbarBrand className="flex font-bold gap-2 text-2xl items-center" as={Link} to="/">
              <FaHeart className="text-red-500"/>
              <p><span className="text-green-500">Volunteer</span> Hub</p>
            
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
                    {
                        user ? <DropdownItem onClick={handelLogout} className="hover:text-red-500">Log out</DropdownItem>:<DropdownItem as={Link} to="/login">Log in</DropdownItem>          
                    }
                </Dropdown>

                <NavbarToggle className="ml-2 text-gray-600 hover:text-[#511AB7FF]" />
            </div>

            {/* Navbar Links */}
            <NavbarCollapse className="md:justify-center md:space-x-6">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.id}
                        to={link.path}
                        className={({ isActive }) =>
                            `relative block py-2 px-3 rounded-md transition duration-200
     ${isActive ? "text-[#511AB7FF] font-semibold" : "text-gray-700 hover:text-[#511AB7FF]"}
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 
     after:bg-[#511AB7FF] after:transition-all after:duration-1000 hover:after:w-[100%]`
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
            </NavbarCollapse>
        </Navbar>
    );
};

export default NavigationBar;
