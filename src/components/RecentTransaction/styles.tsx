import {StyleSheet} from 'react-native';
import {useTheme} from '../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();
  return StyleSheet.create({
    container: {
      marginTop: '-5%',
      flex: 1,
      //   backgroundColor: theme.BACKGROUND_LIGHT,
      padding: 10,
      //   borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    avatar: {
      backgroundColor: 'green',
      height: 50,
      width: 50,
    },
    icon: {
      color: 'white',
    },
    secondContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    titleContainer: {
      flexDirection: 'column',
      gap: 5,
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 18,
      color: theme.TEXT,
      fontWeight: '700',
    },
    bottomText: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: -0.1,
      color: theme.TEXT,
    },
    price: {
      fontSize: 16,
      fontWeight: '700',
    },
  });
};
