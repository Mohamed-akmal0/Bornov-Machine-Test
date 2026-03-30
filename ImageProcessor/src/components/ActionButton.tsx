import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Spacing, Typography} from '../theme';

interface ActionButtonProps {
  title: string;
  subtitle?: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  onPress?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  subtitle,
  icon,
  variant = 'primary',
  disabled = false,
  onPress,
}) => {
  const buttonStyles = [
    styles.button,
    variant === 'secondary' && styles.buttonSecondary,
    variant === 'outline' && styles.buttonOutline,
    disabled && styles.buttonDisabled,
  ];

  const textStyles = [
    styles.buttonText,
    variant === 'outline' && styles.buttonTextOutline,
    disabled && styles.buttonTextDisabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}>
      <View style={styles.buttonContent}>
        {icon && <Text style={styles.buttonIcon}>{icon}</Text>}
        <View style={styles.buttonTextContainer}>
          <Text style={textStyles}>{title}</Text>
          {subtitle && (
            <Text style={styles.buttonSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {variant === 'primary' && !disabled && (
        <View style={styles.buttonShine} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Spacing.radiusLg,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    backgroundColor: Colors.primary,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonSecondary: {
    backgroundColor: Colors.cardBackgroundLight,
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  buttonOutline: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonDisabled: {
    backgroundColor: Colors.surfaceElevated,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  buttonTextContainer: {
    alignItems: 'center',
  },
  buttonText: {
    ...Typography.buttonText,
  },
  buttonTextOutline: {
    color: Colors.textSecondary,
  },
  buttonTextDisabled: {
    color: Colors.textMuted,
  },
  buttonSubtitle: {
    ...Typography.caption,
    fontSize: 11,
    marginTop: 2,
    color: 'rgba(255,255,255,0.6)',
  },
  buttonShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderTopLeftRadius: Spacing.radiusLg,
    borderTopRightRadius: Spacing.radiusLg,
  },
});

export default ActionButton;
