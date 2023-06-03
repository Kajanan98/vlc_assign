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

import * as Animatable from 'react-native-animatable';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//contexts
import { AuthContext } from '../contexts/AuthProvider';

//custom hooks
import useStyle from '../hooks/useStyles';


export default function RegisterScreen({navigation}) {

  const styles = useStyle(registerStyles);

  const [view, setView] = useState(false);

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

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <KeyboardAwareScrollView style={styles.content}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.subContainer}>
              <Text style={styles.logoText}>Register</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#666666"
                  name="email"
                  onChangeText={(text) => setValue("email", text)}
                  label="email"
                  style={styles.input}
                />
              </View>
              {errors.email ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{errors.email?.message}</Text>
                </Animatable.View>
              ) : null}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor="#666666"
                  name="firstName"
                  onChangeText={(text) => setValue("firstName", text)}
                  label="First Name"
                  style={styles.input}
                />
              </View>
              {errors.firstName ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    {errors.firstName?.message}
                  </Text>
                </Animatable.View>
              ) : null}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor="#666666"
                  name="lastName"
                  label="Last Name"
                  onChangeText={(text) => setValue("lastName", text)}
                  style={styles.input}
                />
              </View>
              {errors.lastName ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    {errors.lastName?.message}
                  </Text>
                </Animatable.View>
              ) : null}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#666666"
                  label="Password"
                  name="password"
                  onChangeText={(text) => setValue("password", text)}
                  secureTextEntry={!view}
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={() => setView(!view)}
                  style={styles.eyeIconContainer}
                >
                  {!view ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    {errors.password?.message}
                  </Text>
                </Animatable.View>
              ) : null}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#666666"
                  label="Confirm Password"
                  secureTextEntry={!view}
                  style={styles.input}
                  onChangeText={(text) => setValue("confirmPassword", text)}
                />
                <TouchableOpacity
                  onPress={() => setView(!view)}
                  style={styles.eyeIconContainer}
                >
                  {!view ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.confirmPassword ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    {errors.confirmPassword?.message}
                  </Text>
                </Animatable.View>
              ) : null}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit(onSubmitHandler)}
              >
                <Text style={styles.buttonText}> SignUp </Text>
              </TouchableOpacity>
              <View style={styles.guideContainer}>
                <Text>
                  Already have an Account?
                  <Text
                    onPress={() => navigation.navigate("LoginScreen")}
                    allowFontScaling={false}
                    style={styles.guideText}
                  >
                    {`\u00A0`}
                    SignIn
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </View>
  );
  
}

const registerStyles = (theme)=>({
  container: {
    
    flex:1,
    justifyContent: 'center',
    marginTop:20
    
  },
  content:{
   
  },
  backButton:{
    color:theme.colors.primary
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
    marginTop: 5,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
   
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
    // borderBottomWidth: 1,
    // borderBottomColor: '#666666',
    
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