import React from "react";
import { useSpring, animated } from "react-spring";
//HOC SlideDown nhận vào là 1 component, trả về 1 component có animation
export default function SlideDown(Component) {
  const propsSpring = useSpring({
    to: {
      marginTop: '0',
    },
    from: {
        marginTop: '120px',
    }, config: {duration:2000},
  });

  return (
    <animated.div style={propsSpring}>
        <Component/>
    </animated.div>
  );
}
