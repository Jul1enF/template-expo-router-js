import { Dimensions, Platform } from "react-native";


const screenHeight = Dimensions.get('window').height
const fullScreenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('window').width


const RPH = (percentage) => {

    if (Platform.OS === "android") {
        return (percentage / 100) * fullScreenHeight
    }
    else {
        return (percentage / 100) * screenHeight;
    }
};

const RPW = (percentage) => {
    return (percentage / 100) * (screenWidth);
};

const phoneDevice = RPW(1) <= 6 ? true : false


module.exports = { RPH, RPW, phoneDevice }