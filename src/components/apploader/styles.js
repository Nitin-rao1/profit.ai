import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  FONT_SIZE_XXS,
  STANDARD_BADGE_PILL_WIDTH,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
 mainview:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0,0,0,0.3)"
 }
});
