import React, { Component , useState, useEffect, useContext} from 'react';
import { Text, Alert, Button, View, StyleSheet, 
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { AuthContext } from '../contexts/AuthProvider';


import Login from '../assets/svg/login';

import * as Animatable from 'react-native-animatable';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//custom hooks
import useStyles from "../hooks/useStyles"


export default function LoginScreen({navigation}) {

  const styles = useStyles(customStyles);


  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string()
    .required('Password is required')
    // .min(8, 'Password must be at least 8 characters long')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    //   'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    // ),
  });

  const {   setValue, register, handleSubmit,  formState: { errors }, getValues, reset } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        email: '',
        password: '',
      },
  });


  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [view, setView] = React.useState(false);
  
  const {isLoggedIn, login, logout} = useContext(AuthContext);





   const handleLoginPress = (data) => {
    console.log({ data });
    // Perform any necessary actions with the form data
    login(data)
  };
 

  return (
    <KeyboardAwareScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Login
            height="250"
            width="250"
            style={styles.logo}
          />
        </View>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              name = "email"
              autoCapitalize="none"
              onChangeText={(text) => setValue('email',  text )}
              label='UserName'
            />
          </View>
          { errors.email ?            
            <Text style={styles.errorMsg}>{errors.email?.message }</Text>
            :
            null
          }
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              name = "password"
              onChangeText={(text) => setValue('password',  text )}
              secureTextEntry={true}
            />
          </View>
          {   errors.password?.message ?
            <Text style={styles.errorMsg}>{errors.password?.message}</Text>
            :
            null
          }
          <TouchableOpacity style={styles.button} onPress={handleSubmit(handleLoginPress)}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <View style={styles.guideContainer}>
                        <Text >
                          Create New Account?
                          <Text 
                            onPress={() => navigation.navigate('SignUpScreen')}
                            allowFontScaling={false}
                            style={styles.guideText}
                          >
                            {`\u00A0`}
                            SignUp
                          </Text>
                            
                        </Text>
                      </View>
        </View>
      </View>
      </KeyboardAwareScrollView> 
    );
  };
  
  const customStyles = theme => ({
    scrollContainer:{
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 120,
      marginBottom:10,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius:60,
      resizeMode: 'contain',
  
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    card: {
      borderRadius: 10,
      backgroundColor: '#eee',
      margin: 10,
      padding: 15,
      width: '80%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      borderRadius: 10,
      backgroundColor: '#eee',
      margin: 10,
      padding: 15,
      width: '80%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    input: {
      fontSize: 16,
    },
    button: {
      marginTop: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      padding: 15,
      width: '80%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
    },
    errorMsg:{
      color: theme.colors.danger,
      fontSize: 14,
    },
    guideContainer:{
      marginTop:25,
      alignItems: 'center',
      justifyContent:'center',
      
    },
    guideText:{
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primary
    },
  });