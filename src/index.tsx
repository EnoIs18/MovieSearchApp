import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./data/store/store";
import { PersistGate } from "redux-persist/integration/react";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme ,ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          '& input': {
            color: 'black'
          },
        }),
      },
    },
  },
  palette: {

    background: {
      default: '#080a1a', 
    },
    text: {
      primary: "#ffffffd6", 
      secondary:'#000'
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
