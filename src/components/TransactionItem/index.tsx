import React, {useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useTheme} from '../../utils/colors';
import {createStyles} from './styles';
import {formatDateTime} from '../../utils/helper';
import {MaterialIcons} from '../../utils/Icon';
import {Transaction} from '../../utils/types';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import {deleteTransaction} from '../../services/TransactionService';
import {useToast} from '../../context/ToastContext';
import {useQueryClient} from 'react-query';

export const TransactionItem: React.FC<{transaction: Transaction}> = ({
  transaction,
}) => {
  const {theme} = useTheme();
  const styles = createStyles();
  const {showToast} = useToast();
  const swipeableRef = useRef<Swipeable>(null);
  const openSwipeable = useRef<Swipeable | null>(null);

  const queryClient = useQueryClient();

  const backgroundColor =
    transaction.type === 'income'
      ? 'rgba(76, 175, 80, 0.35)'
      : 'rgba(244, 67, 54, 0.35)';

  const textColor = transaction.type === 'income' ? theme.SUCCESS : theme.ERROR;

  const closeOtherSwipeables = () => {
    if (
      openSwipeable.current &&
      openSwipeable.current !== swipeableRef.current
    ) {
      openSwipeable.current.close();
    }
    openSwipeable.current = swipeableRef.current;
  };

  // Right action that animates based on progress
  function RightAction({progress}: {progress: Reanimated.SharedValue<number>}) {
    // Control translation from the right as the swipe progresses
    const animatedStyle = useAnimatedStyle(() => {
      // Use withTiming to smoothly animate values based on swipe progress
      const translateX = withTiming(
        interpolate(progress.value, [0, 1], [100, 0]),
        {duration: 30},
      );
      const opacity = interpolate(progress.value, [0, 1], [0, 1]);

      return {
        transform: [{translateX}],
        opacity,
      };
    });

    const handleDelete = () => {
      if (transaction.id) {
        Alert.alert(
          'Delete Category',
          `Are you sure you want to delete the transaction "${transaction.title}" ?`,
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                try {
                  await deleteTransaction(transaction.id);
                  showToast(
                    `${transaction.title} deleted successfully`,
                    'success',
                  );
                  await queryClient.invalidateQueries({
                    queryKey: ['TransactionList'],
                    exact: true,
                  });
                  await queryClient.invalidateQueries({
                    queryKey: ['LatestTransactionList'],
                    exact: true,
                  });
                  queryClient.invalidateQueries({
                    queryKey: ['Balance'],
                    exact: true,
                  });
                } catch (error) {
                  showToast('Failed to delete category', 'error');
                }
              },
            },
          ],
        );
      }
    };

    return (
      <Reanimated.View style={[styles.rightAction, animatedStyle]}>
        <TouchableOpacity onPress={handleDelete}>
          <MaterialIcons name="delete" size={28} color={theme.ERROR} />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </Reanimated.View>
    );
  }

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={progress => <RightAction progress={progress} />}
        onSwipeableOpen={closeOtherSwipeables}>
        <View style={[styles.container, {backgroundColor}]}>
          <View style={styles.leftContent}>
            <MaterialIcons
              name={
                transaction.type === 'income'
                  ? 'arrow-upward'
                  : 'arrow-downward'
              }
              size={24}
              color={textColor}
            />
            <View style={styles.details}>
              <Text style={[styles.category, {color: theme.TEXT}]}>
                {transaction.title}
              </Text>
              <Text style={[styles.description, {color: theme.TEXT}]}>
                {transaction.description}
              </Text>
            </View>
          </View>
          <View style={styles.rightContent}>
            <Text style={[styles.amount, {color: textColor}]}>
              {transaction.type === 'income' ? '+ ' : '- '}Rs.
              {transaction.price}
            </Text>
            <View style={styles.categoryContainer}>
              <Text
                style={[
                  styles.description,
                  {color: theme.TEXT, fontWeight: '500', fontSize: 12},
                ]}>
                {transaction.categoryId.title}
              </Text>
              <MaterialIcons name="category" size={12} color={textColor} />
            </View>
            <Text style={[styles.date, {color: theme.TEXT}]}>
              {formatDateTime(transaction.date)}
            </Text>
          </View>
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};
