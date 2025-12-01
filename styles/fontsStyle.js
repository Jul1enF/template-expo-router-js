import { RPH, RPW, phoneDevice } from 'utils/dimensions'
import { colorsStyle } from "./colorsStyle"
const { strongBlack, strongRed } = colorsStyle

export const fontsStyle = {
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
    inputLabelText: {
        color: strongBlack,
        fontSize: phoneDevice ? RPW(4) : 25,
        fontWeight: "500",
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