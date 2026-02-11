"use client";

import { useLocale } from "next-intl";

import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";

import { useTranslator } from "@/hooks/useTranslator";
import { useRouter, usePathname } from "@/i18n/navigation";

import { LocaleSelect } from "./styled";

const locales = [
  { code: "en", labelKey: "english" },
  { code: "hy", labelKey: "armenian" },
  { code: "ru", labelKey: "russian" },
] as const;

export const LanguageSwitcher = () => {
  const translate = useTranslator();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: SelectChangeEvent) => {
    router.replace({ pathname }, { locale: event.target.value });
  };

  return (
    <LocaleSelect value={locale} onChange={handleChange} size="small">
      {locales.map(({ code, labelKey }) => (
        <MenuItem key={code} value={code}>
          {translate(labelKey)}
        </MenuItem>
      ))}
    </LocaleSelect>
  );
};
