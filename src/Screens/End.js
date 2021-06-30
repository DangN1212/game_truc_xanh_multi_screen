import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ROUTE} from '../constant';
export default function End({route, navigation}) {
  // const route = useRoute({navigation});
  // const navigation = useNavigation();
  const handleBack = () => navigation.navigate(ROUTE.HELLO);

  return (
    <View style={styles.container}>
      <Text>Hi {route.params.name}</Text>
      <Text>You {route.params.status.toLowerCase()}</Text>
      <TouchableOpacity onPress={handleBack} style={styles.button}>
        <Text style={styles.text}>Back to first page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'white'
  },
  text: {
    color: 'white'
  }
});
