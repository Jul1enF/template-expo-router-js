import { Stack } from "expo-router";

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user'


const store = configureStore({
    reducer: { user },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})

export default function RootLayout() {

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