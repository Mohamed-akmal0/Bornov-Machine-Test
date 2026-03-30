import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, Spacing, Typography} from '../theme';

interface ImagePreviewProps {
  imageUri?: string | null;
  processedImageUri?: string | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUri,
  processedImageUri,
}) => {
  const displayUri = processedImageUri || imageUri;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.sectionLabel}>IMAGE PREVIEW</Text>
        {imageUri && (
          <View style={styles.dimensionBadge}>
            <Text style={styles.dimensionText}>Original</Text>
          </View>
        )}
        {processedImageUri && (
          <View style={styles.processedBadge}>
            <Text style={styles.processedBadgeText}>Processed</Text>
          </View>
        )}
      </View>

      <View style={styles.previewCard}>
        {displayUri ? (
          <Image
            source={{uri: displayUri}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <TouchableOpacity style={styles.placeholder} activeOpacity={0.7}>
            <View style={styles.placeholderIconContainer}>
              <View style={styles.placeholderIconOuter}>
                <View style={styles.placeholderIconMountain} />
                <View style={styles.placeholderIconSun} />
              </View>
            </View>
            <Text style={styles.placeholderTitle}>No Image Selected</Text>
            <Text style={styles.placeholderSubtitle}>
              Tap the button below to pick an image{'\n'}from your gallery
            </Text>
            <View style={styles.tapIndicator}>
              <View style={styles.tapIndicatorDot} />
              <View style={styles.tapIndicatorDot} />
              <View style={styles.tapIndicatorDot} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionLabel: {
    ...Typography.label,
    flex: 1,
  },
  dimensionBadge: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Spacing.radiusSm,
    marginRight: Spacing.xs,
  },
  dimensionText: {
    ...Typography.label,
    fontSize: 10,
    color: Colors.secondary,
  },
  processedBadge: {
    backgroundColor: 'rgba(124, 106, 255, 0.15)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Spacing.radiusSm,
  },
  processedBadgeText: {
    ...Typography.label,
    fontSize: 10,
    color: Colors.primary,
  },
  previewCard: {
    borderRadius: Spacing.radiusXl,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadowColor,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: Spacing.radiusXl,
  },
  placeholder: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: Spacing.radiusXl,
    margin: 1,
  },
  placeholderIconContainer: {
    marginBottom: Spacing.lg,
  },
  placeholderIconOuter: {
    width: 72,
    height: 72,
    borderRadius: Spacing.radiusXl,
    backgroundColor: Colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  placeholderIconMountain: {
    width: 0,
    height: 0,
    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderBottomWidth: 22,
    borderLeftColor: Colors.transparent,
    borderRightColor: Colors.transparent,
    borderBottomColor: Colors.primary,
    opacity: 0.6,
  },
  placeholderIconSun: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
    position: 'absolute',
    top: 18,
    right: 20,
    opacity: 0.6,
  },
  placeholderTitle: {
    ...Typography.subtitle,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  placeholderSubtitle: {
    ...Typography.caption,
    textAlign: 'center',
    lineHeight: 20,
  },
  tapIndicator: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
    gap: 6,
  },
  tapIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.borderLight,
  },
});

export default ImagePreview;
