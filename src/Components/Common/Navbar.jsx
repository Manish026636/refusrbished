import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  FaCube,
  FaUserCircle,
  FaChevronDown,
  FaPowerOff,
  FaBars,
  FaBusinessTime,
  FaHome,
} from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import milo from "../../assets/milo.png";
import male from "../../assets/male.svg";
import female from "../../assets/female.svg";
const profileMenuItems = [
  {
    label: "Sign Out",
    icon: FaPowerOff,
    route: "/logout",
  },
];

function ProfileMenu({ delegate_info }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src={user && user.gender.toLowerCase() === "male" ? male : female}
          />
          <FaChevronDown
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {user && (
          <>
            <MenuItem
              key={"profile"}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded cursor-default`}
              disabled
            >
              {React.createElement(FaUserCircle, {
                className: `h-4 w-4 text-black`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={"black"}
              >
                <div className="flex justify-center items-center">
                  <span className="mr-1">{user.name}</span>
                  {delegate_info && (
                    <span>
                      {delegate_info.is_chair_person ? "(Chair)" : "(Delegate)"}
                    </span>
                  )}
                </div>
              </Typography>
            </MenuItem>
          </>
        )}
        {profileMenuItems.map(({ label, icon, route }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                <Link to={route}>{label}</Link>
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            {""}
          </Typography>
        </MenuHandler>
      </Menu>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: FaHome,
    route: "/",
  },

  {
    label: "About",
    icon: FaCube,
    route: "/about",
  },
];

function NavList({ delegate_info }) {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon, route }, key) => (
        <Typography
          key={label}
          as="span"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <Link to={route}>
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, {
                className: "h-[18px] w-[18px]",
              })}{" "}
              {label}
            </MenuItem>
          </Link>
        </Typography>
      ))}
      <Typography
        key={"Report"}
        as="span"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <Link to={"/dashboard/report"}>
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(TbReportAnalytics, {
              className: "h-[18px] w-[18px]",
            })}{" "}
            Report
          </MenuItem>
        </Link>
      </Typography>
      <Typography
        key={"Session"}
        as="span"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <Link to={"/dashboard/session"}>
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(FaBusinessTime, {
              className: "h-[18px] w-[18px]",
            })}{" "}
            Session
          </MenuItem>
        </Link>
      </Typography>
    </ul>
  );
}

const MainNav = () => {
  const { loading, is_authenticated } = useSelector((state) => state.user);
  const { delegate_info } = useSelector((state) => state.delegate_details);

  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar className="mx-auto  max-w-screen-4xl p-2 lg:pl-6">
            <div className="relative mx-auto flex items-center text-blue-gray-900">
              <Link to="/">
                <img src={milo} alt="Logo" className=" h-12 mr-2" />
              </Link>
              <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                <NavList delegate_info={delegate_info} />
              </div>
              <div className="w-full flex justify-end items-center">
                {is_authenticated ? (
                  <>
                    <ProfileMenu delegate_info={delegate_info} />
                  </>
                ) : (
                  <>
                    <div className="ml-auto">
                      <button className="ml-auto mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                        <Link to="/login">Login</Link>
                      </button>
                    </div>
                  </>
                )}
                <IconButton
                  size="sm"
                  color="blue-gray"
                  variant="text"
                  onClick={toggleIsNavOpen}
                  className="mr-2 lg:hidden"
                >
                  <FaBars className="h-6 w-6" />
                </IconButton>
              </div>
            </div>
            <MobileNav open={isNavOpen}>
              <NavList />
            </MobileNav>
          </Navbar>
        </>
      )}
    </>
  );
};

export default MainNav;
