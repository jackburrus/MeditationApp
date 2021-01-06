import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

function PauseButton(props: SvgProps) {
  return (
    <Svg
      width={57}
      height={57}
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={28.5} cy={28.5} r={28.5} fill="#2B74D9" />
      <Path stroke="#FFFEFE" strokeWidth={4} d="M23 20v16M35 20v16" />
    </Svg>
  );
}

export default PauseButton;
