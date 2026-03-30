import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../theme';

interface ProcessingStatusProps {
  isProcessing?: boolean;
  filterName?: string;
  processingTime?: number | null;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  isProcessing = false,
  filterName,
  processingTime,
}) => {
  if (!isProcessing && !processingTime) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {isProcessing ? (
          <View style={styles.processingRow}>
            <View style={styles.spinnerContainer}>
              <View style={styles.spinnerOuter}>
                <View style={styles.spinnerInner} />
              </View>
            </View>
            <View style={styles.processingText}>
              <Text style={styles.processingTitle}>Processing Image...</Text>
              <Text style={styles.processingSubtitle}>
                Applying {filterName || 'filter'} via native bridge
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.completeRow}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <View style={styles.completeText}>
              <Text style={styles.completeTitle}>Processing Complete</Text>
              <Text style={styles.completeSubtitle}>
                {filterName} applied in {processingTime}ms
              </Text>
            </View>
            <View style={styles.perfBadge}>
              <Text style={styles.perfValue}>{processingTime}ms</Text>
            </View>
          </View>
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
  card: {
    borderRadius: Spacing.radiusLg,
    backgroundColor: Colors.cardBackground,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  processingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinnerContainer: {
    marginRight: Spacing.md,
  },
  spinnerOuter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: Colors.border,
    borderTopColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  processingText: {
    flex: 1,
  },
  processingTitle: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },
  processingSubtitle: {
    ...Typography.caption,
    marginTop: 2,
  },
  completeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  checkMark: {
    fontSize: 18,
    color: Colors.success,
    fontWeight: '700',
  },
  completeText: {
    flex: 1,
  },
  completeTitle: {
    ...Typography.bodyBold,
    color: Colors.success,
  },
  completeSubtitle: {
    ...Typography.caption,
    marginTop: 2,
  },
  perfBadge: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.radiusSm,
  },
  perfValue: {
    ...Typography.captionBold,
    fontSize: 12,
    color: Colors.success,
  },
});

export default ProcessingStatus;
