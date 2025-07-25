import { useState } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const Links = ["Home", "Destination", "Crew", "Technology"];
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.header}>
      <div className={`${styles.container} container`}>
        <img src={`${process.env.PUBLIC_URL}/assets/shared/logo.svg`} alt="" />

        <hr />
        <div className={styles.links}>
          {Links.map((e, i) => {
            const path =
              e.toLowerCase() === "home" ? "/" : `/${e.toLowerCase()}`;
            return (
              <NavLink
                to={path}
                key={i}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                <span>0{i}</span>
                {e.toUpperCase()}
              </NavLink>
            );
          })}
        </div>
        <motion.img
          key={open ? "close-icon" : "hamburger-icon"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={styles.icon_menu}
          onClick={() => {
            setOpen((e) => !e);
          }}
          src={
            open
              ? `${process.env.PUBLIC_URL}/assets/shared/icon-close.svg`
              : `${process.env.PUBLIC_URL}/assets/shared/icon-hamburger.svg`
          }
          alt=""
        />
        <AnimatePresence>
          {open && (
            <motion.div
              className={styles.links_menu}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {Links.map((e, i) => {
                const path =
                  e.toLowerCase() === "home" ? "/" : `/${e.toLowerCase()}`;
                return (
                  <NavLink to={path} key={i} onClick={() => setOpen(false)}>
                    {e.toUpperCase()}
                  </NavLink>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Header;
