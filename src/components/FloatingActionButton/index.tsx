import Animated, {
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {createStyles} from './styles';
import {Pressable, Text, View} from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

export const FloatingActionButton = ({
  isExpanded,
  index,
  buttonLetter,
  label,
  onPress,
}: any) => {
  const styles = createStyles();
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 100;
    const scaleValue = isExpanded.value ? 1 : 0;
    return {
      transform: [
        {translateY: translateValue},
        {scale: withDelay(delay, withTiming(scaleValue))},
      ],
    };
  });

  const handlePress = () => {
    if (isExpanded.value) {
      if (onPress) onPress();
    }
  };

  return (
    <AnimatedPressable
      style={[animatedStyles, styles.shadow, styles.button]}
      onPress={handlePress}>
      <View style={styles.buttonInner}>
        <Animated.Text style={styles.content}>{buttonLetter}</Animated.Text>
        <Text style={styles.buttonLabel}>{label}</Text>
      </View>
    </AnimatedPressable>
  );
};
