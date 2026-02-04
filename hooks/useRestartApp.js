import { Platform, Dimensions, AppState } from "react-native";
import { useEffect, useRef } from "react";
import { phoneDevice, RPW } from "@utils/dimensions";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import Constants from 'expo-constants';

const env = Constants.executionEnvironment
const isBuild = env === "bare" || env === "standalone" ? true : false
const RNRestart = isBuild ? require("react-native-restart-newarch").default : null


export default function useRestartApp() {
    const isRestartingRef = useRef(false);

    // Function to restart the app
    const tryRestart = () => {
        // if on expo go or already restarting we return
        if (!isBuild || isRestartingRef.current) return;

        isRestartingRef.current = true;
        RNRestart.restart();

        // if the restart failed, let the ref be false again to be able to try later a new restart
        setTimeout(() => {
            isRestartingRef.current = false;
        }, 1000);
    };


    
    /* ================= FONT SCALE RESTART LOGIC ================= */

    // Register the fontScale when app start
    const lastFontScaleRef = useRef(Dimensions.get("window").fontScale)

    // useEffect with a listener for android of focus state to see if the fontScale changed
    useEffect(() => {
        const subscription = Platform.OS !== "android" ? null : AppState.addEventListener("focus", () => {

            const { fontScale } = Dimensions.get("window");

            // console.log("lastFontScale :", lastFontScale, "fontScale :", fontScale)

            if (fontScale !== lastFontScaleRef.current) {
                tryRestart()
                return;
            }
        })

        return () => {
            subscription && subscription.remove()
        }
    }, [])




    /* ================= LAYOUT ZOOM RESTART LOGIC ================= */

    const { width: safeWidth } = useSafeAreaFrame()

    // useEffect to check if on android the current screen width is not the same as the one registered with RPW() and Dimensions (because of an accessibility zoom) and restart completely the app
    useEffect(() => {
        if (Platform.OS !== "android" || !isBuild || !safeWidth || isRestartingRef.current) return

        // Current size of the screen from Dimension and SafeArea
        const dimWidth = Math.round(RPW(100));
        const layoutWidth = Math.round(safeWidth);

        // console.log("dimWidth :", dimWidth, "layoutWidth :", layoutWidth)

        if (dimWidth !== layoutWidth) {
            tryRestart()
            return;
        }
    }, [safeWidth])

}