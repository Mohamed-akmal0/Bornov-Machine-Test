import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, StatusBar} from 'react-native';
import {Colors, Spacing} from '../theme';
import {
  Header,
  ImageEditor,
  LocationCard,
  ActionButton,
  ProcessingStatus,
} from '../components';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

const HomeScreen: React.FC = () => {
  //state
  const [image, setImage] = useState<null | string>(null);

  //image fetch function
  const fetchImageFromGallery = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo', // to fetch only images
      quality: 0.9,
      maxWidth: 2000,
      maxHeight: 2000,
      includeBase64: false,
    };
    const result = await launchImageLibrary(options);
    setImage(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {/* Header */}
        <Header />

        {/* Location & Language Card */}
        <LocationCard />

        {/* Image Editor (Preview + Filters combined) */}
        <ImageEditor imageUri={image} />

        {/* Processing Status - shown after filter is applied */}
        <ProcessingStatus
          isProcessing={false}
          filterName="Grayscale"
          processingTime={null}
        />

        {/* Action Button */}
        <View style={styles.buttonSection}>
          <ActionButton
            title="Pick Image"
            subtitle="Select from gallery"
            icon="🖼️"
            variant="primary"
            onPress={fetchImageFromGallery}
          />
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Gradient Overlay */}
      <View style={styles.bottomOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.xxl,
  },
  buttonSection: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.sm,
  },
  buttonSpacer: {
    height: Spacing.md,
  },
  bottomSpacer: {
    height: Spacing.huge,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: Colors.background,
    opacity: 0.9,
  },
});

export default HomeScreen;
