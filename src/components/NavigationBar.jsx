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

const NavigationBar = () => {
    // ✅ navLinks data
    const navLinks = [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "All Volunteers", path: "/allvolunteerneedposts" },
        { id: 3, name: "Contact", path: "/contact" },
    ];

    const { user, logOut } = useContext(AuthContext);

    const signOut = () => {
        logOut();
    };

    return (
        <Navbar
            fluid
            rounded
            className="bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-50"
        >
            {/* Brand */}
            <NavbarBrand as={Link} to="/">
                <span className="self-center whitespace-nowrap text-2xl font-semibold text-blue-600">
                    Volunteer Hub
                </span>
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
                        <DropdownItem onClick={signOut} className="text-red-600">
                            Sign out
                        </DropdownItem>
                    ) : (
                        <DropdownItem as={Link} to="/login">
                            Login
                        </DropdownItem>
                    )}
                </Dropdown>

                <NavbarToggle className="ml-2 text-gray-600 hover:text-blue-600" />
            </div>

            {/* Navbar Links */}
            <NavbarCollapse className="md:justify-center md:space-x-6">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.id}
                        to={link.path}
                        className={({ isActive }) =>
                            `relative block py-2 px-3 rounded-md transition duration-200
     ${isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 
     after:bg-blue-600 after:transition-all after:duration-1000 hover:after:w-[100%]`
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
