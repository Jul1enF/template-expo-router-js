import { RPW, RPH, phoneDevice } from "../utils/dimensions"


// Const declarations outside of appStyle scope for value possibly called multiple times inside of it

// Main colors of the app
const gradientRed = "rgb(255, 0, 0)"
const gardientBlack = "rgb(5, 5, 5)"

const strongBlack = "rgba(6, 0, 15, 1)"
const lightGrey = "rgb(211, 211, 211)"
const darkWhite = "rgb(254, 241, 241)"

const placeholderColor = "rgba(255,255,255,0.85)"

const strongRed = "rgba(182, 11, 11, 1)"

export const appStyle = {

    // Color exports
    gradientRed,
    gardientBlack,
    strongBlack,
    lightGrey,
    darkWhite,
    placeholderColor,
    strongRed,

    // Main sizes of the app
    headerHeight: phoneDevice ? RPW(16) : 130,
    tabBarHeight: phoneDevice ? RPW(18) : 90,

    pagePaddingTop: phoneDevice ? RPW(7) : 50,

    // Main Fonts of the app
      pageTitle: {
            fontSize: phoneDevice ? RPW(6) : 40,
            letterSpacing: phoneDevice ? RPW(0.6) : 3,
            fontWeight: '500',
            color: strongBlack,
        },
        pageSubtitle: {
            fontSize: phoneDevice ? RPW(4.5) : 28,
            letterSpacing: phoneDevice ? RPW(0.4) : 3,
            fontWeight: '500',
     color: strongBlack,
        },
    regularText: {
        color: strongBlack,
        fontSize: phoneDevice ? RPW(4) : 25,
        fontWeight: "400",
    },
    smallText: {
       color: strongBlack,
        fontSize: phoneDevice ? RPW(3.5) : 22,
        fontWeight: "400",
    },
      warning: {
            color: strongRed,
            fontSize: phoneDevice ? RPW(4) : 25,
            letterSpacing: phoneDevice ? 0.5 : 1,
            fontWeight: "500",
            textAlign: "center",
            width: "100%",
        },

}
