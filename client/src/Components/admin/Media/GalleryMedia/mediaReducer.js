 export const ACTION_TYPES = {
   FETCH_IMAGES: "FETCH_IMAGES",
   TOGGLE_SELECTION: "TOGGLE_SELECTION",
   IMAGE_DELETION: "IMAGE_DELETION",
 }
 
 export const INITIAL_STATE = {
  imagePaths: [],
  selectedImages: [],
  totalImages: 0,
  isLoading: true,
};

export const imageReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_IMAGES:
      return {
        ...state,
        imagePaths: action.payload,
        selectedImages: [],
        totalImages: action.payload.length,
        isLoading: false,
      };

    case ACTION_TYPES.TOGGLE_SELECTION:
      const { path } = action.payload;
      const selectedImages = state.selectedImages.includes(path)
        ? state.selectedImages.filter((selectedPath) => selectedPath !== path)
        : [...state.selectedImages, path];
      return {
        ...state,
        selectedImages,
      };

    case ACTION_TYPES.IMAGE_DELETION:
      const deletedImage = action.payload.path;
      const updatedImagePaths = state.imagePaths.filter(
        (path) => path !== deletedImage
      );
      return{
        ...state,
        imagePaths: updatedImagePaths,
        totalImages: updatedImagePaths.length,
      }

    default:
      return state;
  }
};
