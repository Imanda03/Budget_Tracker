import {StyleSheet} from 'react-native';
import {useTheme} from '../../../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      //   padding: 16,
    },
  });
};
