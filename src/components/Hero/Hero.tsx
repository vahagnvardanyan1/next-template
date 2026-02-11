import { getTranslations } from "next-intl/server";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { CounterDemo } from "@/components/CounterDemo";

import {
  HeroRoot,
  BackgroundGlow,
  BadgeChip,
  Title,
  Subtitle,
  PrimaryButton,
  OutlinedButton,
  DemoTitle,
  DemoWrapper,
} from "./styled";

export const Hero = async () => {
  const t = await getTranslations();

  return (
    <HeroRoot sx={{ pt: { xs: 10, md: 16 }, pb: { xs: 8, md: 14 } }}>
      <BackgroundGlow />

      <Container
        maxWidth="md"
        sx={{ position: "relative", textAlign: "center" }}
      >
        <Box className="animate-fade-in-up">
          <BadgeChip
            label="Next.js 16 + MUI 7 + next-intl + Zustand"
            size="small"
          />
        </Box>

        <Title
          variant="h1"
          className="animate-fade-in-up-delay-1 gradient-text"
          sx={{ fontSize: { xs: "2.5rem", md: "4rem" } }}
        >
          {t("heroTitle")}
        </Title>

        <Subtitle
          variant="h5"
          component="h2"
          className="animate-fade-in-up-delay-2"
          sx={{
            color: "text.secondary",
            fontSize: { xs: "1rem", md: "1.2rem" },
          }}
        >
          {t("heroSubtitle")}
        </Subtitle>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          className="animate-fade-in-up-delay-3"
        >
          <PrimaryButton
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            href="https://nextjs.org/docs"
          >
            {t("getStarted")}
          </PrimaryButton>
          <OutlinedButton
            variant="outlined"
            size="large"
            startIcon={<GitHubIcon />}
            href="https://github.com/vahagnvardanyan1/next-template"
          >
            {t("viewOnGithub")}
          </OutlinedButton>
        </Stack>

        <DemoWrapper className="animate-fade-in">
          <DemoTitle variant="subtitle2" component="h3">
            {t("demoTitle")}
          </DemoTitle>
          <CounterDemo />
        </DemoWrapper>
      </Container>
    </HeroRoot>
  );
};
