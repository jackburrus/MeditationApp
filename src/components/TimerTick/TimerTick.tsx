import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={2}
      height={20}
      viewBox="0 0 2 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M1 0v20" stroke="#fff" strokeWidth={2} />
    </Svg>
  );
}

export default SvgComponent;
