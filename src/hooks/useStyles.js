import React, { useContext} from 'react'
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeProvider';


const useStyle = (getStyles) => {

  const theme = useContext(ThemeContext);
  const styles = getStyles(theme);

  return StyleSheet.create(styles);

};

export default useStyle;
