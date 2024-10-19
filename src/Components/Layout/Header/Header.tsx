/* eslint-disable tailwindcss/classnames-order */
import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { CiSearch } from "react-icons/ci";
import { searchActions } from "../../../Store/SearchSlice";

const Header = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logout = () => {
    dispatch(userActions.logout());
    nav("/");
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchActions.searchWord(value));
  };

  return (
    <Navbar fluid rounded className="bg-white-800 dark:black-500 ">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center text-xl font-semibold text-black whitespace-nowrap dark:text-green-500">
          What The Card
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Brand className="gap-9 max-md:flex max-md:flex-col text-black dark:text-green-500">
          <Navbar.Link 
            as={Link} 
            to={"/"} 
            href="/" 
            className="text-black">
            Home
          </Navbar.Link>
          {!user && (
            <>
              <Navbar.Link
              as={Link}
              to={"/signin"}
              href="/signin"
              className="text-black">
              Sign In
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to={"/signup"}
              href="/signup"
              className="text-black">
              Sign Up
            </Navbar.Link>
            </>
          )}
          {user && (
            <Navbar.Link 
            className="text-black cursor-pointer" 
            onClick={logout}>
              Sign Out
            </Navbar.Link>
          )}

          {user?.isBusiness && (
            <>
            <Navbar.Link
              as={Link}
              to={"/mycards"}
              href="/mycards"
              className="text-black">
              My-Cards
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to={"/createcard"}
              href="/createcard"
              className="text-black">
              Create Card
            </Navbar.Link>
            </>
          )}
          {user && (
            <>
              <Navbar.Link
                as={Link}
                to={"/profile"}
                href="/profile"
                className="text-black">
                Profile
              </Navbar.Link>
              <Navbar.Link
                as={Link}
                to={"/favorites"}
                href="/favorites"
                className="text-black">
                Favorites
              </Navbar.Link>
            </>
          )}
        </Navbar.Brand>
      </Navbar.Collapse>
      <TextInput rightIcon={CiSearch} onChange={search} />
      <DarkThemeToggle className="gap-3 max-md:flex max-md:flex-col max-md:items-center" />
    </Navbar>
  );
};

export default Header;
