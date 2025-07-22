import { Stack } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation'
import { phoneDevice } from "../modules/dimensions"

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user'


const store = configureStore({
    reducer: { user },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})

export default function RootLayout() {

    const unlockPortraitModeTablet = async () => {
        !phoneDevice && await ScreenOrientation.unlockAsync()
    }

    unlockPortraitModeTablet()

    return (
        <Provider store={store}>
            <Stack >
                <Stack.Screen name="index" options={{
                    headerShown: false,
                    title: "Accueil",
                }} />
                <Stack.Screen name="(tabs)" options={{
                    headerShown: false,
                }} />
            </Stack>
        </Provider>
    )
}