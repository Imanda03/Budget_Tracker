import {StyleSheet} from 'react-native';
import {useTheme} from '../../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: theme.CARD_SHADOW,
      borderWidth: 1,
      marginHorizontal: '-3%',
      padding: 10,
      borderBlockColor: theme.BORDER_COLOR,
      borderRadius: 20,
    },
    totalPriceContainer: {
      marginVertical: 20,
      marginHorizontal: 10,
      flexDirection: 'column',
      gap: 2,
    },
    totalPrice: {
      color: theme.SECONDARY,
      fontSize: 20,
      fontWeight: '400',
      letterSpacing: 2,
    },
    totalContent: {
      color: theme.SECONDARY,
      fontSize: 24,
      fontWeight: '600',
      letterSpacing: 2,
    },
    balanceCardsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 15,
    },
    balanceCard: {
      flex: 1,
      backgroundColor: `${theme.BACKGROUND}30`,
      borderRadius: 20,
      padding: 15,
    },
    cardTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    cardIcon: {
      marginRight: 8,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardTitleText: {
      fontSize: 14,
      color: theme.SECONDARY,
      fontWeight: '500',
    },
    cardAmount: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.SECONDARY,
    },
  });
};
