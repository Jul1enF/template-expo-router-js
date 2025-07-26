import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header";
import { RPH, RPW, phoneDevice} from "../../modules/dimensions"
import { appStyle } from "../../styles/appStyle";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TabsLayout() {
  return (
    <Tabs
    screenOptions={({ route }) => ({
      keyboardHidesTabBar: true,

      tabBarIcon: ({ focused }) => {
        let iconName = '';
        let color = ""
        color = focused ? appStyle.strongWhite : appStyle.lightGrey

        if (route.name === '(tab1)') {
          iconName = 'square-outline';
        } else if (route.name === '(tab2)') {
          iconName = 'triangle-outline';
        }

        return <MaterialCommunityIcons name={iconName} size={phoneDevice ? RPH(3.8) : 28} color={color} />;
      },

      tabBarIconStyle : {width : "100%", height : phoneDevice ? RPH(4.8) : 40},
      tabBarActiveTintColor: appStyle.strongWhite,
      tabBarInactiveTintColor: appStyle.lightGrey,
      tabBarLabelStyle: { fontSize: phoneDevice ? RPW(4.2) : 25, fontWeight : "500" },
      tabBarBackground: () => (
        <LinearGradient
          colors={[appStyle.gradientRed, appStyle.gardientBlack]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ height: 150 }}
        ></LinearGradient>
      ),
      tabBarStyle: { height: appStyle.tabBarHeight, paddingBottom: phoneDevice ? RPH(2) : 0, paddingTop: phoneDevice ? RPH(0.5) : 3, width : "100%" },
      tabBarLabelPosition : "below-icon",
      // Build / KeyboardAwareScrollView
      // tabBarHideOnKeyboard : Platform.OS === 'ios' ? true : false,
      // Expo Go / KeyboardAvoidingView
      tabBarHideOnKeyboard: Platform.OS === 'android' ? true : false,
      header: (props) => <Header {...props} />,
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