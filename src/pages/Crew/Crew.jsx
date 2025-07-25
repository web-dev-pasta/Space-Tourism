import React, { useState, useEffect } from "react";
import styles from "./Crew.module.css";
import axios from "axios";
import { motion } from "framer-motion";
function Crew() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/data/data.json`).then(({ data }) => {
      setItems(data.crew);
    });
  }, []);

  const [item, setItem] = useState(sessionStorage.getItem("crew-member") || 0);
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const text = "02 Meet your crew";
  const letterVariants = {
    hidden: { opacity: 0, y: `0.3em` },
    visible: { opacity: 1, y: `0em`, transition: { duration: 0.3 } },
  };
  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  const itemVariantPages = {
    hidden: { y: -10 },
    visible: {
      y: 0,
      transition: { duration: 0.3 },
    },
  };
  return (
    <div className={styles.crew}>
      <motion.div
        initial={{ scale: 1.069 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className={styles.bg}
      ></motion.div>
      {items && (
        <div className={`${styles.container} container`}>
          <div className={styles.data}>
            <div className={styles.meet}>
              <motion.p
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {text.split("").map((char, i) => (
                  <motion.span key={i} variants={letterVariants}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>
            </div>
            <motion.div
              variants={containerVariant}
              className={styles.info}
              initial="hidden"
              animate="visible"
              key={Math.random()}
            >
              <motion.p variants={itemVariant}>{items[item].role}</motion.p>
              <motion.p variants={itemVariant}>{items[item].name}</motion.p>
              <motion.p variants={itemVariant}>{items[item].bio}</motion.p>
            </motion.div>
            <motion.div
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              className={styles.pages}
            >
              {items.map((e, i) => {
                return (
                  <motion.span
                    variants={itemVariantPages}
                    key={i}
                    className={`${styles.special} ${
                      item === i ||
                      Number(sessionStorage.getItem("crew-member")) === i
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => {
                      setItem(i);
                      sessionStorage.setItem("crew-member", i);
                    }}
                  ></motion.span>
                );
              })}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.photo}
            key={items[item].images.png}
            style={{ overflow: `hidden` }}
            onMouseEnter={() => {
              const img = new Image();
              img.src = items[item].images.png;
            }}
          >
            <img src={items[item].images.png} alt="" />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Crew;
