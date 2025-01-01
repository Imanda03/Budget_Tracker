import {View, Text, TouchableOpacity, Pressable, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import Toast from '../../../components/core/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HomeScreen = ({navigation}: any) => {
  const styles = createStyles();
  const {theme, isDark, setTheme} = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      console.log('token ====>', await AsyncStorage.getItem('sessionJwt'));
    };

    fetch();
  }, []);

  const handlePress = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const plusIconStyle = useAnimatedStyle(() => {
    const rotateValue = withTiming(isExpanded ? '45deg' : '0deg');
    return {
      transform: [{rotate: rotateValue}],
    };
  });

  const handleButtonPress = useCallback(
    (index: number) => {
      const navigateName = index === 2 ? 'AddTransaction' : 'AddCategory';
      navigation.navigate('InnerScreen', {screen: navigateName});
      setIsExpanded(false);
    },
    [navigation],
  );

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
          buttonLetter="+"
          label="Transaction"
          onPress={() => handleButtonPress(2)}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={1}
          buttonLetter="+"
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
            ListFooterComponent={<View style={{height: 200}} />}
          />
        </BackgroundWrapper>
      </View>
      <View style={styles.fabWrapper}>
        <RenderFloatingButton />
      </View>
    </View>
  );
};

export default HomeScreen;
