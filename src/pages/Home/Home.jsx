import styles from "./Home.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <div className={styles.home}>
      <motion.div
        initial={{ scale: 1.069 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className={styles.bg}
      ></motion.div>

      <div className={styles.outerContainer}>
        <div className={`${styles.innerContainer} container`}>
          <motion.div
            className={styles.space}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={childVariants}>
              so, you want to travel to
            </motion.p>
            <motion.h1 variants={childVariants}>space</motion.h1>
            <motion.p variants={childVariants}>
              Let's face it; if you want to go to space, you might as well
              <br />
              genuinely go to outer space and not hover kind of on the
              <br /> edge of it. Well sit back, and relax because we'll give you
              <br />a truly out of this world experience!
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={styles.explore}
          >
            <p>Explore</p>
            <Link to={"/destination"}></Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
