import { Text, View, Button, TextInput, ScrollView,StyleSheet,useWindowDimensions } from "react-native";
import React from "react";
import {MaterialIcons} from '@expo/vector-icons';

import { TouchableOpacity } from "react-native-gesture-handler";

//custom hooks
import useStyle from "../hooks/useStyles";

export default function SearchBar({placeholder,id,setId}) {

  const width = useWindowDimensions().width * 0.75;

  const styles = useStyle(customStyles);

    return (

    <View style={styles.container}>
        {/* <View style={styles.iconContainer}>
        <AntDesign name="arrowleft" size={24} color="black" />
        </View> */}
        <View style={styles.inputContainer}>
        
          <TextInput
            style={[styles.input,{width:width}]}
            onChangeText={setId}
            value={id}
            placeholder={placeholder}
        //   keyboardType="numeric"
          />

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={()=>{
            }}>
            <MaterialIcons name='search'  size={24} style={styles.icon}/>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>


    );
  }

  const customStyles =  theme => ({
    input: {
      borderWidth:1,
      borderTopLeftRadius:30,
      borderBottomLeftRadius:30,
      padding:10,
      backgroundColor:'white',
      justifyContent:'space-between',
      borderColor:theme.colors.primary,
      height:35
    
    },
    icon:{ 
      color: 'white',
    
    },
    container:{
        backgroundColor:theme.colors.primary,
        height:65,

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        
    },
    iconContainer:{
        alignItems:'center',
        justifyContent:'center',
        paddingRight:10,
        paddingLeft:10,
        backgroundColor:theme.colors.primary,
        borderBottomRightRadius:30,
        borderTopRightRadius:30
    },
    inputContainer:{
        borderWidth:2,
       
        borderColor:'white',
        flexDirection:'row',
        borderRadius:30,
        backgroundColor:'white'
    }
  })