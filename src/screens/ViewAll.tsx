import { useTheme } from "@shopify/restyle";
import { API, graphqlOperation } from "aws-amplify";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { ActivityIndicator } from "react-native-paper";

import AudioPlayer from "../components/AudioPlayer";
import ViewAllLineItem from "../components/ViewAllLineItem";
import { device } from "../constants";
import { FavoritesContext } from "../stores/FavoritesContext";
import { Box } from "../theme";
import { Theme } from "../theme/Theme";

const PhilQuery = `
query MyQuery {
    listMeditations(filter: {tag: {eq: "Philosophy"}}) {
      items {
        tag
        id
        title
        imageSource
      }
    }
  }
`;

const PracticeQuery = `
query MyQuery {
    listMeditations(filter: {tag: {eq: "Practice"}}) {
      items {
        tag
        id
        title
        imageSource
      }
    }
  }
`;

interface ViewAllProps {
  tag: string;
}

const ViewAll = ({ route, navigation }) => {
  const { tag } = route.params;
  const [data, setData] = useState([]);
  const { favoritesData } = useContext(FavoritesContext);
  const [loading, setLoading] = useState(true);
  const [activeTrackId, setActiveTrackId] = useState(null);

  const theme = useTheme<Theme>();
  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const modalizeRef = useRef<Modalize>(null);

  const fetchData = async () => {
    switch (tag) {
      case "Philosophy":
        const PhilData = await API.graphql(graphqlOperation(PhilQuery));
        return PhilData.data.listMeditations.items;
        break;
      case "Practice":
        const PraData = await API.graphql(graphqlOperation(PracticeQuery));
        return PraData.data.listMeditations.items;
        break;
    }
  };

  useEffect(() => {
    fetchData().then((res) => {
      if (tag === "Favorites") {
        setData([]);
      } else {
        setData(res);
      }

      setLoading(false);
    });
  }, []);

  const onOpen = (id) => {
    setActiveTrackId(id);
    modalizeRef.current?.open();
  };
  return loading ? (
    <Box backgroundColor={"primary"} flex={1} justifyContent={"center"}>
      <ActivityIndicator
        size={"large"}
        animating={true}
        color={theme.colors.mostlyGrey}
      />
    </Box>
  ) : (
    <Box backgroundColor={"primary"} flex={1}>
      <ScrollView style={{ flex: 1 }}>
        {data.length > 0
          ? data.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    onOpen(item.id);
                  }}
                >
                  <ViewAllLineItem
                    title={item.title}
                    image={item.imageSource}
                  />
                </TouchableOpacity>
              );
            })
          : favoritesData.map((item) => {
              return (
                <TouchableOpacity
                  key={item.meditation.id}
                  onPress={() => {
                    onOpen(item.meditation.id);
                  }}
                >
                  <ViewAllLineItem
                    title={item.meditation.title}
                    image={item.meditation.imageSource}
                  />
                </TouchableOpacity>
              );
            })}
      </ScrollView>
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
export default ViewAll;

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
