import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, StatusBar } from "react-native";
import { redirectToStores } from "utils/redirectToStores"

import { LinearGradient } from "expo-linear-gradient";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Modal from "react-native-modal"

import LateralMenu from "./LateralMenu/LateralMenu";

import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import useLayoutSpaces from "hooks/useLayoutSpaces"
import { logout } from "reducers/user";
import { router } from "expo-router";
import { RPH, RPW, phoneDevice } from "utils/dimensions"
import { appStyle } from "styles/appStyle";



export default function Header(props) {

    const [menuVisible, setMenuVisible] = useState(false)
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()



    // Hook for the height of the screen (for tablets orientation changes), the height available and detection of android insetTop to use as offset

    const { modalOffsetTop, statusBarOffset, freeHeight, screenHeight, screenWidth } = useLayoutSpaces()



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
            router.navigate('/(tabs)/(pages)/')
        }}>
            <Text style={styles.link}>Se connecter / S'inscrire</Text>
        </TouchableOpacity>
    }


        return (
            <View>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="light" />
                <LinearGradient style={[styles.header, { height: appStyle.headerHeight + statusBarOffset, paddingTop: statusBarOffset }]}
                    colors={[appStyle.strongRed, appStyle.strongBlack]}
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
                    deviceWidth={screenWidth}
                    deviceHeight={screenHeight}
                >
                    <LinearGradient style={[styles.searchContainer, { top: modalOffsetTop + 0.5 }]}
                        colors={[appStyle.strongRed, appStyle.strongBlack]}
                        locations={[0, 0.9]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                    >
                        <View style={styles.searchInputContainer}>
                            <TextInput
                                style={[styles.search, { color: appStyle.darkWhite }]}
                                placeholder="Rechercher..."
                                onChangeText={(e) => setSearchText(e)}
                                value={searchText}
                                returnKeyType="send"
                                placeholderTextColor={appStyle.placeholderColor}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onSubmitEditing={() => submitSearch()}
                            ></TextInput>
                            <FontAwesome6 name="magnifying-glass" style={styles.icon} size={phoneDevice ? RPW(4.5) : 25} onPress={() => submitSearch()} />
                        </View>
                        <FontAwesome6 name="chevron-up" style={styles.icon} size={phoneDevice ? RPW(6) : 28} onPress={() => setSearchVisible(!searchVisible)} />

                    </LinearGradient>
                </Modal>


                <LateralMenu menuVisible={menuVisible} setMenuVisible={setMenuVisible} screenHeight={screenHeight} screenWidth={screenWidth} modalOffsetTop={modalOffsetTop} freeHeight={freeHeight} user={user} />



                <Modal
                    isVisible={props.appObsolete}
                    style={styles.modal}
                    deviceWidth={screenWidth}
                    deviceHeight={screenHeight}
                    statusBarTranslucent={true}
                    backdropColor="transparent"
                    animationIn="slideInLeft"
                    animationOut="slideOutLeft"
                >
                    <View style={{ width: "100%", height: freeHeight, top: modalOffsetTop + 0.5, backgroundColor: appStyle.darkWhite, paddingTop: appStyle.pagePaddingTop }}>
                        <Text style={{ ...appStyle.pageSubtitle, textAlign: "center" }}>
                            Version de l'application obsolète
                        </Text>
                        <Text style={{ ...appStyle.regularText, marginTop: phoneDevice ? RPW(5) : 20, textAlign: "center", lineHeight: phoneDevice ? RPW(6) : 40 }}>
                            Mettez à jour votre application pour continuer à utiliser Sport Amat !
                        </Text>
                        <TouchableOpacity style={{ width: "auto", alignSelf: "center", borderBottomWidth: 2, borderBottomColor: appStyle.strongBlack }} onPress={() => redirectToStores()}>
                            <Text style={[styles.obsoleteText, { fontWeight: "600" }]}>
                                Mettre à jour
                            </Text>
                        </TouchableOpacity>
                    </View>

                </Modal>


            </View>
        )
    }


const styles = StyleSheet.create({
    header: {
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
        fontSize: phoneDevice ? RPW(8) : 55,
        color: appStyle.darkWhite,
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
        color: appStyle.darkWhite,
    },
    headerLigne: {
        borderBottomColor: appStyle.lightGrey,
        borderBottomWidth: phoneDevice ? 0.5 : 1,
    },
    searchContainer: {
        position: "absolute",
        height: phoneDevice ? RPW(12) : 68,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: phoneDevice ? RPW(4) : 30,
        paddingRight: phoneDevice ? RPW(4) : 30,
    },
    searchInputContainer: {
        borderBottomColor: appStyle.darkWhite,
        borderBottomWidth: phoneDevice ? 0.5 : 1,
        width: "50%",
        paddingBottom: phoneDevice ? RPW(2) : 8,
        paddingRight: phoneDevice ? RPW(1) : 8,
        marginTop: phoneDevice ? RPW(1) : 4,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    search: {
        ...appStyle.regularText,
        width: "90%",
    },
    modal: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        margin: 0,
    },
    obsoleteText: {
        ...appStyle.regularText,
        marginTop: phoneDevice ? RPW(5) : 20,
        textAlign: "center",
        lineHeight: phoneDevice ? RPW(6) : 40,
        width: "auto"
    }
})