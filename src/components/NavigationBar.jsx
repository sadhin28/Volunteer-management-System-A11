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
import { Link } from "react-router-dom";
const NavigationBar = () => {
    const {user,logOut}=useContext(AuthContext)
    const signOut=()=>{
       logOut()
    }   
    return (
    <Navbar className="bg-gray-400/50 mx-auto" fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Volunteer Hub</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user && user.photoURL} rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user && user.displayName}</span>
            <span className="block truncate text-sm font-medium">{user && user.email}</span>
          </DropdownHeader>
          <DropdownItem>
            <Link>Add Volunteer need Post</Link>
          </DropdownItem>
          <DropdownItem>
            <Link>Manage My Posts</Link>
            </DropdownItem>
          <DropdownDivider />
          <DropdownItem onCanPlay={signOut}>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#"> All volunteer Need posts</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
    );
};

export default NavigationBar;