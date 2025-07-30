import { useState } from "react";
import styles from "./Crew.module.css";
import { motion } from "framer-motion";

function Crew({ items }) {
  const data = items?.crew;
  const [item, setItem] = useState(
    Number(sessionStorage.getItem("crew-member")) || 0
  );

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

      {data && (
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
              key={data[item].name}
            >
              <motion.p variants={itemVariant}>{data[item].role}</motion.p>
              <motion.p variants={itemVariant}>{data[item].name}</motion.p>
              <motion.p variants={itemVariant}>{data[item].bio}</motion.p>
            </motion.div>

            <motion.div
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              className={styles.pages}
            >
              {data.map((e, i) => (
                <motion.span
                  key={i}
                  variants={itemVariantPages}
                  className={`${styles.special} ${
                    item === i ? styles.active : ""
                  }`}
                  onClick={() => {
                    setItem(i);
                    sessionStorage.setItem("crew-member", i);
                  }}
                ></motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.photo}
            key={data[item].images.png}
            style={{ overflow: `hidden` }}
          >
            <img
              src={`${process.env.PUBLIC_URL}${data[item].images.png.replace(
                ".",
                ""
              )}`}
              alt={data[item].name}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Crew;
