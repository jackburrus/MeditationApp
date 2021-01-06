import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function FastForward(props: SvgProps) {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.5 10c-.667 1.333-2.5 4-6 4-4 0-6.5-2.5-6.5-6.5S4 1 7.5 1s5 3.167 6 4.5m0 0L14 2m-.5 3.5L10 5"
        stroke="#fff"
      />
      <Path
        d="M5.636 10H5.09V6.388l-1.093.401v-.492l1.553-.583h.085V10zm4.262-1.82c0 .635-.108 1.107-.325 1.416-.217.308-.555.463-1.016.463-.455 0-.792-.15-1.011-.452-.219-.302-.332-.753-.34-1.353V7.53c0-.627.108-1.093.325-1.397.217-.305.557-.457 1.02-.457.459 0 .797.147 1.013.442.217.293.329.746.334 1.36v.703zm-.542-.74c0-.46-.064-.794-.193-1.003-.129-.21-.333-.316-.612-.316-.278 0-.48.105-.607.314-.127.209-.192.53-.196.963v.868c0 .46.066.801.2 1.022.134.219.337.328.609.328.267 0 .465-.103.594-.31.131-.207.2-.534.205-.979V7.44z"
        fill="#fff"
      />
    </Svg>
  );
}

export default FastForward;
