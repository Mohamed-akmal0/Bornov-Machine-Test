import {launchImageLibrary, ImageLibraryOptions} from 'react-native-image-picker';

export const fetchImageFromGallery = async () => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo', // Restricts to images
    quality: 0.9,
    maxWidth: 2000,
    maxHeight: 2000,
    includeBase64: false,
  };
  const result = await launchImageLibrary(options);
  console.log('result', result)
  return result;
};
