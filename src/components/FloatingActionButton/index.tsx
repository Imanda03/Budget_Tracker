import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Pressable, Text, View} from 'react-native';
import {createStyles} from './styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG: any = {
  duration: 500,
  damping: 20,
  stiffness: 90,
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
    return {
      transform: [
        {
          translateY: withSpring(
            isExpanded ? -OFFSET * index : 0,
            // SPRING_CONFIG,
          ),
        },
        {
          scale: withTiming(isExpanded ? 1 : 0, {
            duration: 200,
          }),
        },
      ],
      opacity: withTiming(isExpanded ? 1 : 0, {
        duration: 200,
      }),
      position: 'absolute',
      right: 0,
      bottom: 0,
      zIndex: isExpanded ? index : -1,
      pointerEvents: isExpanded ? 'auto' : 'none',
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.shadow, styles.button, animatedStyles]}>
      <View style={styles.buttonInner}>
        <Text style={styles.content}>{buttonLetter}</Text>
        <Text style={styles.buttonLabel}>{label}</Text>
      </View>
    </AnimatedPressable>
  );
};
