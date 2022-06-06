import { baseUrl } from "@/config";
import { Album, ImageDetails, MessagePopup } from "@/types";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
  isLogged: boolean;
  images: ImageDetails[];
  imageDetails: ImageDetails;
  albums: Album[];
  imageToAdd?: ImageDetails;
  showCreateAlbumPopup: boolean;
  messagePopup: MessagePopup;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    isLogged: localStorage.getItem("token") ? true : false,
    images: [],
    imageDetails: {
      id: "",
      author: "",
      width: 0,
      height: 0,
      url: "",
      download_url: "",
    },
    albums: [],
    imageToAdd: {
      id: "",
      author: "",
      width: 0,
      height: 0,
      url: "",
      download_url: "",
    },
    showCreateAlbumPopup: false,
    messagePopup: {
      message: "",
      state: false,
    },
  },
  getters: {
    isLogged: (state: State): boolean => state.isLogged,
    images: (state: State): ImageDetails[] => state.images,
    imageDetails: (state: State): ImageDetails => state.imageDetails,
    albums: (state: State): Album[] => state.albums,
    imageToAdd: (state: State): ImageDetails | undefined => state.imageToAdd,
    showCreateAlbumPopup: (state: State): boolean => state.showCreateAlbumPopup,
    messagePopup: (state: State): MessagePopup => state.messagePopup,
  },
  mutations: {
    setIsLogged: (state: State, payload: boolean): void => {
      state.isLogged = payload;
    },
    setImages(state: State, payload: ImageDetails[]): void {
      state.images = payload;
    },
    setImageDetails(state: State, payload: ImageDetails): void {
      state.imageDetails = payload;
    },
    setAlbums(state: State, payload: Album[]): void {
      state.albums = payload;
    },
    setShowCreateAlbumPopup(
      state: State,
      payload: {
        state: boolean;
        imageToAdd?: ImageDetails;
      }
    ): void {
      state.imageToAdd = payload.imageToAdd;
      state.showCreateAlbumPopup = payload.state;
    },
    addImageToAlbum(
      state: State,
      payload: { albumId: string; image: ImageDetails }
    ): void {
      const albumIndex = state.albums.findIndex(
        (album: Album) => album.id === payload.albumId
      );
      const imageIndex = state.albums[albumIndex].images.findIndex(
        (image: ImageDetails) => image.id === payload.image.id
      );
      if (albumIndex !== -1 && imageIndex === -1) {
        state.albums[albumIndex].images = [
          ...state.albums[albumIndex].images,
          payload.image,
        ];
      }
    },
    deleteImageFromAlbum(
      state: State,
      payload: { albumId: string; image: ImageDetails }
    ): void {
      const albumIndex = state.albums.findIndex(
        (album: Album) => album.id === payload.albumId
      );
      const imageIndex = state.albums[albumIndex].images.findIndex(
        (image: ImageDetails) => image.id === payload.image.id
      );
      if (albumIndex !== -1 && imageIndex !== -1) {
        state.albums[albumIndex].images.splice(imageIndex, 1);
      }
    },
    updateAlbum(
      state: State,
      payload: {
        id: string;
        field: unknown;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
      }
    ) {
      const albumIndex = state.albums.findIndex(
        (album: Album) => album.id === payload.id
      );
      if (albumIndex !== -1) {
        const key = payload.field as keyof typeof state.albums[0];
        state.albums[albumIndex][key] = payload.value;
      }
    },
    setMessagePopup(state: State, payload: MessagePopup): void {
      state.messagePopup = payload;
    },
  },
  actions: {
    async getListOfImages(
      { commit, state },
      // eslint-disable-next-line @typescript-eslint/no-inferrable-types
      page: number = 1
    ): Promise<ImageDetails[] | void> {
      const data = await fetch(`${baseUrl}/v2/list?page=${page}&limit=30`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (data.ok) {
        const images = await data.json();
        commit("setImages", [...state.images, ...images]);
        return images;
      } else {
        const errorResponse = await data.json();
        throw errorResponse.error;
      }
    },
    async getImageDetails({ commit }, id: string): Promise<void> {
      const data = await fetch(`${baseUrl}/id/${id}/info`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (data.ok) {
        const imageDetails = await data.json();
        commit("setImageDetails", imageDetails);
      } else {
        const errorResponse = await data.json();
        throw errorResponse.error;
      }
    },
  },
});

export const useStore = () => {
  return baseUseStore(key);
};
