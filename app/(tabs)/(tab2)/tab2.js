import { StyleSheet, Text, View } from 'react-native';

import {RPH, RPW} from '../../../modules/dimensions'
import { mainStyle } from '../../../styles/mainStyle';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Tab 2 !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainStyle.strongWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
