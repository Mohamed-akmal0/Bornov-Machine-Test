import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Colors, Spacing, Typography} from '../theme';

type FilterId = 'grayscale' | 'blur' | 'sepia' | 'invert' | 'brightness' | 'contrast';

interface Filter {
  id: FilterId;
  name: string;
  icon: string;
}

const FILTERS: Filter[] = [
  {id: 'grayscale', name: 'Grayscale', icon: '◐'},
  {id: 'blur', name: 'Blur', icon: '◎'},
  {id: 'sepia', name: 'Sepia', icon: '◈'},
  {id: 'invert', name: 'Invert', icon: '◆'},
  {id: 'brightness', name: 'Bright', icon: '☀'},
  {id: 'contrast', name: 'Contrast', icon: '◑'},
];

interface FilterSelectorProps {
  selectedFilter?: string | null;
}

const FilterSelector: React.FC<FilterSelectorProps> = ({selectedFilter}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.sectionLabel}>FILTERS</Text>
        <Text style={styles.engineLabel}>⚡ Native Engine</Text>
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
              activeOpacity={0.7}>
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

// Pre-built per-filter active background styles (avoids inline styling)
const filterActiveStyles = StyleSheet.create({
  grayscale: {
    backgroundColor: Colors.filterGrayscale,
    borderColor: Colors.transparent,
  },
  blur: {
    backgroundColor: Colors.filterBlur,
    borderColor: Colors.transparent,
  },
  sepia: {
    backgroundColor: Colors.filterSepia,
    borderColor: Colors.transparent,
  },
  invert: {
    backgroundColor: Colors.filterInvert,
    borderColor: Colors.transparent,
  },
  brightness: {
    backgroundColor: Colors.filterBrightness,
    borderColor: Colors.transparent,
  },
  contrast: {
    backgroundColor: Colors.filterContrast,
    borderColor: Colors.transparent,
  },
});

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  sectionLabel: {
    ...Typography.label,
    flex: 1,
  },
  engineLabel: {
    ...Typography.label,
    fontSize: 10,
    color: Colors.warning,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
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

export default FilterSelector;
