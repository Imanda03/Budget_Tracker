import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../utils/colors';
import {Transaction} from '../../data/mockDate';
import {createStyles} from './styles';

export const TransactionItem: React.FC<{transaction: Transaction}> = ({
  transaction,
}) => {
  const {theme} = useTheme();
  const styles = createStyles();

  const backgroundColor =
    transaction.type === 'income'
      ? 'rgba(76, 175, 80, 0.2)'
      : 'rgba(244, 67, 54, 0.2)';

  const textColor = transaction.type === 'income' ? theme.SUCCESS : theme.ERROR;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.leftContent}>
        <Icon
          name={
            transaction.type === 'income' ? 'arrow-downward' : 'arrow-upward'
          }
          size={24}
          color={textColor}
        />
        <View style={styles.details}>
          <Text style={[styles.category, {color: theme.TEXT}]}>
            {transaction.category}
          </Text>
          <Text style={[styles.description, {color: theme.TEXT}]}>
            {transaction.description}
          </Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <Text style={[styles.amount, {color: textColor}]}>
          {transaction.type === 'income' ? '+' : '-'}Rs.{transaction.amount}
        </Text>
        <Text style={[styles.date, {color: theme.TEXT}]}>
          {new Date(transaction.date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};
