import type { Metadata } from "next";

import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { BASE_URL } from "@/constants/configs";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "../globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const translate = await getTranslations({ locale });

  return {
    title: {
      default: translate("seoTitle"),
      template: `%s | ${translate("appTitle")}`,
    },
    description: translate("seoDescription"),
    keywords: translate("seoKeywords"),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
    },
    openGraph: {
      title: translate("seoTitle"),
      description: translate("seoDescription"),
      locale,
      type: "website",
      url: `${BASE_URL}/${locale}`,
    },
  };
};

const LocaleLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "hy" | "ru")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={roboto.variable}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
