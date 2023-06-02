import React, { Component , useState, useEffect, useContext} from 'react';
import { Text, Alert, Button, View, StyleSheet, 
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../contexts/AuthProvider';


import Login from '../assets/svg/login';

import * as Animatable from 'react-native-animatable';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//custom hooks
import useStyles from "../hooks/useStyles"


export default function LoginScreen({navigation}) {

  const styles = useStyles(loginStyles);


  const schema = yup.object().shape({
    username: yup.string().required('User Name is required'),
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
        username: '', 
        password: '', 
      },
  });


  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [view, setView] = React.useState(false);
  
  const {isLoggedIn, login, logout} = useContext(AuthContext);



  useEffect(() => {
     const keyboardDidShowListener = Keyboard.addListener(
       'keyboardDidShow',
       () => {
         setKeyboardVisible(true); // or some other action
       }
     );
     const keyboardDidHideListener = Keyboard.addListener(
       'keyboardDidHide',
       () => {
         setKeyboardVisible(false); // or some other action
       }
     );
 
     return () => {
       keyboardDidHideListener.remove();
       keyboardDidShowListener.remove();
     };
   }, []);

   const onSubmitHandler = (data) => {
    console.log({ data });
    // Perform any necessary actions with the form data
    login()
  };
 

    return (
          
            <View style={styles.container}>
              
              <KeyboardAvoidingView style={styles.content}  behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.subContainer}>
                    {/* <View>
                      <TouchableOpacity onPress={() => navigation.navigate("OnboardingScreen")} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color='#24a0ed' />
                      </TouchableOpacity>
                    </View> */}
                    { !isKeyboardVisible ? 
                      <Login
                        height={300}
                       
                      />
                    :
                      <Text style={styles.logoText}>Login</Text>
                    }
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Username"
                        placeholderTextColor="#666666"
                        name = "username"
                        autoCapitalize="none"
                        onChangeText={(text) => setValue('username',  text )}
                        label='UserName'
                        style={styles.input}
                      />
                    </View>
                    { errors.username ?  
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{errors.username?.message }</Text>
                      </Animatable.View>
                        :
                      null
                    }

                    <View style={styles.inputContainer}>
                  
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#666666"
                        label="Password"
                        secureTextEntry={!view}
                        style={styles.input}
                        autoCapitalize="none"
                        name = "password"
                        onChangeText={(text) => setValue('password',  text )}
                      />
                      <TouchableOpacity onPress={() => setView(!view)} style={styles.eyeIconContainer}>
                          { !view ? (
                          <Feather name="eye-off" color="grey" size={20} />
                          ) : (
                          <Feather name="eye" color="grey" size={20} />
                          )}
                      </TouchableOpacity>
                    </View>
                    {   errors.password?.message ?

                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{errors.password?.message}</Text>
                      </Animatable.View>
                        :
                        null
                    }
                      
                    <TouchableOpacity 
                      style={styles.loginButton}
                      onPress={handleSubmit(onSubmitHandler)}
                    >
                      <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.guideContainer}>
                      <Text >
                        Create New Account?
                        <Text 
                          onPress={() => navigation.navigate('RegisterScreen')}
                          allowFontScaling={false}
                          style={styles.guideText}
                        >
                          {`\u00A0`}
                          SignUp
                        </Text>
                          
                      </Text>
                    </View>
                   
                  </View> 
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </View>

        
     
    )
  
}

const loginStyles = (theme) =>({
  container: {
    
    flex:1,
    justifyContent: 'center',
    // backgroundColor: "#eaeaea",
    // abackgroundColor: '#00FFFF',
  },
  content:{
    
  },
  backButton:{
   
    color:theme.colors.primary,
  },
  input: {
    height: 50,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    padding: 10,
    
  },
  subContainer:{
    margin:25,
    marginTop: 5
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
    alignItems:'center',
    color: theme.colors.primary
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    height: 50,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000000',
    paddingLeft: 10,
  },
  eyeIconContainer: {
    paddingRight: 10,
  },
  errorMsg:{
    color: theme.colors.danger,
    fontSize: 14,
  }

})