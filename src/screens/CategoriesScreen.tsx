import { useTheme } from "@shopify/restyle";
import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { ActivityIndicator } from "react-native-paper";
import Carousel from "react-native-snap-carousel";

import { listMeditations } from "../../graphql/queries";
import AudioPlayer from "../components/AudioPlayer";
import FeaturedItem from "../components/FeaturedItem";
import MeditationItem from "../components/MeditationItem";
import { device } from "../constants";
import { Box } from "../theme";
import { Theme } from "../theme/Theme";

interface TheoryMainProps {}

const customTagQuery = `
query MyQuery {
  listMeditations {
    items {
      tag
      imageSource
      id
    }
  }
}

`;

const TheoryMain = () => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme<Theme>();
  const carouselRef = useRef("");
  const [tagData, setTagData] = useState([]);
  const [activeTrackId, setActiveTrackId] = useState(null);

  const [activeTag, setActiveTag] = useState("");
  const [meditationData, setJourneyData] = useState([]);
  const fetchCategories = async () => {
    const data = await API.graphql(graphqlOperation(customTagQuery));
    return data;
  };

  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    fetchCategories().then((res) => {
      const unique = [];
      const map = new Map();
      for (const item of res.data.listMeditations.items) {
        if (!map.has(item.tag)) {
          map.set(item.tag, true);
          unique.push({
            tag: item.tag,
            imageSource: item.imageSource,
          });
        }
      }

      setTagData(unique);
      setActiveTag(unique[0].tag);
      setLoading(false);
    });
  }, []);

  const onOpen = (id) => {
    setActiveTrackId(id);
    modalizeRef.current?.open();
  };

  const getJourneyByTag = async (tag) => {
    const data = await API.graphql(
      graphqlOperation(listMeditations, {
        filter: { tag: { eq: tag } },
      })
    );
    return data;
  };

  useEffect(() => {
    getJourneyByTag(activeTag).then((res) => {
      setJourneyData(res.data.listMeditations.items);
    });
  }, [activeTag]);

  if (loading) {
    return (
      <Box
        flex={1}
        backgroundColor={"primary"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ActivityIndicator
          size={"large"}
          animating={true}
          color={theme.colors.allWhite}
        />
      </Box>
    );
  }
  return (
    <Box backgroundColor={"primary"} flex={1}>
      <Box flex={1}>
        <Carousel
          ref={carouselRef}
          data={tagData}
          containerCustomStyle={{
            borderColor: "white",
          }}
          contentContainerCustomStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onSnapToItem={(index) => setActiveTag(tagData[index].tag)}
          renderItem={({ item, index }) => {
            return (
              <FeaturedItem
                title={item.tag}
                image={{ uri: item.imageSource }}
                containerStyle={{
                  width: device.width - 100,
                }}
                imageStyle={{ width: device.width - 100 }}
                gradientStyle={{
                  width: device.width - 100,
                  borderRadius: 8,
                }}
              />
            );
          }}
          sliderWidth={device.width - 10}
          itemWidth={device.width - 100}
        />
      </Box>
      <Box flex={2} justifyContent={"center"} alignItems={"center"}>
        <FlatList
          data={meditationData}
          style={{
            flexDirection: "column",
          }}
          contentContainerStyle={{}}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <Box marginTop={"l"}>
                <TouchableOpacity
                  onPress={() => {
                    onOpen(item.id);
                  }}
                >
                  <MeditationItem
                    title={item.title}
                    imageUri={{ uri: item.imageSource }}
                  />
                </TouchableOpacity>
              </Box>
            );
          }}
        />
      </Box>

      <Modalize
        modalHeight={device.height < 100 ? 600 : device.height * 0.7}
        modalStyle={styles.modalStyle}
        scrollViewProps={{ scrollEnabled: false }}
        childrenStyle={styles.modalInnerStyle}
        ref={modalizeRef}
      >
        <View style={styles.modalContentContainer}>
          <AudioPlayer closeModal={closeModal} ID={activeTrackId} />
        </View>
      </Modalize>
    </Box>
  );
};
export default TheoryMain;

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
