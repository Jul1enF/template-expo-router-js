import { Tabs } from "expo-router";
import { Platform, AppState } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/ui/Header";
import { RPH, RPW, phoneDevice } from "../../utils/dimensions"
import { appStyle } from "../../styles/appStyle";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { checkIfAppIsObsoleteAsync } from '../../utils/checkIfAppIsObsoleteAsync'


export default function TabsLayout() {

  // Check if the app should mandatory update when oppening it
  const [appObsolete, setAppObsolete] = useState(false)

  const updateAppVersionStatus = async () => {
    const isAppObsolete = await checkIfAppIsObsoleteAsync()
    setAppObsolete(isAppObsolete)
  }

  useEffect(() => {
    updateAppVersionStatus()

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        updateAppVersionStatus()
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);



  // Offset bottom for the navigations bar (the ios ones are not well calculated)
  const tabbarPaddingBottom = Platform.OS === "ios" ? useSafeAreaInsets().bottom / 2 : useSafeAreaInsets().bottom

  const fullTabBarHeight = appStyle.tabBarHeight + tabbarPaddingBottom



  return (
    <Tabs
      screenOptions={({ route }) => ({
        keyboardHidesTabBar: true,

        tabBarIcon: ({ focused }) => {
          let iconName = '';
          let color = ""
          color = focused ? appStyle.darkWhite : appStyle.lightGrey

          switch (route.name) {
            case '(tab1)':
              iconName = 'square-outline'
              break;
            case '(tab2)':
              iconName = 'triangle-outline'
              break;
          }

          return <MaterialCommunityIcons name={iconName} size={phoneDevice ? RPW(6.5) : 32} color={color} />;
        },

        tabBarIconStyle: { width: "100%", height: appStyle.tabBarHeight / 2 },
        tabBarLabelStyle: { fontSize: phoneDevice ? RPW(4) : 26, fontWeight: "500", height: appStyle.tabBarHeight / 2 },
        tabBarActiveTintColor: appStyle.darkWhite,
        tabBarInactiveTintColor: appStyle.lightGrey,

        tabBarBackground: () => (
          <LinearGradient
            colors={[appStyle.gradientRed, appStyle.gardientBlack]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ height: 150 }}
          ></LinearGradient>
        ),

        tabBarStyle: { height: fullTabBarHeight, paddingBottom: tabbarPaddingBottom, width: "100%", justifyContent: "space-evenly" },
        tabBarLabelPosition: "below-icon",

        header: (props) => <Header {...props} appObsolete={appObsolete} />,
      })}
    >
      <Tabs.Screen name="(tab1)" options={{
        title: "Tab 1"
      }} />
      <Tabs.Screen name="(tab2)" options={{
        title: "Tab 2",
      }} />
      <Tabs.Screen name="(pages)" options={{
        tabBarItemStyle: { display: "none" },
      }} />
    </Tabs>
  )
}