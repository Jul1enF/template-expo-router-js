import { StyleSheet, Text, View } from 'react-native';

import Button from 'components/ui/Button';
import ConfirmationModal from 'components/ui/ConfirmationModal';
import { useState } from 'react';

import { RPH, RPW } from 'utils/dimensions'
import { appStyle } from 'styles/appStyle';

export default function Tab1Page() {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.body}>
      <Text style={styles.pageTitle}>Tab 1 !</Text>
      <Button func={() => setModalVisible(!modalVisible)} text={"Button"} itemStyle={appStyle.largeItem} border={appStyle.lightGreyBorder} color={appStyle.strongBlack} />

      <ConfirmationModal
        visible={modalVisible}
        closeModal={()=>setModalVisible(false)}
        confirmationText="Êtes vous sûr de vouloir supprimer votre compte ?"
        confirmationBtnText="Effacer mon profil"
        cancelBtnText="Annuler"
        confirmationFunc={()=> console.log("HELLO !")}
        warningText={""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    ...appStyle.pageBody,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    ...appStyle.pageTitle,
  },
});
