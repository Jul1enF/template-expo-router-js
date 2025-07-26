import {RPW, RPH, phoneDevice} from "../modules/dimensions"


// Const declarations outside of appStyle scope for value possibly called multiple times inside of it
// Main colors of the app
const gradientRed = "rgb(255, 0, 0)"
const gardientBlack = "rgb(5, 5, 5)"
const strongWhite = "rgb(254, 241, 241)"
const lightGrey = "rgb(211, 211, 211)"
const placeholderColor = "rgba(255,255,255,0.85)"

export const appStyle = {

// Couleurs principales de l'app
gradientRed,
gardientBlack,
strongWhite,
lightGrey,
placeholderColor,

// Tailles principales de l'app
headerHeight : phoneDevice ? RPH(14) : 130,
tabBarHeight : phoneDevice ? RPH(10.5) : 95,

pageTitleSize : phoneDevice ? RPW(6) : 50,

}
