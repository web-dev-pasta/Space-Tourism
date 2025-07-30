import { useState } from "react";
import styles from "./Destination.module.css";
import { motion } from "framer-motion";
function Destination({ items }) {
  const data = items?.destinations;

  const [activeIndex, setActiveIndex] = useState(
    sessionStorage.getItem("selected-plant") || 0
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
  const text = "01 pick your destination";
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
  const itemVariantTwo = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.7 },
    },
  };

  return (
    <div className={styles.destination}>
      <motion.div
        initial={{ scale: 1.069 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className={styles.bg}
      ></motion.div>
      {data && (
        <div className={`${styles.container} container`}>
          <div className={styles.pick}>
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
            <motion.div
              key={data[activeIndex].images.png}
              className={styles.image}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={`${process.env.PUBLIC_URL}${data[
                  activeIndex
                ].images.png.replace(".", "")}`}
                alt={data[activeIndex].name}
              />
            </motion.div>
          </div>
          <div className={styles.plants}>
            <div className={styles.categories}>
              {data.map((e, i) => (
                <span
                  key={i}
                  className={
                    i === activeIndex ||
                    i == sessionStorage.getItem("selected-plant")
                      ? styles.active
                      : ""
                  }
                  onClick={() => {
                    setActiveIndex(i);
                    sessionStorage.setItem("selected-plant", i);
                  }}
                >
                  {e.name}
                </span>
              ))}
            </div>
            <motion.div
              key={data[activeIndex].name}
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 1 }}
              className={styles.data}
            >
              <motion.div variants={itemVariant} className={styles.name}>
                <p>{data[activeIndex].name}</p>
              </motion.div>
              <motion.div variants={itemVariant} className={styles.desc}>
                <p>{data[activeIndex].description}</p>
              </motion.div>
            </motion.div>
            <motion.div
              className={styles.distances}
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 1 }}
              key={data[activeIndex].distance}
            >
              <motion.div className={styles.distance} variants={itemVariantTwo}>
                <p>avg. distance</p>
                <p>{data[activeIndex].distance}</p>
              </motion.div>
              <motion.div className={styles.travel} variants={itemVariantTwo}>
                <p>est. travel time</p>
                <p>{data[activeIndex].travel}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Destination;
