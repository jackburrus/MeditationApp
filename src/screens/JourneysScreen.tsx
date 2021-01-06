import { useTheme } from "@shopify/restyle";
import { API, Auth, graphqlOperation } from "aws-amplify";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  getJourney,
  listFavorites,
  listMeditations,
} from "../../graphql/queries";
import AudioPlayer from "../components/AudioPlayer";
import DailyMeditation from "../components/DailyMeditation";
import FeaturedItem from "../components/FeaturedItem";
import MeditationItem from "../components/MeditationItem";
import { device } from "../constants";
import { DataContext } from "../stores/DataContext";
import { ErrorContext } from "../stores/ErrorContext";
import { FavoritesContext } from "../stores/FavoritesContext";
import { ThemeContext } from "../stores/ThemeContext";
import { Box, Text } from "../theme";
import { Theme } from "../theme/Theme";

interface JourneysScreenProps {}

const fetchData = async (query) => {
  const user = await Auth.currentUserCredentials();

  switch (query) {
    case listMeditations:
      const PhilData = await API.graphql(
        graphqlOperation(query, { filter: { tag: { eq: "Philosophy" } } })
      );
      return PhilData;
  }
};

const getJourneyItem = async (id) => {
  const APIData = await API.graphql(graphqlOperation(getJourney, { id: id }));
  return APIData;
};

const JourneysScreen = ({ navigation }) => {
  const [meditations, setJourneys] = useState([]);
  const { data } = useContext(DataContext);
  const { favoritesData } = useContext(FavoritesContext);
  const { error, setError } = useContext(ErrorContext);
  const { t, setTheme } = useContext(ThemeContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [philosophyData, setPhilosophyData] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [dailyMeditation, setDailyMeditation] = useState(null);
  const theme = useTheme<Theme>();
  const { primary, offWhite, secondary } = theme.colors;

  const modalizeRef = useRef<Modalize>(null);

  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const getFeatured = async () => {
    const d = await API.graphql(
      graphqlOperation(listMeditations, {
        filter: { featured: { eq: true } },
      })
    );
    return d;
  };

  const getDailyMeditation = async () => {
    const d = await API.graphql(
      graphqlOperation(listMeditations, {
        filter: { tag: { eq: "Practice" } },
      })
    );
    return d;
  };

  const onOpen = (id) => {
    setActiveTrackId(id);
    modalizeRef.current?.open();
  };

  useEffect(() => {
    fetchData(listMeditations).then((res) => {
      // console.log(res);
      setPhilosophyData(res.data.listMeditations.items);
    });
  }, []);

  useEffect(() => {
    getFeatured().then((res) => {
      setFeaturedData(res.data.listMeditations.items[0]);
    });
  }, []);

  useEffect(() => {
    getDailyMeditation().then((res) => {
      const latestDate = new Date(
        Math.max(
          ...res.data.listMeditations.items.map((e) => new Date(e.createdAt))
        )
      );

      res.data.listMeditations.items.map((item) => {
        const dateCreated = new Date(item.createdAt);

        if (dateCreated.getTime() === latestDate.getTime()) {
          setDailyMeditation(item);
        }
      });
    });
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#1A2B3C" }}>
      <Box flex={1} backgroundColor="primary">
        <Box alignItems={"center"} margin={"l"}>
          {featuredData ? (
            <FeaturedItem
              title={featuredData.title}
              description={featuredData.description}
              image={{ uri: featuredData.imageSource }}
              handlePress={() => onOpen(featuredData.id)}
            />
          ) : null}
        </Box>
        <Box
          flexDirection={"row"}
          justifyContent={"space-between"}
          width={device.width - theme.spacing.xl}
          marginRight={"l"}
          marginLeft={"l"}
        >
          <Text color={"textPrimary"}>PRACTICE</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewAll", { tag: "Practice" })}
          >
            <Text variant={"link"}>VIEW ALL</Text>
          </TouchableOpacity>
        </Box>
        <DailyMeditation
          title={"Meditation Practice"}
          date={new Date().toISOString().slice(0, 10)}
          played
          handlePress={() => onOpen(dailyMeditation.id)}
        />
        <ScrollView>
          <Box marginTop={"m"}>
            <Box
              flexDirection={"row"}
              justifyContent={"space-between"}
              width={device.width - theme.spacing.xl}
              marginRight={"l"}
              marginLeft={"l"}
            >
              <Text color={"textPrimary"}>PHILOSOPHY</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewAll", { tag: "Philosophy" })
                }
              >
                <Text variant={"link"}>VIEW ALL</Text>
              </TouchableOpacity>
            </Box>

            <FlatList
              data={philosophyData}
              howsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{
                marginLeft: theme.spacing.l,
                marginTop: theme.spacing.m,
                height: 100,

                flexGrow: 0,
              }}
              horizontal
              renderItem={({ item }) => {
                return (
                  <MeditationItem
                    imageUri={{
                      uri: item.imageSource,
                    }}
                    title={item.title}
                    featured={false}
                    handlePress={() => onOpen(item.id)}
                  />
                );
              }}
            />
          </Box>
          {!favoritesData || favoritesData.length === 0 ? null : (
            <Box marginTop={"m"} marginBottom={"m"}>
              <Box
                flexDirection={"row"}
                justifyContent={"space-between"}
                width={device.width - theme.spacing.xl}
                marginRight={"l"}
                marginLeft={"l"}
              >
                <Text color={"textPrimary"}>FAVORITES</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewAll", { tag: "Favorites" })
                  }
                >
                  <Text variant={"link"}>VIEW ALL</Text>
                </TouchableOpacity>
              </Box>

              <FlatList
                data={favoritesData}
                howsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                  marginLeft: theme.spacing.l,
                  marginTop: theme.spacing.m,
                  height: 100,

                  flexGrow: 0,
                }}
                horizontal
                renderItem={({ item }) => {
                  return (
                    <MeditationItem
                      imageUri={{ uri: item.meditation.imageSource }}
                      title={item.meditation.title}
                      featured={false}
                      handlePress={() => onOpen(item.meditation.id)}
                    />
                  );
                }}
              />
            </Box>
          )}
        </ScrollView>
        <Modalize
          modalHeight={device.height < 100 ? 600 : device.height * 0.7}
          modalStyle={styles.modalStyle}
          scrollViewProps={{ scrollEnabled: false }}
          childrenStyle={styles.modalInnerStyle}
          onClose={() => {
            fetchData(listFavorites).then((res) => {
              const fData = [];

              res.data.listFavorites.items.map(async (item) => {
                const f = await getJourneyItem(item.meditation.id);
                if (f) {
                  fData.push(f.data.getJourney);
                }
                if (fData.length === res.data.listFavorites.items.length) {
                  setFavoritesData(fData);
                }
              });
            });
          }}
          ref={modalizeRef}
        >
          <View style={styles.modalContentContainer}>
            <AudioPlayer closeModal={closeModal} ID={activeTrackId} />
          </View>
        </Modalize>
      </Box>
    </SafeAreaProvider>
  );
};

export default JourneysScreen;

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
