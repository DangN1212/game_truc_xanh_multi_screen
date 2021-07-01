import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import {ROUTE} from '../constant';

export default function Hello({navigation}) {
  const [name, setName] = useState('');

  // const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.replace(ROUTE.HOME, {name: name});
  };

  const handleOnChange = value => {
    setName(value);
  };

  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    <KeyboardAvoidingView behavior={behavior} style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Text>Hello, please input your name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleOnChange}
          />

          <View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300
  },
  input: {
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    width: 150,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
    width: 150,
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'white'
  }
});
