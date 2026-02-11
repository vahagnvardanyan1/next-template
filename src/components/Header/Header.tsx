"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslator } from "@/hooks/useTranslator";

import { LightIcon, DarkIcon } from "./styled";

export const Header = () => {
  const { mode, setMode } = useColorScheme();
  const translate = useTranslator();

  const toggleMode = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(var(--mui-palette-background-defaultChannel) / 0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: 1,
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Toolbar
        sx={{ maxWidth: 1200, width: "100%", mx: "auto", px: { xs: 2, md: 3 } }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "6px",
              background: "linear-gradient(135deg, #0070f3, #7928ca)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: 800,
                fontSize: 14,
                lineHeight: 1,
              }}
            >
              N
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {translate("appTitle")}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <LanguageSwitcher />
          <IconButton
            onClick={toggleMode}
            aria-label={translate("toggleTheme")}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": { color: "text.primary" },
            }}
          >
            <LightIcon fontSize="small" />
            <DarkIcon fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
