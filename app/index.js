import { StatusBar } from 'expo-status-bar';
import { router} from 'expo-router'
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';

import {RPH, RPW} from 'utils/dimensions'
import { appStyle } from 'styles/appStyle';

export default function App() {
  return (
    <View style={styles.body}>
      <Text style={styles.pageTitle}>Index !</Text>
      <TouchableOpacity onPress={()=>router.push('/tab1')} style={[appStyle.button, appStyle.regularItem, appStyle.lightGreyBorder]}>
        <Text>Go to Tabs</Text>
      </TouchableOpacity>
      <TextInput style={[appStyle.largeItem, appStyle.input, appStyle.regularText, {backgroundColor : appStyle.blueLink}]} ></TextInput>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: appStyle.darkWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    ...appStyle.pageTitle,
  },
});
