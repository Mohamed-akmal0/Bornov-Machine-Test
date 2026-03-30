import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, StatusBar} from 'react-native';
import {Colors, Spacing} from '../theme';
import {
  Header,
  ImagePreview,
  FilterSelector,
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
      mediaType: 'photo', // Restricts to images
      quality: 0.9,
      maxWidth: 2000,
      maxHeight: 2000,
      includeBase64: false,
    };
    const result = await launchImageLibrary(options);
    console.log('result', result.assets[0].uri);
    setImage(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header />

        {/* Image Preview Area */}
        <ImagePreview imageUri={image} processedImageUri={null} />

        {/* Filter Selector */}
        <FilterSelector selectedFilter="grayscale" />

        {/* Processing Status - shown after filter is applied */}
        <ProcessingStatus
          isProcessing={false}
          filterName="Grayscale"
          processingTime={null}
        />

        {/* Location & Language Card */}
        <LocationCard />

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <ActionButton
            title="Pick Image"
            subtitle="Select from gallery"
            icon="🖼️"
            variant="primary"
            onPress={fetchImageFromGallery}
          />

          <View style={styles.buttonSpacer} />

          <ActionButton
            title="Apply Filter"
            subtitle="Process via native bridge"
            icon="✨"
            variant="secondary"
            disabled
          />

          <View style={styles.buttonSpacer} />

          <ActionButton title="Reset" icon="↻" variant="outline" />
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
