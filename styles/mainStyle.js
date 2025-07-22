import {RPW, RPH, phoneDevice} from "../modules/dimensions"

export const mainStyle = {

// Couleurs principales de l'app
gradientRed : "rgb(255, 0, 0)",
gardientBlack : "rgb(5, 5, 5)",
strongWhite : "rgb(254, 241, 241)",
lightGrey : "rgb(211, 211, 211)",
placeholderColor : "rgba(255,255,255,0.85)",

// Tailles principales de l'app
headerHeight : phoneDevice ? RPH(14) : 130,
tabBarHeight : phoneDevice ? RPH(10.5) : 95,

pageTitleSize : phoneDevice ? RPW(6) : 50,

}
