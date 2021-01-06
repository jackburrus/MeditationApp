/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMeditation = /* GraphQL */ `
  query GetMeditation($id: ID!) {
    getMeditation(id: $id) {
      id
      title
      description
      imageSource
      tag
      featured
      createdAt
      favorite {
        id
        favoriteOwnerID
        favoriteOwnerUsername
        meditation {
          id
          title
          description
          imageSource
          tag
          featured
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listMeditations = /* GraphQL */ `
  query ListMeditations(
    $filter: ModelMeditationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeditations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        imageSource
        tag
        featured
        createdAt
        favorite {
          id
          favoriteOwnerID
          favoriteOwnerUsername
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFavorite = /* GraphQL */ `
  query GetFavorite($id: ID!) {
    getFavorite(id: $id) {
      id
      favoriteOwnerID
      favoriteOwnerUsername
      meditation {
        id
        title
        description
        imageSource
        tag
        featured
        createdAt
        favorite {
          id
          favoriteOwnerID
          favoriteOwnerUsername
          createdAt
          updatedAt
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFavorites = /* GraphQL */ `
  query ListFavorites(
    $filter: ModelFavoriteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavorites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        favoriteOwnerID
        favoriteOwnerUsername
        meditation {
          id
          title
          description
          imageSource
          tag
          featured
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const meditationByDate = /* GraphQL */ `
  query MeditationByDate(
    $createdAt: AWSDateTime
    $sortDirection: ModelSortDirection
    $filter: ModelMeditationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    meditationByDate(
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        imageSource
        tag
        featured
        createdAt
        favorite {
          id
          favoriteOwnerID
          favoriteOwnerUsername
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
