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
          <Text style={styles.title}>Bronov</Text>
          <Text style={styles.subtitle}>High-Performance Image Processor</Text>
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
});

export default Header;
