import { useState, useRef } from "react";
import styles from "./Technology.module.css";
import { motion } from "framer-motion";
function Technology({ items }) {
  const isFirstRender = useRef(true);
  const data = items?.technology;
  const [item, setItem] = useState(sessionStorage.getItem("tech") || 0);
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const text = "03 Space launch 101";
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className={styles.technology}>
      <motion.div
        initial={{ scale: 1.069 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className={styles.bg}
      ></motion.div>
      {items && (
        <div className={`${styles.container} fixed-container`}>
          <div className={styles.launch}>
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
            <div className={styles.vehicle}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariant}
                className={styles.tabs}
              >
                {data.map((e, i) => {
                  return (
                    <motion.span
                      variants={itemVariant}
                      key={i}
                      onClick={() => {
                        setItem(i);
                        sessionStorage.setItem("tech", i);
                      }}
                      className={`${styles.special} ${
                        item === i ||
                        Number(sessionStorage.getItem("tech")) === i
                          ? styles.active
                          : ""
                      }`}
                    >
                      {i + 1}
                    </motion.span>
                  );
                })}
              </motion.div>
              <motion.div
                key={item}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: isFirstRender.current ? 0.6 : 0,
                }}
                className={styles.info}
                onAnimationComplete={() => {
                  isFirstRender.current = false;
                }}
              >
                <p>the terminology ...</p>
                <p>{data[item].name}</p>
                <p>{data[item].description}</p>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: isFirstRender.current ? 1 : 0 }}
            className={styles.photo}
            key={item}
            onAnimationComplete={() => {
              isFirstRender.current = false;
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}${data[
                item
              ].images.portrait.replace(".", "")}`}
              alt={data[item].name}
              className={styles.pc}
            />
            <img
              src={`${process.env.PUBLIC_URL}${data[
                item
              ].images.landscape.replace(".", "")}`}
              className={styles.mobile}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Technology;
