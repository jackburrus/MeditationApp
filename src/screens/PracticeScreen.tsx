import { useTheme } from "@shopify/restyle";
import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { ActivityIndicator } from "react-native-paper";

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

const PracticeMain = () => {
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef("");
  const theme = useTheme<Theme>();
  const [tagData, setTagData] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const [activeTrackId, setActiveTrackId] = useState(null);

  const [meditationData, setJourneyData] = useState([]);
  const fetchCategories = async () => {
    const data = await API.graphql(graphqlOperation(customTagQuery));
    return data;
  };
  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = (id) => {
    setActiveTrackId(id);
    modalizeRef.current?.open();
  };

  useEffect(() => {
    fetchCategories().then((res) => {
      const unique = [];
      const map = new Map();
      for (const item of res.data.listMeditations.items) {
        if (!map.has(item.tag)) {
          map.set(item.tag, true); // set any value to Map
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

  const getJourneyByTag = async (tag) => {
    const data = await API.graphql(
      graphqlOperation(listMeditations, {
        filter: { tag: { eq: "Practice" } },
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
          color={theme.colors.textPrimary}
        />
      </Box>
    );
  }
  return (
    <Box backgroundColor={"primary"} flex={1}>
      <Box flex={1} justifyContent={"center"} alignItems={"center"}>
        <FeaturedItem
          title={"Practice"}
          image={{
            uri:
              "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
          }}
        />
      </Box>
      <Box flex={2} justifyContent={"center"} alignItems={"center"}>
        <FlatList
          data={meditationData}
          style={{
            width: device.width / 1.2,

            flexDirection: "column",
          }}
          contentContainerStyle={{
            justifyContent: "center",
          }}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <Box marginLeft={"m"} marginTop={"m"}>
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
export default PracticeMain;

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
