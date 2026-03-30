import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../theme';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          <View style={styles.logoDot} />
          <View style={styles.logoDotSmall} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ImageProcessor</Text>
          <Text style={styles.subtitle}>High-Performance Native Engine</Text>
        </View>
      </View>
      <View style={styles.statusBar}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>Native Bridge Active</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>v1.0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: Spacing.radiusMd,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  logoDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.white,
  },
  logoDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    position: 'absolute',
    top: 8,
    right: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...Typography.title,
  },
  subtitle: {
    ...Typography.caption,
    marginTop: 2,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.radiusRound,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: Spacing.sm,
    shadowColor: Colors.success,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    flex: 1,
  },
  statusBadge: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Spacing.radiusSm,
  },
  statusBadgeText: {
    ...Typography.label,
    fontSize: 10,
    color: Colors.primary,
  },
});

export default Header;
