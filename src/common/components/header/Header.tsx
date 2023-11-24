import clsx from "clsx";
import React, { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "../container/Container";
import { useAuth } from "../../../modules/auth/hooks/use-auth";
import { MdOutlineEdit } from "react-icons/md";
import { CiSettings } from "react-icons/ci";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { isLoggedIn, logOut, user } = useAuth();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    clsx("py-navItem hover:text-black/60 hover:no-underline", {
      "text-black/30": !isActive,
      "text-black/80": isActive,
    });
  return (
    <header>
      <nav className="py-2 px-4">
        <Container>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="font-titillium text-2xl mr-8 text-theme-green"
            >
              Conduit
            </Link>
            <ul className="pl-0 mb-0 list-none flex">
              <li>
                <NavLink to="/" className={navLinkClasses}>
                  Home
                </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="ml-4">
                    <NavLink to="/editor" className={navLinkClasses}>
                      <div className="flex items-center gap-2">
                        <MdOutlineEdit />
                        New article
                      </div>
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink to="/settings" className={navLinkClasses}>
                      <div className="flex items-center gap-2">
                        <CiSettings className="mr-2" />
                        Settings
                      </div>
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink
                      to={`/${user?.username}`}
                      className={navLinkClasses}
                    >
                      <img
                        src={user?.image}
                        alt={`${user?.username} avatar`}
                        className="w-6 h6 rounded rounded-full inline-block mr-2"
                      />
                      {user?.username}
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink to="/" className={navLinkClasses} onClick={logOut}>
                      Log out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="ml-4">
                    <NavLink to="/sign-in" className={navLinkClasses}>
                      Sign in
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink to="/sign-up" className={navLinkClasses}>
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
