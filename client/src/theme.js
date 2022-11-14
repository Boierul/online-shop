import { createTheme } from "@mui/material/styles";

export const shades = {
  primary: {
    100: "#d2d3d3",
    200: "#a5a6a7",
    300: "#787a7c",
    400: "#4b4d50",
    500: "#1e2124",
    600: "#181a1d",
    700: "#121416",
    800: "#0c0d0e",
    900: "#060707"
  },
  secondary: {
    100: "#f7ccd2",
    200: "#ef99a4",
    300: "#e66677",
    400: "#de3349",
    500: "#d6001c",
    600: "#ab0016",
    700: "#800011",
    800: "#56000b",
    900: "#2b0006",
  },
  neutral: {
    100: "#f5f5f5",
    200: "#ecebeb",
    300: "#e2e1e1",
    400: "#d9d7d7",
    500: "#cfcdcd",
    600: "#a6a4a4",
    700: "#7c7b7b",
    800: "#535252",
    900: "#292929",
  },
  purple: {
    100: "#e4dae7",
    200: "#c9b5ce",
    300: "#af91b6",
    400: "#946c9d",
    500: "#794785",
    600: "#61396a",
    700: "#492b50",
    800: "#301c35",
    900: "#180e1b"
  },
  indigo: {
    100: "#e3e7f8",
    200: "#c7d0f0",
    300: "#aab8e9",
    400: "#8ea1e1",
    500: "#7289da",
    600: "#5b6eae",
    700: "#445283",
    800: "#2e3757",
    900: "#171b2c"
  },
  teal: {
    100: "#d3fbf7",
    200: "#a8f7ee",
    300: "#7cf3e6",
    400: "#51efdd",
    500: "#25ebd5",
    600: "#1ebcaa",
    700: "#168d80",
    800: "#0f5e55",
    900: "#072f2b"
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: shades.primary[500],
    },
    secondary: {
      main: shades.secondary[500],
    },
    neutral: {
      dark: shades.neutral[700],
      main: shades.neutral[500],
      light: shades.neutral[100],
    },
  },
  typography: {
    fontFamily: ["Fauna One", "sans-serif"].join(","),
    fontSize: 11,
    h1: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 48,
    },
    h2: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 36,
    },
    h3: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 20,
    },
    h4: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
});
