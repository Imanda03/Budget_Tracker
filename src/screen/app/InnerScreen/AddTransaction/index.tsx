import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useCallback} from 'react';
import BackgroundWrapper from '../../../../components/BackgroundWrapper';
import AuthHeader from '../../../../components/core/AuthHeader';
import {SceneMap, TabView} from 'react-native-tab-view';
import {IoniconsIcon} from '../../../../utils/Icon';
import {createStyles} from './styles';
import {useTheme} from '../../../../utils/colors';
import IncomeExpenses from '../../../../components/incomeExpenses';

const routes = [
  {key: 'expenses', title: 'Expenses', icon: 'arrow-down-circle'},
  {key: 'income', title: 'Income', icon: 'arrow-up-circle'},
];

const AddTransaction = () => {
  const styles = createStyles();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const {theme} = useTheme();

  // Create memoized render functions for each tab
  const renderExpenses = useCallback(
    () => <IncomeExpenses type="expense" />,
    [],
  );

  const renderIncome = useCallback(() => <IncomeExpenses type="income" />, []);

  // Use the memoized render functions in SceneMap
  const renderScene = SceneMap({
    expenses: renderExpenses,
    income: renderIncome,
  });

  const renderTabBar = (props: {
    navigationState: {routes: any[]};
    position: {interpolate: (arg0: {inputRange: any; outputRange: any}) => any};
  }) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          const scale = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1.1 : 1,
            ),
          });

          const backgroundColor = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? '#777d75' : 'transparent',
            ),
          });

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.View
                style={[
                  styles.tabItemBackground,
                  {backgroundColor, transform: [{scale}]},
                ]}
              />
              <IoniconsIcon name={route.icon} size={24} color={theme.TEXT} />
              <Animated.Text style={[styles.tabItemText, {opacity}]}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <BackgroundWrapper>
      <AuthHeader title="Add Transaction" />
      <View style={styles.container}>
        <TabView
          navigationState={{index, routes}}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
    </BackgroundWrapper>
  );
};

export default AddTransaction;
