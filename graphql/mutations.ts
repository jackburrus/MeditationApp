/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMeditation = /* GraphQL */ `
  mutation CreateMeditation(
    $input: CreateMeditationInput!
    $condition: ModelMeditationConditionInput
  ) {
    createMeditation(input: $input, condition: $condition) {
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
export const updateMeditation = /* GraphQL */ `
  mutation UpdateMeditation(
    $input: UpdateMeditationInput!
    $condition: ModelMeditationConditionInput
  ) {
    updateMeditation(input: $input, condition: $condition) {
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
export const deleteMeditation = /* GraphQL */ `
  mutation DeleteMeditation(
    $input: DeleteMeditationInput!
    $condition: ModelMeditationConditionInput
  ) {
    deleteMeditation(input: $input, condition: $condition) {
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
export const createFavorite = /* GraphQL */ `
  mutation CreateFavorite(
    $input: CreateFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    createFavorite(input: $input, condition: $condition) {
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
export const updateFavorite = /* GraphQL */ `
  mutation UpdateFavorite(
    $input: UpdateFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    updateFavorite(input: $input, condition: $condition) {
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
export const deleteFavorite = /* GraphQL */ `
  mutation DeleteFavorite(
    $input: DeleteFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    deleteFavorite(input: $input, condition: $condition) {
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
