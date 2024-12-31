import React, {useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {AntDesignIcon} from '../utils/Icon';

const {width} = Dimensions.get('window');

const COLORS = {
  PURPLE: '#723FEB',
  BACKGROUND: '#FCFCFC',
  TEXT: '#1A1A1A',
  SHADOW: 'rgba(223, 220, 220, 0.2)',
  INPUT_BG: '#F5F5F5',
  CARD_SHADOW: '#2f0f7a',
};

const LoadingScreen = () => {
  const pulseAnim = new Animated.Value(1);
  const slideAnim = new Animated.Value(-width);
  const spinAnim = new Animated.Value(0);

  useEffect(() => {
    const animations = [
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(slideAnim, {
            toValue: width,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: -width,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ),
    ];

    animations.forEach(anim => anim.start());
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
    shimmer: {
      position: 'absolute',
      backgroundColor: COLORS.SHADOW,
      width: width * 0.7,
      height: '100%',
      transform: [{skewX: '-20deg'}],
    },
    logoContainer: {
      alignItems: 'center',
    },
    logo: {
      fontSize: 48,
      fontWeight: 'bold',
      color: COLORS.PURPLE,
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 16,
      color: COLORS.TEXT,
      opacity: 0.7,
      marginBottom: 30,
    },
    progressBar: {
      width: width * 0.7,
      height: 4,
      backgroundColor: COLORS.INPUT_BG,
      borderRadius: 2,
      marginTop: 40,
      overflow: 'hidden',
    },
    loadingIcon: {
      marginBottom: 30,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.logoContainer, {transform: [{scale: pulseAnim}]}]}>
        <Text style={styles.logo}>Kharcha</Text>
        <Text style={styles.subtitle}>Your Personal Finance Manager</Text>
      </Animated.View>

      <Animated.View style={{transform: [{rotate: spin}]}}>
        <ActivityIndicator size="large" />
      </Animated.View>

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
  );
};

export default LoadingScreen;
