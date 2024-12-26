import {StyleSheet} from 'react-native';
import {useTheme} from '../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    shadow: {
      shadowColor: '#171717',
      shadowOffset: {width: -0.5, height: 3.5},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    button: {
      width: 160,
      height: 45,
      backgroundColor: theme.DARK_BG,
      position: 'absolute',
      borderRadius: 12,
      justifyContent: 'center',
      flexDirection: 'row',
      transform: [{rotate: '-3deg'}],
      borderWidth: 1,
      borderColor: `${theme.DARK_TEXT}30`,
    },
    buttonInner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      gap: 8,
    },
    content: {
      color: theme.DARK_TEXT,
      fontWeight: '600',
      fontSize: 18,
    },
    buttonLabel: {
      color: theme.DARK_TEXT,
      fontSize: 14,
      fontWeight: '500',
    },
  });
};
