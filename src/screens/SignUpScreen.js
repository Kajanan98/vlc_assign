import React, {  useState, useEffect, useContext} from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Login from "../assets/svg/signup"

//contexts
import { AuthContext } from '../contexts/AuthProvider';

//custom hooks
import useStyle from '../hooks/useStyles';


export default function SignUpScreen({navigation}) {




  const { signup } = useContext(AuthContext);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
    signup(data);
  };

  const styles = useStyle(customStyles)

  return (
    <KeyboardAwareScrollView style={styles.body}>
  <View style={styles.container}>
    <View style={styles.subContainer}>
      
      <View style={styles.card}>
      <Login
          height="250"
          width="250"
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          
          <TextInput
            style={styles.input}
            name = "email"
            onChangeText={(text) => setValue('email',  text )}
            label='UserName'
            placeholder="User Name"
          />
         
        </View>
        { errors.username ?           
            <Text style={styles.errorMsg}>{errors.username?.message }</Text>
            :
            null
          }
        <View style={styles.inputContainer}>
          
          <TextInput
            style={styles.input}
            placeholder="FirstName"
            name = "fullName"
            onChangeText={(text) => setValue('firstName',  text )}
            label='Full Name'
           
          />
          
        </View>
        { errors.firstName ?           
            <Text style={styles.errorMsg}>{errors.firstName?.message }</Text>
            :
            null
          }

<View style={styles.inputContainer}>
          
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            name = "lastName"
            onChangeText={(text) => setValue('lastName',  text )}
            label='last Name'
           
          />
          
        </View>
        { errors.firstName ?           
            <Text style={styles.errorMsg}>{errors.firstName?.message }</Text>
            :
            null
          }
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            name = "password"
            onChangeText={(text) => setValue('password',  text )}
            label="Password"
            secureTextEntry={true}
          />
          
        </View>
        { errors.password ?           
            <Text style={styles.errorMsg}>{errors.password?.message }</Text>
            :
            null
          }
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            name = "confirmPassword"
            onChangeText={(text) => setValue('confirmPassword',  text )}
            label="Confirm Password"
            secureTextEntry={true}
          />
          
        </View>
        { errors.confirmPassword ?           
            <Text style={styles.errorMsg}>{errors.confirmPassword?.message }</Text>
            :
            null
          }
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmitHandler)}>
          <Text style={styles.buttonText}> Register </Text>
        </TouchableOpacity>
        <View style={styles.guideContainer}>
                      <Text >
                        Already have an Account?
                        <Text 
                          onPress={() => navigation.navigate('LoginScreen')}
                          allowFontScaling={false}
                          style={styles.guideText}
                        >
                          {`\u00A0`}
                          LogIn
                        </Text>
                          
                      </Text>
                    </View>
      </View>
    </View>
    </View> 
    </KeyboardAwareScrollView>
  );
};

const customStyles = theme => ({
  container: {
    flex: 1,
    justifyContent:'center',
  
    
    
  },
  body:{
    backgroundColor: theme.colors.background,
  },
  subContainer:{
    alignItems:'center'
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
    marginTop:30,
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

