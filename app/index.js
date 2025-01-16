import { StatusBar } from 'expo-status-bar';
import { router} from 'expo-router'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {RPH, RPW} from '../modules/dimensions'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Index !</Text>
      <TouchableOpacity onPress={()=>router.push('/tab1')}>
        <Text>Go to Tabs</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});