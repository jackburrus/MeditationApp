import { useTheme } from "@shopify/restyle";
import * as Haptics from "expo-haptics";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Modalize } from "react-native-modalize";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { device } from "../constants";
import { ThemeContext } from "../stores/ThemeContext";
import { Box, Text } from "../theme";
import { Theme } from "../theme/Theme";

interface TimerProps {}

const l = [...Array(60)];
const Timer = () => {
  const { t } = useContext(ThemeContext);
  const transY = useSharedValue(0);
  const transX = useSharedValue(0);
  const time = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const theme = useTheme<Theme>();
  const {
    primary,
    offWhite,
    secondary,
    oceanBlue,
    allWhite,
    wakingUpBlue,
  } = theme.colors;
  const [timer, setTimer] = useState(1);
  const [showTimer, setShowTimer] = useState(false);
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    console.log(timer);
    modalizeRef.current?.open();
  };

  const mts = (value) => {
    return Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : "00");
  };

  const fireHaptic = (event) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      time.value = Math.abs(Math.floor(event.contentOffset.x / 45));
      runOnJS(setTimer)(time.value);

      transX.value = event.contentOffset.x;

      transY.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
      isScrolling.value = true;
    },
    onEndDrag: (e) => {
      isScrolling.value = false;
      runOnJS(fireHaptic)(e);
    },
  });

  return (
    <Box
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"primary"}
    >
      <Box flex={1} justifyContent={"flex-end"} alignItems={"center"}>
        <Text fontSize={72} color={t === "dark" ? "allWhite" : "wakingUpBlue"}>
          {/* {time.value === 0 ? time.value + 1 : time.value} */}
          {timer + 1}
        </Text>
        <Text
          variant={"header"}
          color={t === "dark" ? "allWhite" : "wakingUpBlue"}
        >
          {time.value > 1 ? "Minutes" : "Minute"}
        </Text>
      </Box>

      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        snapToInterval={20}
        snapToAlignment={"center"}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        horizontal
        style={{
          height: device.height / 4,
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: device.width / 2,
        }}
      >
        {l.map((e, i) => {
          const stylez = useAnimatedStyle(() => {
            const size = () => {
              if (i === time.value) {
                return 80;
              } else if (i === time.value + 1) {
                return 60;
              } else if (i === time.value - 1) {
                return 60;
              } else if (i === 0) {
                return 40;
              } else {
                return 40;
              }
            };
            return {
              transform: [
                {
                  translateY: transY.value,
                },
              ],
              width: 5,
              height: withSpring(size(), { stiffness: 40 }),
            };
          });

          return (
            <Animated.View
              key={i}
              style={[
                {
                  margin: 20,

                  backgroundColor: t === "dark" ? allWhite : wakingUpBlue,
                },
                stylez,
              ]}
            />
          );
        })}
      </Animated.ScrollView>

      {/* {showTimer ? (

      ) : (
        <Box flex={1} borderWidth={1} />
      )} */}

      <TouchableOpacity onPress={onOpen}>
        <Box
          width={device.width - 60}
          height={50}
          marginBottom={"m"}
          justifyContent={"center"}
          alignItems="center"
          backgroundColor={"oceanBlue"}
          borderRadius={8}
        >
          <Text color={"textPrimary"} fontSize={18}>
            BEGIN
          </Text>
        </Box>
      </TouchableOpacity>

      <Modalize
        modalHeight={device.height < 100 ? 600 : device.height * 0.7}
        modalStyle={styles.modalStyle}
        scrollViewProps={{ scrollEnabled: false }}
        childrenStyle={styles.modalInnerStyle}
        onClose={() => setTimer(timer)}
        ref={modalizeRef}
      >
        <View style={styles.modalContentContainer}>
          <Box>
            <CountdownCircleTimer
              onComplete={() => {
                fireHaptic();
                Alert.alert("Setup push notifications.");
              }}
              isPlaying
              duration={(timer + 1) * 60}
              colors={oceanBlue}
            >
              {({ remainingTime, animatedColor }) => (
                <Animated.Text style={{ color: allWhite, fontSize: 24 }}>
                  {mts(remainingTime)}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
          </Box>
        </View>
      </Modalize>
    </Box>
  );
};
export default Timer;

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "#142742",
  },
  modalInnerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentContainer: {
    height: 700,

    width: device.width,
    justifyContent: "center",
    alignItems: "center",
  },
});
