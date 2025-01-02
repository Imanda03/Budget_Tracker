import {View, Text} from 'react-native';
import React from 'react';
import {createStyles} from './styles';
import {Avatar} from 'react-native-elements';
import {useTheme} from '../../utils/colors';
import {formatDateTime, ICONS} from '../../utils/helper';
import {EntypoIcon} from '../../utils/Icon';

interface PropsData {
  date: Date;
  description: string;
  price: string;
  title: string;
  type: string;
  categoryId: {
    icon: string;
  };
}

const RecentTransaction = (data: PropsData) => {
  const selectedIcon =
    ICONS.find(i => i.value === data.categoryId.icon)?.name || '❓';
  const styles = createStyles();
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View
          style={[styles.iconContainer, {backgroundColor: theme.DARK_TEXT}]}>
          <Text style={{fontSize: 28}}>{selectedIcon}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>{data.title}</Text>
          <Text style={styles.bottomText}>{formatDateTime(data.date)}</Text>
        </View>
      </View>
      <View>
        <Text
          style={[
            styles.price,
            {color: data.type === 'income' ? theme.SUCCESS : theme.PRICE_ERROR},
          ]}>
          <EntypoIcon
            name={data.type === 'income' ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={data.type === 'income' ? theme.SUCCESS : theme.PRICE_ERROR}
          />{' '}
          Rs.{data.price}
        </Text>
      </View>
    </View>
  );
};

export default RecentTransaction;
