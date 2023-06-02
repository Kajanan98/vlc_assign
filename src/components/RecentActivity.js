import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

//custom hooks
import useStyle from '../hooks/useStyles';

const activityData = [
  {
    id: '1',
    description: 'Messaged "Hi"',
    time: "28/08/2019 10:12:60",
  },
  {
    id: '2',
    description: 'Added "Bruce Wayne" to friends List',
    time: '28/08/2019 10:12:60',
  },
  {
    id: '3',
    description: 'Added "Bruce Wayne" to friends List',
    time:'28/08/2019 10:12:60',
  },
  {
    id: '4',
    description: 'Added "Bruce Wayne" to friends List',
    time: '28/08/2019 10:12:60',
  },
  {
    id: '5',
    description: 'Added "Bruce Wayne" to friends List',
    time: '28/08/2019 10:12:60',
  },
 
  {
    id: '8',
    description: 'Received a message "Hi"',
    time:'28/08/2019 10:12:60',
  },
 
  
  // Add more activity objects as needed
];

const RecentActivity = () => {

  const styles = useStyle(customStyles)

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityContent}>
        <Text style={styles.activityDescription}>{item.description}</Text>
        <Text style={styles.activityTimestamp}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Recent Activity</Text>
        <View style={styles.horizontalRule} />
        {activityData.map((item) => (
            <View key={item.id} style={styles.activityItem}>
              <View style={styles.activityContent}>
                <Text style={styles.activityDescription}>{item.description}</Text>
                <Text style={styles.activityTimestamp}>28/08/2019 10:12:60</Text>
              </View>
            </View>
          ))}
      </View>
    </View>
  );
};

const customStyles = theme => ({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    elevation: 3,
    padding: 16,
    borderRadius: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
    backgroundColor: theme.colors.primary,
    padding:8,
    borderRadius:5
    
  },
  horizontalRule: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 16,
  },
  activityItem: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  activityDescription: {
    fontSize: 16,
    marginBottom: 4,
  },
  activityTimestamp: {
    fontSize: 12,
    color: '#888888',
  },
  listContainer: {
    flexGrow: 1,
  },
});

export default RecentActivity;
