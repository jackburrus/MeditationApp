import { API, Auth, graphqlOperation } from "aws-amplify";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import React, { useContext, useState } from "react";
import { Image } from "react-native";

import { listFavorites } from "../../graphql/queries";
import { AuthContext } from "../stores/AuthContext";
import { ErrorContext } from "../stores/ErrorContext";
import { FavoritesContext } from "../stores/FavoritesContext";

const listImages = `
  
  query MyQuery {
    listMeditations {
      items {
        imageSource
      }
    }
  }
  
  `;

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image.imageSource === "string") {
      return Image.prefetch(image.imageSource);
    } else {
      return Asset.fromModule(image.imageSource).downloadAsync();
    }
  });
}

export default function useCachedResources() {
  const { error, setError } = useContext(ErrorContext);
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const { setFavoritesData } = useContext(FavoritesContext);

  const getFavoritesList = async () => {
    const cognitoUser = await Auth.currentUserCredentials();

    try {
      const favoriteData = await API.graphql(
        graphqlOperation(listFavorites, {
          filter: {
            favoriteOwnerID: { eq: cognitoUser.identityId },
          },
        })
      );
      return favoriteData;
    } catch (err) {
      console.log("Error catching favorites data", err);
    }
  };

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const u = await Auth.currentUserInfo();
        setUser(u);

        const fetchedImages = await API.graphql(graphqlOperation(listImages));
        if (fetchedImages) {
          const imageAssets = cacheImages(
            fetchedImages.data.listMeditations.items
          );

          await Promise.all([...imageAssets]);
        }

        getFavoritesList().then((res) => {
          if (res.data.listFavorites.items.length > 0) {
            setFavoritesData(res.data.listFavorites.items);
          }
        });
      } catch (e) {
        console.warn(e);
        setError("Error in loadResourcesAndDataAsync");
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
