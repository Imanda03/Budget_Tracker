import {StyleSheet} from 'react-native';
import {useTheme} from '../../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();
  return StyleSheet.create({
    headerContainer: {
      position: 'relative',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: '-5%',
      padding: 10,
      marginBottom: 15,
      borderBottomEndRadius: 50,
      borderBottomLeftRadius: 50,
      shadowColor: theme.INNER_SHADOw,
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 1,
      flexDirection: 'row',
      height: '15%',
    },
    avatarContainer: {
      alignItems: 'center',
      marginTop: '-35%',
      height: '20%',
    },
    logout: {
      position: 'absolute',
      right: 10,
      top: 15,
    },
  });
};
