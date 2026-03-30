import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors, Spacing, Typography} from '../theme';
import {
  Canvas,
  Image as SkiaImage,
  useImage,
  ColorMatrix,
  Blur,
} from '@shopify/react-native-skia';

// ─── Filter Types ─────────────────────────────────────────────
type FilterId = 'none' | 'grayscale' | 'blur' | 'sepia';

interface Filter {
  id: FilterId;
  name: string;
  icon: string;
}

const FILTERS: Filter[] = [
  {id: 'none', name: 'Original', icon: '○'},
  {id: 'grayscale', name: 'Grayscale', icon: '◐'},
  {id: 'blur', name: 'Blur', icon: '◎'},
  {id: 'sepia', name: 'Sepia', icon: '◈'},
];

const PREVIEW_HEIGHT = 280;
const CANVAS_WIDTH = 340;

// skia filter matrix values
const GRAYSCALE_MATRIX = [
  0.21, 0.72, 0.07, 0, 0, 0.21, 0.72, 0.07, 0, 0, 0.21, 0.72, 0.07, 0, 0, 0, 0,
  0, 1, 0,
];
const SEPIA_MATRIX = [
  0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131, 0,
  0, 0, 0, 0, 1, 0,
];


interface ImageEditorProps {
  imageUri?: string | null;
}

// main component
const ImageEditor: React.FC<ImageEditorProps> = ({imageUri}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterId>('none');

  // Pre-load the image for Skia.
  // useImage returns null while loading, which is fine since we have a fallback Image.
  const skiaImage = useImage(imageUri || '');

  const handleFilterPress = (filter: FilterId) => {
    setSelectedFilter(filter);
  };

  // Calculate Skia image dimensions if available
  let skiaDimensions = null;
  if (skiaImage) {
    const imgW = skiaImage.width();
    const imgH = skiaImage.height();
    const scale = Math.min(CANVAS_WIDTH / imgW, PREVIEW_HEIGHT / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    skiaDimensions = {
      drawW,
      drawH,
      offsetX: (CANVAS_WIDTH - drawW) / 2,
      offsetY: (PREVIEW_HEIGHT - drawH) / 2,
    };
  }

  return (
    <View style={styles.container}>
      {/* ── Section Header ── */}
      <View style={styles.labelRow}>
        <Text style={styles.sectionLabel}>IMAGE EDITOR</Text>
        <View style={styles.badgeRow}>
          {imageUri && selectedFilter === 'none' && (
            <View style={styles.dimensionBadge}>
              <Text style={styles.dimensionText}>Original</Text>
            </View>
          )}
          {selectedFilter !== 'none' && (
            <View style={styles.filterActiveBadge}>
              <Text style={styles.filterActiveBadgeText}>
                {FILTERS.find(f => f.id === selectedFilter)?.name}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* ── Preview Card ── */}
      <View style={styles.previewCard}>
        {imageUri ? (
          <>
            {/* 
              Standard Image is the base. 
              Hiding it only when Skia is ready AND a filter is active.
            */}
            <Image
              source={{uri: imageUri}}
              style={[
                styles.image,
                selectedFilter !== 'none' &&
                  skiaImage && {opacity: 0, position: 'absolute'},
              ]}
              resizeMode="cover"
            />

            {/* 
              Skia Canvas for live filters. 
              Rendering it only when needed to avoid Hermes/JSI race conditions.
            */}
            {selectedFilter !== 'none' && skiaImage && skiaDimensions && (
              <View style={styles.skiaOverlay}>
                <Canvas style={styles.canvas}>
                  <SkiaImage
                    image={skiaImage}
                    x={skiaDimensions.offsetX}
                    y={skiaDimensions.offsetY}
                    width={skiaDimensions.drawW}
                    height={skiaDimensions.drawH}>
                    {selectedFilter === 'grayscale' && (
                      <ColorMatrix matrix={GRAYSCALE_MATRIX} />
                    )}
                    {selectedFilter === 'sepia' && (
                      <ColorMatrix matrix={SEPIA_MATRIX} />
                    )}
                    {selectedFilter === 'blur' && <Blur blur={6} />}
                  </SkiaImage>
                </Canvas>
              </View>
            )}
          </>
        ) : (
          <View style={styles.placeholder}>
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
          </View>
        )}
      </View>

      {/* ── Filter Controls ── */}
      <View style={styles.filterHeader}>
        <Text style={styles.filterLabel}>FILTERS</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {FILTERS.map(filter => {
          const isSelected = selectedFilter === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                isSelected && styles.filterChipSelected,
              ]}
              activeOpacity={0.7}
              onPress={() => handleFilterPress(filter.id)}>
              <View
                style={[
                  styles.filterIconContainer,
                  isSelected
                    ? filterActiveStyles[filter.id]
                    : styles.filterIconDefault,
                ]}>
                <Text
                  style={[
                    styles.filterIcon,
                    isSelected && styles.filterIconSelected,
                  ]}>
                  {filter.icon}
                </Text>
              </View>
              <Text
                style={[
                  styles.filterName,
                  isSelected && styles.filterNameSelected,
                ]}>
                {filter.name}
              </Text>
              {isSelected && <View style={styles.selectedIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const filterActiveStyles = StyleSheet.create({
  none: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.transparent,
  },
  grayscale: {
    backgroundColor: Colors.filterGrayscale,
    borderColor: Colors.transparent,
  },
  blur: {backgroundColor: Colors.filterBlur, borderColor: Colors.transparent},
  sepia: {backgroundColor: Colors.filterSepia, borderColor: Colors.transparent},
});

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
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  dimensionBadge: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Spacing.radiusSm,
  },
  dimensionText: {
    ...Typography.label,
    fontSize: 10,
    color: Colors.secondary,
  },
  filterActiveBadge: {
    backgroundColor: 'rgba(0, 212, 255, 0.15)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Spacing.radiusSm,
  },
  filterActiveBadgeText: {
    ...Typography.label,
    fontSize: 10,
    color: Colors.secondary,
  },
  previewCard: {
    borderRadius: Spacing.radiusXl,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    height: PREVIEW_HEIGHT,
    shadowColor: Colors.shadowColor,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    width: CANVAS_WIDTH,
    height: PREVIEW_HEIGHT,
  },
  skiaOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: PREVIEW_HEIGHT,
    borderRadius: Spacing.radiusXl,
  },
  placeholder: {
    height: PREVIEW_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: Spacing.radiusXl,
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
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
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
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  filterLabel: {
    ...Typography.label,
    flex: 1,
  },
  scrollContent: {
    gap: Spacing.md,
  },
  filterChip: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderRadius: Spacing.radiusLg,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 80,
  },
  filterChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.cardBackgroundLight,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  filterIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterIconDefault: {
    backgroundColor: Colors.surfaceElevated,
  },
  filterIcon: {
    fontSize: 20,
    color: Colors.textMuted,
  },
  filterIconSelected: {
    color: Colors.white,
  },
  filterName: {
    ...Typography.chipText,
  },
  filterNameSelected: {
    color: Colors.textPrimary,
  },
  selectedIndicator: {
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginTop: Spacing.sm,
  },
});

export default ImageEditor;
