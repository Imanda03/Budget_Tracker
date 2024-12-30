import {Dimensions, StyleSheet} from 'react-native';
import {useTheme} from '../../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();
  const {width} = Dimensions.get('window');

  return StyleSheet.create({
    headerContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: '-5%',
      padding: 10,
      marginBottom: 15,
      borderBottomEndRadius: 20,
      borderBottomLeftRadius: 20,
      shadowColor: theme.INNER_SHADOw,
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 40,
      elevation: 5,
      flexDirection: 'row',
    },
    textContainer: {
      flexDirection: 'column',
    },
    headTitle: {
      fontSize: 20,
      fontWeight: '700',
      letterSpacing: 1.5,
      color: theme.TEXT,
    },
    headSubtitle: {
      fontSize: 14,
      color: theme.TEXT,
      marginBottom: 10,
      fontWeight: '400',
    },

    buttonContainer: {
      bottom: '140%',
      right: width * 0.01,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 50,
    },

    mainButton: {
      height: 56,
      width: 56,
      borderRadius: 100,
      backgroundColor: theme.CARD_SHADOW,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    mainButtonContent: {
      fontSize: 24,
      color: theme.SECONDARY,
    },
    shadow: {
      shadowColor: '#171717',
      shadowOffset: {width: -0.5, height: 3.5},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    transactionHeader: {
      flexDirection: 'row',
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
      opacity: 0.7,
      paddingHorizontal: 10,
      paddingRight: 10,
      marginHorizontal: '-2%',
      zIndex: 1,
      backgroundColor: theme.BACKGROUND,
      borderRadius: 10,
      marginTop: '-1.5%',
    },
    transactionText: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.TEXT,
    },
    fabWrapper: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      zIndex: 999,
    },
    flatList: {
      backgroundColor: theme.BACKGROUND_LIGHT,
      marginHorizontal: -10,
      padding: 5,
      marginVertical: 20,
      borderRadius: 20,
    },
  });
};
