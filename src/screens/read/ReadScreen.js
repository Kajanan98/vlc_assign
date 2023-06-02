import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  KeyboardAvoidingView 
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  FontAwesome } from "@expo/vector-icons";

//svg
import ReadMessage from "../../assets/svg/readMessage"

//custom hooks
import useStyle from "../../hooks/useStyles";

export default function ReadScreen({ navigation }) {

  const styles = useStyle(customStyles);

  const onRead = () => {
    navigation.navigate("Reading");
  };

  return (
    <View style={styles.container}>
     
        <ReadMessage
          height={400}
          width ={'100%'}
        />
        <TouchableOpacity
          style={styles.readMessage} 
          onPress={onRead}             
        >      
          <Text style={styles.buttonText}>
              Read Message
          </Text>
          <FontAwesome name="book" size={24} color="white" style={styles.readButtonIcon} /> 
        </TouchableOpacity>
    </View>
  );
}

const customStyles = theme => ({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  },
  readMessage:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor:theme.colors.primary,
    flexDirection:'row',
    paddingHorizontal:60
  },
  buttonText:{
    color:'#ffffff',
    paddingRight:5
    }
});
