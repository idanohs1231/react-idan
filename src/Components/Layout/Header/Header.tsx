/* eslint-disable tailwindcss/classnames-order */
import {
  DarkThemeToggle,
  Navbar,
  TextInput,
  Avatar,
  Dropdown,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { CiSearch } from "react-icons/ci";
import { searchActions } from "../../../Store/SearchSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

const Header = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    dispatch(userActions.logout());
    nav("/");
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchActions.searchWord(value));
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Smooth animation duration
      easing: "ease-in-out", // Smooth easing
      once: false, // Ensure it animates every time it's opened
    });
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <Navbar
      fluid
      rounded
      className="transition-all duration-300 bg-white dark:bg-black"
    >
      {/* Brand */}
      <Navbar.Brand as={Link} to="/">
        <span className="self-center text-xl font-extrabold text-black whitespace-nowrap dark:text-green-300">
          Idan david
        </span>
      </Navbar.Brand>

      <Navbar.Toggle />

      {/* Main Links */}
      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          to="/"
          className="text-black transition-transform duration-300 hover:scale-105 hover:text-green-300"
        >
          Home
        </Navbar.Link>

        <Navbar.Link
          as={Link}
          to="/about"
          className="text-black transition-transform duration-300 hover:scale-105 hover:text-green-300"
        >
          About
        </Navbar.Link>

        {!user && (
          <>
            <Navbar.Link
              as={Link}
              to="/signin"
              className="text-black transition-transform duration-300 hover:scale-105 hover:text-green-300"
            >
              Sign In
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/signup"
              className="text-black transition-transform duration-300 hover:scale-105 hover:text-green-300"
            >
              Sign Up
            </Navbar.Link>
          </>
        )}
        {user && (
          <Navbar.Link
            as={Link}
            to="/profile"
            className="text-black transition-transform duration-300 hover:scale-105 hover:text-green-300"
          >
            Profile
          </Navbar.Link>
        )}
              </Navbar.Collapse>

      {/* Search Input */}
      <TextInput rightIcon={CiSearch} onChange={search} />

      {/* User Dropdown with Avatar */}
      {user && (
        <div onClick={toggleDropdown}>
          <Dropdown
            arrowIcon={false}
            inline
            placement="bottom-end"
            className={`z-50 awful-dropdown ${
              isDropdownOpen ? "aos-animate" : ""
            }`}
            label={
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar
                  img={user.image.url}
                  alt={user.image.alt || "User Avatar"}
                  rounded
                />
                <span className="font-medium text-black dark:text-green-300">
                  {user.name.first} {user.name.last}
                </span>
              </div>
            }
          >
            <Dropdown.Header>

            </Dropdown.Header>
            <Dropdown.Item as={Link} to="/favorites">
              Favorites
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/createcard">
              Create Card
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/mycards">
              My Cards
            </Dropdown.Item>
            <Dropdown.Item
              onClick={logout}
              className=""
            >
              Log Out
            </Dropdown.Item>

          </Dropdown>
        </div>
      )}

      {/* Dark Mode Toggle */}
      <DarkThemeToggle className="gap-3 max-md:flex max-md:flex-col max-md:items-center" />
    </Navbar>
  );
};

export default Header;
