import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Button from 'components/ui/Button';
import ConfirmationModal from 'components/ui/ConfirmationModal';
import HorizontalMenu from 'components/layout/HorizontalMenu';
import { useState, useEffect } from 'react';

import { RPH, RPW } from 'utils/dimensions'
import { appStyle } from 'styles/appStyle';

export default function Tab1Page() {
  const [modalVisible, setModalVisible] = useState(false)
  const [sectionsArray, setSectionsArray] = useState([
    { sectionName: "Accueil", link: "/home" },
    { sectionName: "Tab 1 Test", link: "/tab1" },
    { sectionName: "Accueil 2", link: "/(tabs)/(pages)" },
    { sectionName: "Test 2", link: "/tab1" },
    { sectionName: "Se connecter / S'inscrire", link: "/(tabs)/(pages)/login", func: () => console.log("FUNC !") },
    { sectionName: "Tab 1", link: "/tab1" },
    { sectionName: "Tab 2", link: "/tab2" },
  ])
 
  const [selectedSection, setSelectedSection] = useState(sectionsArray[0])

  return (
    <>
      <HorizontalMenu data={sectionsArray} name={"sectionName"} chosenItem={selectedSection} setChosenItem={setSelectedSection} />
      <View style={styles.body}>
        <Text style={styles.pageTitle}>Tab 1 !</Text>

        <Button func={() => setModalVisible(!modalVisible)} text={"Button 1"} itemStyle={appStyle.largeItem} border={appStyle.lightGreyBorder} color={appStyle.strongBlack} />

        <Button func={() => setModalVisible(!modalVisible)} text={"Button 2"} />

          {articles}

        <ConfirmationModal
          visible={modalVisible}
          closeModal={() => setModalVisible(false)}
          confirmationText="Êtes vous sûr de vouloir supprimer votre compte ?"
          confirmationBtnText="Effacer mon profil"
          cancelBtnText="Annuler"
          confirmationFunc={() => console.log("HELLO !")}
          warningText={""}
        />
      </View>
    </>
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
