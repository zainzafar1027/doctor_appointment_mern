import { useContext, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext.jsx";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null); // Make sure you've correctly initialized menuRef
  const { user, role, token } = useContext(authContext);

  const handleStickyHesder = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classlist.add("sticky__header");
      } else {
        headerRef.current.classlist.remove("sticky__header");
      }
    });
  };
  useEffect(() => {
    handleStickyHesder();

    return () => window.removeEventListener("scroll", handleStickyHesder);
  });

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("show__menu");
    }
  };

  return (
    <header id="mainDiv" className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* =========== logo ===========*/}
          <div>
            <img src={logo} alt="" />
          </div>

          {/*============= menu ============= */}

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "'text-primaryColor text-[16px] leading-7  font-[600]"
                        : "text-textColor text-[16px] leading-7  font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/*============= nav right */}

          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <div className="flex gap-x-4 justify-between items-center">
                    <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                      <img
                        src={user?.photo}
                        alt=""
                        className="rounded-full w-full"
                      />
                    </figure>
                    <h2>{user?.name}</h2>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default header;