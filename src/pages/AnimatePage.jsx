import { motion } from "framer-motion";

const AnimatePage = ({ children }) => {
  const animations = (variants, custom) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
      custom,
    };
  };

  const expand = {
    initial: {
      top: 0,
    },
    enter: (i) => ({
      top: "100vh",
      transition: {
        duration: 0.4,
        delay: 0.05 * i,
        ease: [0.215, 0.61, 0.355, 1],
      },
      transitionEnd: { height: "0", top: "0" },
    }),
    exit: (i) => ({
      height: "100vh",
      transition: {
        duration: 0.5,
        delay: 0.05 * i,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const column = 6;
  return (
    <>
      {/**
       * 
      <div>
        <motion.div
          {...animations(slide)}
          className="fixed top-0 left-0 w-full h-screen bg-red-500"
        />
        <motion.div key={window.location.href} {...animations(opacity)}>
          {children}
        </motion.div>
      </div>


      {children}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-black origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        key={window.location.href}
        className="fixed top-0 left-0 w-full h-screen bg-black origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
      />
      */}

      <div>
        <motion.div
          key={window.location.pathname}
          className="flex z-50 h-screen w-screen fixed top-0 left-0 pointer-events-none"
        >
          {[...Array(column)].map((_, i) => {
            return (
              <motion.div
                key={i}
                {...animations(expand, column - i)}
                className={`relative h-full w-full  bg-gray-500 bg-opacity-90`}
              />
            );
          })}
        </motion.div>
        {children}
      </div>
    </>
  );
};

export default AnimatePage;
