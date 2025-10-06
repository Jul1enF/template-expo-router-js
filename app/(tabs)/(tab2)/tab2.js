import { StyleSheet, Text, View } from 'react-native';

import {RPH, RPW} from '../../../utils/dimensions'
import { appStyle } from '../../../styles/appStyle';

export default function App() {
  return (
    <View style={styles.body}>
      <Text style={styles.pageTitle}>Tab 2 !</Text>
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
