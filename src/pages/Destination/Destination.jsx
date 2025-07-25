import React, { useEffect, useState } from "react";
import styles from "./Destination.module.css";
import axios from "axios";
import { motion } from "framer-motion";
function Destination() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/data/data.json`).then(({ data }) => {
      setItems(data.destinations);
    });
  }, []);
  const [selectedItem, setSelectedItem] = useState(
    sessionStorage.getItem("selected-planet") || "Moon"
  );
  const selectedObj =
    items &&
    items.filter((e) => {
      return e.name === selectedItem;
    });
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
      {items && (
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
              key={selectedObj[0].name}
              className={styles.image}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <img src={selectedObj[0].images.png} alt={selectedObj[0].name} />
            </motion.div>
          </div>
          <div className={styles.plants}>
            <div className={styles.categories}>
              {items.map((e, i) => {
                const isActive = selectedItem === e.name;

                return (
                  <span
                    key={i}
                    className={isActive ? styles.active : ""}
                    onMouseEnter={() => {
                      const img = new Image();
                      img.src = e.images.png;
                    }}
                    onClick={() => {
                      setSelectedItem(e.name);
                      sessionStorage.setItem("selected-planet", e.name);
                    }}
                  >
                    {e.name}
                  </span>
                );
              })}
            </div>
            <motion.div
              key={selectedObj[0].name}
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 1 }}
              className={styles.data}
            >
              <motion.div variants={itemVariant} className={styles.name}>
                <p>{selectedObj[0].name}</p>
              </motion.div>
              <motion.div variants={itemVariant} className={styles.desc}>
                <p>{selectedObj[0].description}</p>
              </motion.div>
            </motion.div>
            <motion.div
              className={styles.distances}
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 1 }}
              key={selectedObj[0].distance}
            >
              <motion.div className={styles.distance} variants={itemVariantTwo}>
                <p>avg. distance</p>
                <p>{selectedObj[0].distance}</p>
              </motion.div>
              <motion.div className={styles.travel} variants={itemVariantTwo}>
                <p>est. travel time</p>
                <p>{selectedObj[0].travel}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Destination;
