import {View, Text} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {createStyles} from './styles';
import {useTheme} from '../../../utils/colors';
import {EntypoIcon} from '../../../utils/Icon';

const CardComponent = () => {
  const styles = createStyles();
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPrice}>Total Balance</Text>
        <Text style={styles.totalContent}>Rs. 1000</Text>
      </View>
      <View style={styles.balanceCardsContainer}>
        <View style={styles.balanceCard}>
          <View style={styles.cardTitle}>
            <View style={styles.cardIcon}>
              <EntypoIcon
                name="arrow-with-circle-up"
                size={20}
                color={theme.SUCCESS}
              />
            </View>
            <Text style={styles.cardTitleText}>Income</Text>
          </View>
          <Text style={[styles.cardAmount, {color: theme.SUCCESS}]}>
            Rs. 2000
          </Text>
        </View>
        <View style={styles.balanceCard}>
          <View style={styles.cardTitle}>
            <View style={styles.cardIcon}>
              <EntypoIcon
                name="arrow-with-circle-down"
                size={20}
                color={theme.ERROR}
              />
            </View>
            <Text style={styles.cardTitleText}>Expenses</Text>
          </View>
          <Text style={[styles.cardAmount, {color: theme.ERROR}]}>
            Rs. 1000
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardComponent;
