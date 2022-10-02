import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { toast } from "react-toastify";

const Navbar = () => {
  const { setAuth, currentUser, setCurrentUser } = useAuth();
  const [user, setUser] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const signOutAction = async () => {
    await axios.post("/api/user/signOut");
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
    }
    setAuth({});
    setCurrentUser("");
    return toast.success("See you next time!");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/">
          <div className={styles.navbar_branding}>
            <Image
              src="/NavbarLogoDark.png"
              alt="brand_logo"
              width="50px"
              height="50px"
            />
            <div className={styles.navbar_brand}>OrderQue.com</div>
          </div>
        </Link>
        <div className={styles.navbar_menus}>
          <ul className={styles.menus_list}>
            <li className={styles.navbar_menu}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles.navbar_menu}>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            {user === "" ? (
              <>
                <li className={styles.navbar_menu}>
                  <Link href="/signUp">
                    <a>Sign Up</a>
                  </Link>
                </li>
                <li className={styles.navbar_menu}>
                  <Link href="/signIn">
                    <a>Sign In</a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className={styles.navbar_menu} onClick={signOutAction}>
                  <Link href="/">
                    <a>Sign Out</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className={styles.navbar_menus_mobile} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <>
              <div className={styles.line_close_one}>
                <span></span>
              </div>
              <div className={styles.line_close_two}>
                <span></span>
              </div>
            </>
          ) : (
            <>
              <div className={styles.line}>
                <span></span>
              </div>
              <div className={styles.line}>
                <span></span>
              </div>
              <div className={styles.line}>
                <span></span>
              </div>
            </>
          )}
        </div>
      </nav>
      {isMobileMenuOpen ? (
        <>
          <div className={styles.navbar_menus_mobile_list}>
            <div className={styles.navbar_menu_mobile}>
              <Link href="/">Home</Link>
            </div>
            <div className={styles.navbar_menu_mobile}>
              <Link href="/about">About</Link>
            </div>
            {user === "" ? (
              <>
                <div className={styles.navbar_menu_mobile}>
                  <Link href="/signUp">Sign Up</Link>
                </div>
                <div className={styles.navbar_menu_mobile}>
                  <Link href="/signIn">Sign In</Link>
                </div>
              </>
            ) : (
              <div
                className={styles.navbar_menu_mobile}
                onClick={signOutAction}
              >
                <Link href="/">Sign Out</Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
