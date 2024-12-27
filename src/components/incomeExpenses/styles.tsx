import {StyleSheet} from 'react-native';
import {useTheme} from '../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
  });
};
