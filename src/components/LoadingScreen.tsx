import React, {useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const COLORS = {
  PRIMARY: '#723FEB',
  SECONDARY: '#9B6CFB',
  ACCENT: '#FF6B6B',
  BACKGROUND: '#FFFFFF',
  TEXT: '#1A1A1A',
  SHADOW: 'rgba(114, 63, 235, 0.5)',
  INPUT_BG: '#F8F9FE',
};

const LoadingScreen = () => {
  const pulseAnim = new Animated.Value(1);
  const slideAnim = new Animated.Value(-width);
  const spinAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    // Initial fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Subtle floating effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Enhanced pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Smoother shimmer effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: width,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Continuous rotation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.BACKGROUND,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundGradient: {
      position: 'absolute',
      width: width,
      height: height,
      opacity: 0.5,
      backgroundColor: COLORS.BACKGROUND,
    },
    shimmer: {
      position: 'absolute',
      backgroundColor: COLORS.SHADOW,
      width: width * 0.7,
      height: '100%',
      transform: [{skewX: '-20deg'}],
    },
    logoContainer: {
      alignItems: 'center',
      padding: 20,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      ...Platform.select({
        ios: {
          shadowColor: COLORS.PRIMARY,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.2,
          shadowRadius: 20,
        },
        android: {
          elevation: 8,
        },
      }),
    },
    logo: {
      fontSize: 48,
      fontWeight: 'bold',
      color: COLORS.PRIMARY,
      marginBottom: 10,
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: COLORS.TEXT,
      opacity: 0.8,
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: '500',
    },
    progressContainer: {
      alignItems: 'center',
      marginTop: 40,
    },
    progressBar: {
      width: width * 0.7,
      height: 6,
      backgroundColor: COLORS.INPUT_BG,
      borderRadius: 3,
      overflow: 'hidden',
    },
    customLoader: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 4,
      borderColor: COLORS.PRIMARY,
      borderTopColor: COLORS.SECONDARY,
      marginBottom: 30,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.BACKGROUND} barStyle="dark-content" />

      <View style={styles.backgroundGradient} />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              {scale: scaleAnim},
              {translateY: Animated.multiply(scaleAnim, -10)},
            ],
          },
        ]}>
        <Text style={styles.logo}>Kharcha</Text>
        <Text style={styles.subtitle}>Your Personal Finance Manager</Text>

        <ActivityIndicator size="large" color={COLORS.SHADOW} />

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.shimmer,
                {
                  transform: [{translateX: slideAnim}],
                },
              ]}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default LoadingScreen;
