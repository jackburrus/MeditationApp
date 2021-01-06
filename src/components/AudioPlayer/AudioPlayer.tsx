import { FontAwesome } from "@expo/vector-icons";
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  spacing,
  SpacingProps,
  useRestyle,
} from "@shopify/restyle";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import { Audio } from "expo-av";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Scrubber from "react-native-scrubber";

import { createFavorite, deleteFavorite } from "../../../graphql/mutations";
import { device } from "../../constants";
import { FavoritesContext } from "../../stores/FavoritesContext";
import { Box, Theme } from "../../theme";
import Quotes from "../Quotes";

import FastForward from "./FastForward";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import Rewind from "./Rewind";

interface AudioPlayerProps {}

const styles = StyleSheet.create({
  container: {
    width: device.width - 100,
    height: device.height * 3,

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const restyleFunctions = [spacing, border, backgroundColor];
type Props = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
  };

const AudioPlayer = ({ closeModal, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const { favoritesData, setFavoritesData } = useContext(FavoritesContext);
  const [audioFile, setAudioFile] = useState(null);
  const [audioStatus, setAudioStatus] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const props = useRestyle(restyleFunctions, rest);

  const { ID } = props;

  const _onPlayBackStatusUpdate = (playbackStatus) => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
      }
    } else {
      if (playbackStatus.isPlaying) {
      } else {
      }

      if (playbackStatus.isBuffering) {
        console.log("audio buffering");
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        console.log("audio finished");
        setPlaying(false);
        closeModal();
      }
    }
  };

  React.useEffect(() => {
    return audioFile
      ? () => {
          // Unloading Sound
          audioFile.unloadAsync();
        }
      : undefined;
  }, [audioFile]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });
    }

    const getAudio = async (ID) => {
      const audioUrl = await Storage.get(`audiofiles/${ID}.mp3`);

      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: audioUrl,
        },
        null,
        _onPlayBackStatusUpdate
      );

      setAudioFile(sound);
    };

    if (mounted) {
      getAudio(ID);
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (audioFile && mounted) {
      audioFile.getStatusAsync().then((result) => {
        if (mounted) {
          setAudioStatus(result);
        }
      });
    }
    return () => {
      mounted = false;
    };
  });

  const pressPlayPause = () => {
    setPlaying(!playing);

    try {
      if (playing) {
        audioFile.pauseAsync();
      } else {
        audioFile.playAsync();
      }
    } catch (error) {}
  };

  const fastForward = async () => {
    audioFile.setStatusAsync({
      positionMillis: audioStatus.positionMillis + 10000,
    });
  };

  const rewind = async () => {
    audioFile.setStatusAsync({
      positionMillis: audioStatus.positionMillis - 10000,
    });
  };

  const onSeek = async (currentPosition) => {
    console.log(currentPosition);
    audioFile.setStatusAsync({
      positionMillis: currentPosition * 1000,
    });
  };

  useEffect(() => {
    favoritesData.map((item) => {
      if (item.meditation && item.meditation.id === ID) {
        setIsFavorite(true);
      }
    });
  }, []);

  const handleCreateFavorite = async () => {
    setIsFavorite(true);
    const user = await Auth.currentUserInfo();
    const favorite = {
      favoriteOwnerID: user.id,
      favoriteOwnerUsername: user.username,
      favoriteMeditationId: ID,
    };
    try {
      const favReturn = await API.graphql(
        graphqlOperation(createFavorite, { input: favorite })
      );

      setFavoritesData((oldvalues) => [
        ...oldvalues,
        favReturn.data.createFavorite,
      ]);
      console.log("Handled creation of favorite: ", favorite);
    } catch (err) {
      console.log("Couldn't create favorite", err);
    }
  };

  const handleDeleteFavorite = async () => {
    setIsFavorite(false);

    const i = favoritesData.find((x) => x.meditation.id === ID);
    try {
      await API.graphql(
        graphqlOperation(deleteFavorite, { input: { id: i.id } })
      );
      const favoritesDataCleaned = favoritesData.filter(
        (item) => item.meditation.id !== ID
      );
      setFavoritesData(favoritesDataCleaned);
      console.log("Handled Deletion of id", ID);
    } catch (err) {
      console.log("Something went wrong with deleting favorite", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Quotes />
      <Box
        width={device.width - 100}
        paddingLeft={"xl"}
        paddingRight={"xl"}
        flexDirection={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
        marginBottom={"l"}
      >
        <TouchableOpacity onPress={rewind}>
          <Box padding="s">
            <Rewind />
          </Box>
        </TouchableOpacity>

        <TouchableOpacity onPress={pressPlayPause}>
          {playing ? <PauseButton /> : <PlayButton />}
        </TouchableOpacity>
        <TouchableOpacity onPress={fastForward}>
          <Box padding="s">
            <FastForward />
          </Box>
        </TouchableOpacity>
      </Box>

      {audioStatus && !audioStatus.durationMillis ? null : (
        <Scrubber
          onSlide={onSeek}
          scrubbedColor={"#D3D1D0"}
          value={audioStatus ? audioStatus.positionMillis / 1000 : 0}
          onSlidingComplete={onSeek}
          onSlidingStart={() => setPlaying(false)}
          totalDuration={audioStatus ? audioStatus.durationMillis / 1000 : 0}
        />
      )}

      <Box
        width={device.width}
        alignItems={"flex-end"}
        marginTop={"m"}
        paddingRight={"l"}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={!isFavorite ? handleCreateFavorite : handleDeleteFavorite}
        >
          {isFavorite ? (
            <FontAwesome name="heart" size={26} color="#F15223" />
          ) : (
            <FontAwesome name="heart-o" size={26} color="white" />
          )}
        </TouchableOpacity>
      </Box>
    </SafeAreaView>
  );
};
export default AudioPlayer;
