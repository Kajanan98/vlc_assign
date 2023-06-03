import React from "react";
import { 
  Text, 
  View, 
  TouchableOpacity 
} from "react-native";
import { useEffect, useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import useStyle from "../../hooks/useStyles";
import Message from "../../components/Message";

export default function ShowMessage({ message, onBack, reMount }) {

  const styles = useStyle(customStyles)
  return (
    <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button} 
              onPress={onBack} 
                    
            >  
              <Ionicons
                name={ "arrow-back" }
                size={20}
                color={"white"}
                style={styles.messageIcon}
              />    
              <Text style={styles.buttonText}>
                Back
                
              </Text>
              
            </TouchableOpacity>
          </View>
          
          <Message 
            message={message}
          />
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button} 
              onPress={() => reMount()} 
                    
            >      
              <Text style={styles.buttonText}>
                Retry
                
              </Text>
              <Ionicons
                name={ "refresh" }
                size={20}
                color={"white"}
                style={styles.messageIcon}
              />
          </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

const customStyles = theme =>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer:{
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor:theme.colors.primary,
    paddingHorizontal:60,
    maxWidth:300,
    margin:10,
    marginTop:30
    
  },
  buttonText:{
    color:'#ffffff',
    paddingRight:5,
    fontWeight:'800'
  },
  messageIcon:{
    
  }
});
