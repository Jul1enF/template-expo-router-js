import { Text, TouchableOpacity, FlatList, View, StyleSheet } from "react-native";
import { RPH, RPW, phoneDevice } from "utils/dimensions"
import { appStyle } from "styles/appStyle"
import { router } from "expo-router";

export default function HorizontalMenu({ data, menuBelow, func, name, chosenItem, setChosenItem }) {

    // REGARDER L'ENREGISTREMENT DE CATÉROGIE POUR REVENIR À LA PRÉCÉDENTE SÉLECTIONNÉE



    const Item = (props) => {
        const itemSelected = name ? props[name] === chosenItem[name] : props.name === chosenItem.name

        const itemPress = () => {
            setChosenItem(props)
            typeof func === "function" && func()
            if (props.func && typeof props.func === "function") props.func()
            props.link && router.navigate(props.link)
        }

        return (
            <TouchableOpacity style={[styles.itemBtn, itemSelected ? styles.selectedItemBtn : styles.unselectedItemBtn]} onPress={itemPress}>
                <Text style={[styles.itemText, itemSelected ? styles.selectedItemText : styles.unselectedItemText]}>
                    {name ? props[name] : props.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
            style={[styles.flatlist, !menuBelow && styles.flatlistBorderBottom]}
            renderItem={({ item, index }) => {
                return <Item {...item} index={index} />
            }}
        />
    )
}

const styles = StyleSheet.create({
    flatlist: {
        minHeight: appStyle.secondHeaderHeight,
        maxHeight: appStyle.secondHeaderHeight,
        minWidth: RPW(100),
        backgroundColor: appStyle.pageBody.backgroundColor
    },
    flatlistBorderBottom: {
        borderBottomColor: appStyle.lightGrey,
        borderBottomWidth: phoneDevice ? 0.5 : 1.5
    },
    itemBtn: {
        marginLeft: phoneDevice ? RPW(3.5) : 34,
        minHeight: "100%",
        justifyContent: "center"
    },
    unselectedItemBtn: {
        paddingLeft : phoneDevice ? RPW(0.25) : 2,
        paddingRight : phoneDevice ? RPW(0.25) : 2,
    },
    selectedItemBtn: {
        borderBottomColor: appStyle.strongBlack,
        borderBottomWidth: phoneDevice ? 5 : 7,
        paddingTop : phoneDevice ? 5 : 7,
    },
    itemText: {
        color: appStyle.strongBlack,
        fontSize: phoneDevice ? RPW(4.15) : 30,
        lineHeight: phoneDevice ? RPW(5) : 35,
    },
    unselectedItemText: {
        fontWeight: "400",
    },
    selectedItemText: {
        fontWeight: "600",
    }
})