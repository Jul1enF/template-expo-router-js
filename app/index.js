import { StatusBar } from 'expo-status-bar';
import { router} from 'expo-router'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {RPH, RPW} from '../modules/dimensions'
import { appStyle } from '../styles/appStyle';

export default function App() {
  return (
    <View style={styles.body}>
      <Text style={styles.pageTitle}>Index !</Text>
      <TouchableOpacity onPress={()=>router.push('/tab1')}>
        <Text>Go to Tabs</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: appStyle.strongWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize : appStyle.pageTitleSize,
  },
});
