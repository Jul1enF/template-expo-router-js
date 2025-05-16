import { StyleSheet, Text, View } from 'react-native';

import {RPH, RPW} from '../../../modules/dimensions'
import { mainStyle } from '../../../styles/mainStyle';

export default function App() {
  return (
    <View style={styles.body}>
      <Text style={styles.pageTitle}>Tab 1 !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: mainStyle.strongWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize : mainStyle.pageTitleSize,
  },
});
