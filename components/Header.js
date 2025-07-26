import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, StatusBar } from "react-native";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Modal from "react-native-modal"

import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { router } from "expo-router";
import { RPH, RPW, phoneDevice } from "../modules/dimensions"
import { appStyle } from "../styles/appStyle";


const statusHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0

export default function Header() {

    const [menuVisible, setMenuVisible] = useState(false)
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const url = process.env.EXPO_PUBLIC_BACK_ADDRESS




    // Listener de la hauteur de l'écran pour taille du menu (quand changement d'orientation tablette)
    const { height: screenHeight } = useSafeAreaFrame()
    const menuHeight = screenHeight - appStyle.headerHeight - appStyle.tabBarHeight

    const statusBarOffset = Platform.OS === 'android' ? useSafeAreaInsets().top : 0
    const menuOffsetTop = appStyle.headerHeight - statusBarOffset



    // États pour l'affichage et l'enregistrement de la recherche

    const [searchVisible, setSearchVisible] = useState(false)
    const [searchText, setSearchText] = useState('')


    // Fonction appelée en cliquant sur Se déconnecter

    const logoutPress = async () => {

        // Reducer logout, fermeture du menu et push vers page d'accueil
        setMenuVisible(false)
        dispatch(logout())
        router.navigate('/')
    }



    // Fonction appelée en soumettant une recherche

    const submitSearch = () => {
        router.push(`/searches/${searchText}`)
        setSearchText('')
        setSearchVisible(false)
    }


    // Affichage conditionnel de la page paramètres ou d'un renvoie vers la page de connexion

    let informationsOrConnexion

    if (user.jwtToken) {
        informationsOrConnexion = <TouchableOpacity style={styles.linkContainer} activeOpacity={0.6} onPress={() => {
            setMenuVisible(false)
            router.navigate('/settings')
        }}>
            <Text style={styles.link}>Settings</Text>
        </TouchableOpacity>
    }
    else {
        informationsOrConnexion = <TouchableOpacity style={styles.linkContainer} activeOpacity={0.6} onPress={() => {
            setMenuVisible(false)
            router.navigate('/')
        }}>
            <Text style={styles.link}>Se connecter / S'inscrire</Text>
        </TouchableOpacity>
    }


    return (
        <View style={styles.body} >
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="light" />
            <LinearGradient style={styles.header}
                colors={[appStyle.gradientRed, appStyle.gardientBlack]}
                locations={[0, 0.75]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            >
                <View style={styles.menuIconContainer}>
                    <FontAwesome name="navicon" style={styles.icon} size={phoneDevice ? RPW(7) : 38} onPress={() => setMenuVisible(!menuVisible)} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        APP NAME
                    </Text>
                </View>
                <View style={styles.searchIconContainer}>
                    <FontAwesome6 name="magnifying-glass" style={styles.icon} size={phoneDevice ? RPW(6.5) : 38} onPress={() => setSearchVisible(!searchVisible)} />
                </View>
            </LinearGradient>
            <View style={styles.headerLigne}></View>


            <Modal
                isVisible={searchVisible}
                style={styles.modal}
                backdropColor="transparent"
                animationIn="fadeInDown"
                animationOut="fadeOutUp"
                onBackButtonPress={() => setSearchVisible(!searchVisible)}
                onBackdropPress={() => setSearchVisible(!searchVisible)}
            >
                <LinearGradient style={styles.searchContainer}
                    colors={[appStyle.gradientRed, appStyle.gardientBlack]}
                    locations={[0, 0.9]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                >
                    <View style={styles.searchInputContainer}>
                        <TextInput
                            style={styles.search}
                            placeholder="Rechercher..."
                            onChangeText={(e) => setSearchText(e)}
                            value={searchText}
                            returnKeyType="send"
                            placeholderTextColor={appStyle.placeholderColor}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing={() => submitSearch()}
                        ></TextInput>
                        <FontAwesome6 name="magnifying-glass" style={styles.icon} size={phoneDevice ? RPH(1.9) : 25} onPress={() => submitSearch()} />
                    </View>
                    <FontAwesome6 name="chevron-up" style={styles.icon} size={phoneDevice ? RPH(2.8) : 28} onPress={() => setSearchVisible(!searchVisible)} />

                </LinearGradient>
            </Modal>


            <Modal
                isVisible={menuVisible}
                style={styles.modal}
                backdropColor="transparent"
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                onBackButtonPress={() => setMenuVisible(!menuVisible)}
                onBackdropPress={() => setMenuVisible(!menuVisible)}
            >
                <View style={[styles.modalBody, { height: menuHeight, top : menuOffsetTop }]}>
                    {/* <TouchableOpacity style={styles.linkContainer} activeOpacity={0.6} onPress={() => {
                        setMenuVisible(false)
                        router.navigate('/home')
                    }}>
                        <Text style={styles.link}>Accueil</Text>
                    </TouchableOpacity> */}
                    {informationsOrConnexion}
                    {user.is_admin &&
                        <TouchableOpacity activeOpacity={0.6} style={styles.linkContainer} onPress={() => {
                            setMenuVisible(false)
                            router.push('/redaction')
                        }}>
                            <Text style={styles.link}>Écrire / Modifier un article</Text>
                        </TouchableOpacity>
                    }
                    {/* {user.is_admin &&
                        <TouchableOpacity activeOpacity={0.6} style={styles.linkContainer} onPress={() => {
                            setMenuVisible(false)
                            router.push('/notifications')
                        }}>
                            <Text style={styles.link}>Notifications</Text>
                        </TouchableOpacity>
                    } */}
                    {user.token && <TouchableOpacity activeOpacity={0.6} style={styles.linkContainer} onPress={() => logoutPress()}>
                        <Text style={styles.link}>Se déconnecter</Text>
                    </TouchableOpacity>}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        height: appStyle.headerHeight,
        width: "100%",
    },
    header: {
        flex: 1,
        paddingTop: phoneDevice ? RPH(4) - (statusHeight / 2) : 30,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    menuIconContainer: {
        width: "15%",
        height: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: phoneDevice ? RPW(4) : 30,
    },
    titleContainer: {
        width: "70%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: phoneDevice ? RPW(9.3) : 55,
        color: appStyle.strongWhite,
        letterSpacing: phoneDevice ? 1.5 : 4,
        fontWeight: "600",
    },
    searchIconContainer: {
        width: "15%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: phoneDevice ? RPW(4) : 30,
    },
    icon: {
        color: appStyle.strongWhite,
    },
    headerLigne: {
        borderBottomColor: appStyle.lightGrey,
        borderBottomWidth: phoneDevice ? RPH(0.2) : 1,
    },
    searchContainer: {
        position: "absolute",
        top: appStyle.headerHeight - statusHeight,
        height: phoneDevice ? RPH(6) : 68,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: phoneDevice ? RPW(4) : 30,
        paddingRight: phoneDevice ? RPW(4) : 30,
    },
    searchInputContainer: {
        borderBottomColor: appStyle.strongWhite,
        borderBottomWidth: phoneDevice ? 0.5 : 1,
        width: "50%",
        paddingBottom: phoneDevice ? RPH(1) : 8,
        paddingRight: phoneDevice ? RPW(1) : 8,
        marginTop: phoneDevice ? RPH(0.5) : 4,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    search: {
        color: appStyle.strongWhite,
        fontSize: phoneDevice ? RPH(2.3) : 26,
        fontWeight: "500",
        width: "90%",
    },
    modal: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        margin: 0,
    },
    modalBody: {
        width: "80%",
        backgroundColor: appStyle.lightGrey,
        position: "absolute",
    },
    linkContainer: {
        height: phoneDevice ? RPH(11.5) : 120,
        borderTopWidth: 0.5,
        borderTopColor: "#19290a",
        justifyContent: "center",
        alignItems: "center",
    },
    link: {
        color: "#19290a",
        fontSize: phoneDevice ? RPW(6.3) : 40,
        fontWeight: "300"
    },
})