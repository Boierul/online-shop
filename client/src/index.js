import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import {theme} from "./theme";

import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./state";

const store = configureStore({
    reducer: {
        // Can add multiple reducers if needed
        cart: cartReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                {/* CSS Baseline prevents typo bugs */}
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

