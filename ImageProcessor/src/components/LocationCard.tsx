import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../theme';
import {useLocation} from '../hooks/locationHook';

const LocationCard = () => {
  const {cityCountry, imageTitle, loading} = useLocation();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>LOCATION & LANGUAGE</Text>

      <View style={styles.card}>
        <View style={styles.cardInner}>
          {/* Location Name Row */}
          <View style={styles.infoRow}>
            <View style={styles.iconCircleLocation}>
              <Text style={styles.icon}>🏙️</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location Name</Text>
              <Text style={styles.infoValue}>
                {loading ? 'Fetching...' : cityCountry}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Native Language Row */}
          <View style={styles.infoRow}>
            <View style={styles.iconCircleSecondary}>
              <Text style={styles.icon}>🌐</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Image Title (Native Language)
              </Text>
              <Text style={styles.nativeTitle}>
                {loading
                  ? 'Loading...'
                  : imageTitle || 'Select an image to see title'}
              </Text>
            </View>
          </View>
        </View>

        {/* Decorative Corner */}
        <View style={styles.cornerAccent} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    ...Typography.label,
    marginBottom: Spacing.md,
  },
  card: {
    borderRadius: Spacing.radiusXl,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    shadowColor: Colors.shadowColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  cardInner: {
    padding: Spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircleSecondary: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  icon: {
    fontSize: 18,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    ...Typography.caption,
    marginBottom: 2,
  },
  infoValue: {
    ...Typography.bodyBold,
  },
  nativeTitle: {
    ...Typography.bodyBold,
    color: Colors.secondary,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.md,
  },
  iconCircleLocation: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 193, 68, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  cornerAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
    borderBottomLeftRadius: 60,
    backgroundColor: 'rgba(124, 106, 255, 0.06)',
  },
});

export default LocationCard;
