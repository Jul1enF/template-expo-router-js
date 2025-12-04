import { TouchableOpacity, Text } from "react-native";
import { appStyle } from 'styles/appStyle.js';


export default function Button ({func, text, itemStyle = appStyle.regularItem, border, bgColor = appStyle.strongRed, padding, color = appStyle.darkWhite}) {
    return (
        <TouchableOpacity style={[
          appStyle.button, 
          itemStyle, 
          border, 
          {backgroundColor : !border ? bgColor : "transparent"},
          padding && {width : "auto", paddingLeft : padding, paddingRight : padding}
          ]} 
          onPress={func} activeOpacity={0.6}
          >
        <Text style={[appStyle.regularText, {color}]}>{text}</Text>
      </TouchableOpacity>
    )
}