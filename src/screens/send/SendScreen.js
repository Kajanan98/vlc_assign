import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useEffect, useState } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";

//svg
import SendMessage from "../../assets/svg/ReadBackground"
// import SendMessage from "../../assets/svg/sentMessage"

//custom hooks
import useStyle from "../../hooks/useStyles";


export default function SendScreen({ navigation }) {

  const styles = useStyle(customStyles);

  const [message, setMessage] = useState("");

  const onSend = () => {
    navigation.navigate("Sending", { message });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <SendMessage style={styles.background} />
        <View style={styles.content}>

          
          <View style={styles.buttonContainer}>
          

          <TextInput
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline={true}
            style={styles.inputMessage}
          />
         
            <TouchableOpacity
              style={styles.readMessage} 
              onPress={onSend} 
              disabled = {!message}            
            >      
              <Text style={styles.buttonText}>
                  Send
                
              </Text>
              <FontAwesome
                name={ "send" }
                size={20}
                color={"white"}
                style={styles.messageIcon}
              />
            </TouchableOpacity>
          
          </View>
          

        </View>
        
      </View>
    </View>
  );
};

const customStyles = theme => ({
  container: {
    marginTop:50,
    
  },
  backgroundContainer: {
    position: "relative",

  },
  background: {
    flex: 2,
    
  },
  content:{
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'30%'
  },
  text: {
    
    
    fontSize: 24,
    color: "red",
    fontWeight: "bold",
  },
  inputMessage:{
    height: 45,
    fontSize: 14,
    
    borderWidth: 1,
    borderColor: theme.colors.primary, //"#eaeaea",
    backgroundColor: "#fafafa",
    borderTopLeftRadius: 5, 
    borderBottomLeftRadius: 5,
   
    marginRight:0,
    paddingLeft: 15,
    width:'60%'
  },
  readMessage:{
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5, 
    borderBottomRightRadius: 5,
    backgroundColor:theme.colors.primary,
    
    width:"20%",
    
  },
  buttonText:{
    color:'#ffffff',
    paddingRight:5
  },
  buttonContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


