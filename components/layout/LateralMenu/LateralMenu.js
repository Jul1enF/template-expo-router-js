import { StyleSheet, View, FlatList } from "react-native"
import Modal from "react-native-modal"
import { RPH, RPW, phoneDevice } from "utils/dimensions"
import LateralMenuItem from "./LateralMenuItem"
import { appStyle } from "styles/appStyle"

import { logout } from "reducers/user";
import { useDispatch } from "react-redux";


export default function LateralMenu({ menuVisible, setMenuVisible, screenHeight, screenWidth, modalOffsetTop, freeHeight, user }) {

    const dispatch = useDispatch()
    const logged = user.jwtToken ? true : false
    const logoutUser = () => dispatch(logout())

    const sectionsArray = [
        { sectionName: "Accueil", link: "/home" },
        { sectionName: "Accueil 2", link: "/(tabs)/(pages)" },
        { sectionName: logged ? "Se déconnecter" : "Se connecter / S'inscrire", link: logged ? "/home" : "/(tabs)/(pages)/login", func: logged ? logoutUser : null },
        { sectionName: "Tab 2", link: "/tab2" },
    ]
    // user.is_admin && sectionsArray.push({ sectionName: "Écrire / Modifier un article", link: "/redaction" })

    return (
        <Modal
            isVisible={menuVisible}
            style={styles.modal}
            backdropColor="transparent"
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            onBackButtonPress={() => setMenuVisible(!menuVisible)}
            onBackdropPress={() => setMenuVisible(!menuVisible)}
            deviceWidth={screenWidth}
            deviceHeight={screenHeight}
        >
            <View style={[styles.menu, { height: freeHeight, top: modalOffsetTop + 0.5 }]}>
                <FlatList
                    data={sectionsArray}
                    renderItem={({ item, index }) => {
                        return <LateralMenuItem {...item} setMenuVisible={setMenuVisible} index={index} key={index} />
                    }}
                    showsVerticalScrollIndicator={false}
                    style={{flex : 1}}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        margin: 0,
    },
    menu: {
        width: phoneDevice ? "85%" : "73.5%",
        backgroundColor: appStyle.lightGrey3,
        position: "absolute",
    },
})