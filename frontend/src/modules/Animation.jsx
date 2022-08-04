import { useSpring, animated, easings, config } from "react-spring";
import { useState, useEffect, useRef } from "react";

function Animation() {
  // const [flip, set] = useState(false);
  // const props = useSpring({
  //   from: {
  //     opacity: 0,
  //     transform: "translateY(30px)",
  //   },
  //   to: {
  //     opacity: 1,
  //     transform: "translateY(0px)",
  //   },
  //   config: config.molasses, // make it nice and wobbly
  //   // config: {
  //   //   duration: 2000,
  //   //   easing: easings.easeInOutQuart,
  //   // },

  //   frequency: 100,
  //   reset: true,
  //   onRest: () => set(!flip),

  const [props, api] = useSpring(() => ({
    from: { y: 30, opacity: 1 },
  }));

  useEffect(() => {
    api({
      y: 20,
      opacity: 1,
      loop: { reverse: true },
      delay: 200,
    });
  }, []);

  return <animated.h3 style={props}>start rebike ▶︎</animated.h3>;
}

export default Animation;
