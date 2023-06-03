import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useStyle from '../hooks/useStyles';

const Message = ({message}) => {
    const styles = useStyle(customStyles)
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Message</Text>
      <View style={styles.horizontalRule} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const customStyles = theme => ({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal:20,
    marginTop:10
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    padding: 10,
    backgroundColor: theme.colors.primary,
    minHeight:200,
    textAlignVertical: 'center',
    color:'white'
  },
  horizontalRule: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 16,

  },
});

export default Message;
