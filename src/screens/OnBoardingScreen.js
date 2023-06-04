import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import useStyle from '../hooks/useStyles';


const WelcomeScreen = ({navigation}) => {

  const styles = useStyle(customStyles);
  return (
    <View style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>Welcome to LightChat!</Text>
            <Image source={{uri:'https://bootdey.com/img/Content/avatar/avatar3.png'}} style={styles.image} />
            <Text style={styles.desc}>{'Please log in to continue'}</Text>
        </View>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity 
                style={[styles.button, styles.login]}
                onPress={()=> navigation.navigate('LoginScreen')}
            >
                <Text style={styles.buttonText}>Login </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, styles.signUp]}
                onPress={()=> navigation.navigate('SignUpScreen')}
            >
                <Text style={styles.signUpText}>SignUp</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const customStyles = theme => ({
    container: {
        flex: 1,
        justifyContent:'center',
        backgroundColor: '#fff',
    },
    content :{
        alignItems:'center',
        
    },
    title:{
        fontSize:24,
        color:theme.colors.primary,
        fontWeight:'bold',
    },
    image:{
        width:120,
        height:120,
        borderRadius:60,
        marginTop:39,
    },
    desc:{
        fontSize:18,
        textAlign:'center',
        marginTop:30,
        color:'#808080'
    },
    buttonsContainer:{
        marginHorizontal:30,
        marginTop:50,
        alignItems:'center',
        justifyContent:'center'
    },
    button:{
        width: '70%',
        height:50,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        margin:10
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
    },
    login:{
        backgroundColor: theme.colors.primary,
    },
    signUp:{
        
        color: theme.colors.primary,
        borderColor:theme.colors.primary,
        borderWidth: 2
    },
    signUpText:{
        color: theme.colors.primary,
        fontWeight:'bold',
    }
});

export default WelcomeScreen;