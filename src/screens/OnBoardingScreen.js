import React from 'react'
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity
} from 'react-native';

import { MaterialIcons } from "@expo/vector-icons";
import OnBoarding from '../assets/svg/onBoarding';

import useStyle from '../hooks/useStyles';

const OnboardingScreen = ({navigation}) => {

  const styles = useStyle(customStyles);

  return (
    <SafeAreaView
      style={styles.container}>
      <View style={{marginTop: 20}}>
        <Text
          style={styles.appName}>
          VLC
        </Text>
      </View>
     
      <View style={{flex: 1, justifyContent: 'center'}}>
        <OnBoarding
          height={350}
          fill = {'black'}
        />  
      </View>
      <View style={{alignItems:'center'}}>
      <TouchableOpacity
        style={styles.navigateButton}
        onPress={() => navigation.navigate("LoginScreen")}>
        <Text
          style={styles.navigateText}>
          Let's Begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const customStyles = (theme) => ({
  container:{
    flex: 1,
    justifyContent:'center',
    
  },
  appName:{
    fontWeight: 'bold',
    fontSize: 30,
    color:  theme.colors.primary,
    textAlign:'center',
    paddingTop:50
    
  },
  navigateText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  navigateButton:{
    backgroundColor:  theme.colors.primary,
    padding: 20,
    width: '90%',
    borderRadius: 10,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})