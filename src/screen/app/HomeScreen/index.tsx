import {View, Text, TouchableOpacity, Pressable, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {useTheme} from '../../../utils/colors';
import {createStyles} from './styles';
import CardComponent from '../../../components/core/Card';
import {EntypoIcon, MaterialIcons} from '../../../utils/Icon';
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
import {useQuery} from 'react-query';
import {getLatestTransaction} from '../../../services/TransactionService';
import {getUserDetails} from '../../../services/AuthService';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PropsItem {
  id: string;
  date: Date;
  description: string;
  price: string;
  title: string;
  type: string;
  categoryId: {
    icon: string;
  };
}

interface RenderProductItemProps {
  item: PropsItem;
  index: number;
}

const HomeScreen = ({navigation}: any) => {
  const styles = createStyles();
  const {theme, isDark, setTheme} = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    data: latesTransaction = [],
    refetch,
    isLoading,
  } = useQuery(['LatestTransactionList'], getLatestTransaction);

  const {data: userData} = useQuery(['UserProfile'], getUserDetails, {
    enabled: true,
  });

  console.log('latest==>', latesTransaction);
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

  const FloatingButtonContent = useCallback(
    () => (
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
    ),
    [handlePress, plusIconStyle, handleButtonPress, isExpanded, styles],
  );

  const renderRecentTransaction = ({item, index}: RenderProductItemProps) => {
    return <RecentTransaction {...item} />;
  };

  const handleNavigation = () => {
    navigation.navigate('History');
  };

  const EmptyListComponent = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="receipt-long" size={64} color={theme.PURPLE} />
      <Text style={[styles.emptyText, {color: theme.TEXT}]}>
        No transactions found
      </Text>
    </View>
  );

  const firstName = userData?.fullName.split(' ')[0];

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, zIndex: 5}}>
        <BackgroundWrapper>
          <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.headTitle}>Kharcha</Text>
              <Text style={styles.headSubtitle}>Hello, {firstName}</Text>
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
            data={latesTransaction}
            renderItem={renderRecentTransaction}
            keyExtractor={(item: PropsItem) => String(item.id)}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            scrollEnabled={true}
            bounces={true}
            ListEmptyComponent={EmptyListComponent}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <View style={styles.transactionHeader}>
                <Text style={styles.transactionText}>Recent Transaction</Text>
                <TouchableOpacity onPress={handleNavigation}>
                  <Text style={[styles.transactionText, {fontSize: 12}]}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            }
            ListFooterComponent={<View style={{height: 150}} />}
            onRefresh={refetch}
            refreshing={isLoading}
          />
        </BackgroundWrapper>
      </View>
      <View style={styles.fabWrapper}>
        <FloatingButtonContent />
        {/* {FloatingButtonContent()} */}
      </View>
    </View>
  );
};

export default HomeScreen;
