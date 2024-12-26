import {View, Text, TouchableOpacity, Pressable, FlatList} from 'react-native';
import React from 'react';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {useTheme} from '../../../utils/colors';
import {createStyles} from './styles';
import CardComponent from '../../../components/core/Card';
import {EntypoIcon} from '../../../utils/Icon';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {FloatingActionButton} from '../../../components/FloatingActionButton';
import RecentTransaction from '../../../components/RecentTransaction';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HomeScreen = () => {
  const styles = createStyles();
  const {theme, isDark, setTheme} = useTheme();

  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);
    const rotateValue = isExpanded.value ? '45deg' : '0deg';

    return {
      transform: [
        {translateX: translateValue},
        {rotate: withTiming(rotateValue)},
      ],
    };
  });

  const handleButtonPress = (index: number) => {
    console.log(`Button ${index} pressed`);
  };

  const RenderFloatingButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <AnimatedPressable
          onPress={handlePress}
          style={[styles.shadow, styles.mainButton]}>
          <Animated.Text style={[plusIconStyle, styles.mainButtonContent]}>
            +
          </Animated.Text>
        </AnimatedPressable>
        <FloatingActionButton
          isExpanded={isExpanded}
          index={2}
          buttonLetter={'+'}
          label="Add Transaction"
          onPress={() => handleButtonPress(2)}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={1}
          buttonLetter={'+'}
          label="Category"
          onPress={() => handleButtonPress(1)}
        />
      </View>
    );
  };

  const renderRecentTransaction = () => {
    return <RecentTransaction />;
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, zIndex: 5}}>
        <BackgroundWrapper>
          <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.headTitle}>Kharcha</Text>
              <Text style={styles.headSubtitle}>Hello, Anish</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
              }>
              <EntypoIcon
                name={isDark ? 'light-up' : 'light-down'}
                size={isDark ? 28 : 34}
                color={theme.TEXT}
              />
            </TouchableOpacity>
          </View>
          <CardComponent />

          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8.9, 10, 11]}
            renderItem={renderRecentTransaction}
            keyExtractor={index => String(index)}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            scrollEnabled={true}
            bounces={true}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <View style={styles.transactionHeader}>
                <Text style={styles.transactionText}>Recent Transaction</Text>
                <TouchableOpacity>
                  <Text style={[styles.transactionText, {fontSize: 12}]}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            }
            ListFooterComponent={<View style={{height: 400}} />}
          />
        </BackgroundWrapper>
      </View>
      <View style={styles.fabWrapper}>{RenderFloatingButton()}</View>
    </View>
  );
};

export default HomeScreen;
