import React from 'react';

const Variants = (direction, delay) => {
   return {
      hidden: {
         y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
         x: direction === 'left' ? 100 : direction === 'right' ? -40 : 0,
      },
      show: {
         y: 0,
         x: 0,
         opacity: 1,
         transition: {
            type: 'spring',
            stiffness: 100,
            damping: 10,
            duration: 1.2,
            delay: delay,
            ease: [0.25, 0.25, 0.25, 0.25],
         },
      },
   };
};

export default Variants;
