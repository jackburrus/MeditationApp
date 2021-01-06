/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMeditation = /* GraphQL */ `
  subscription OnCreateMeditation {
    onCreateMeditation {
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
export const onUpdateMeditation = /* GraphQL */ `
  subscription OnUpdateMeditation {
    onUpdateMeditation {
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
export const onDeleteMeditation = /* GraphQL */ `
  subscription OnDeleteMeditation {
    onDeleteMeditation {
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
export const onCreateFavorite = /* GraphQL */ `
  subscription OnCreateFavorite {
    onCreateFavorite {
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
export const onUpdateFavorite = /* GraphQL */ `
  subscription OnUpdateFavorite {
    onUpdateFavorite {
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
export const onDeleteFavorite = /* GraphQL */ `
  subscription OnDeleteFavorite {
    onDeleteFavorite {
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
