import { View, Text, StyleSheet } from "react-native";
import useLayoutSpaces from "../../hooks/useLayoutSpaces";
import Modal from "react-native-modal"
import Button from "./Button";

import { RPH, RPW, phoneDevice } from 'utils/dimensions.js'
import { appStyle } from 'styles/appStyle.js';

export default function ConfirmationModal({visible, closeModal, confirmationText, confirmationBtnText, confirmationFunc, warningText, cancelBtnText}) {

    const { screenHeight, screenWidth } = useLayoutSpaces()

    return (
        <Modal
            isVisible={visible}
            backdropColor="black"
            backdropOpacity={0.8}
            deviceWidth={screenWidth}
            deviceHeight={screenHeight}
            statusBarTranslucent={true}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            supportedOrientations={['portrait', 'landscape']}
            onBackButtonPress={() => closeModal()}
            onBackdropPress={() => closeModal()}
            style={{ alignItems: "center", justifyContent: "center", margin: 0 }}
        >
            <View style={styles.modalBody}>
                <Text style={styles.confirmationText}>
                    {confirmationText}
                </Text>
                <View style={styles.line} />
                <Text style={styles.warning}>
                    {warningText}
                </Text>
                <Button func={confirmationFunc} text={confirmationBtnText} />
                <Button func={closeModal} text={cancelBtnText} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBody: {
        ...appStyle.card,
        backgroundColor : appStyle.darkGrey
    },
    confirmationText: {
        ...appStyle.regularText,
        color: appStyle.fontColorDarkBg,
        textAlign: "center",
    },
    line: {
        width: "40%",
        ...appStyle.horizontalLine,
        marginTop: phoneDevice ? RPW(6) : 60,
        marginBottom: 0,
    },
    warning: {
        ...appStyle.warning,
        marginTop: phoneDevice ? RPW(1.5) : 15
    }
})