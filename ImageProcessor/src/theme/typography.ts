import {StyleSheet, Platform} from 'react-native';
import Colors from './colors';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
});

const Typography = StyleSheet.create({
  heroTitle: {
    fontFamily,
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  title: {
    fontFamily,
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily,
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  body: {
    fontFamily,
    fontSize: 15,
    fontWeight: '400',
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  bodyBold: {
    fontFamily,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  caption: {
    fontFamily,
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textMuted,
    letterSpacing: 0.2,
  },
  captionBold: {
    fontFamily,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  label: {
    fontFamily,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  buttonText: {
    fontFamily,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  chipText: {
    fontFamily,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});

export default Typography;
