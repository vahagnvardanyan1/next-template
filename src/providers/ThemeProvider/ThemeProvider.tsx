"use client";

import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import theme from "@/theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <InitColorSchemeScript attribute="data-color-scheme" />
      <MuiThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </>
  );
};
