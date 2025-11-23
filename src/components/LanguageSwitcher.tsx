"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex gap-1">
        <Button
          variant={locale === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => switchLocale("en")}
          disabled={isPending || locale === "en"}
          className="h-8 px-3"
        >
          EN
        </Button>
        <Button
          variant={locale === "fr" ? "default" : "ghost"}
          size="sm"
          onClick={() => switchLocale("fr")}
          disabled={isPending || locale === "fr"}
          className="h-8 px-3"
        >
          FR
        </Button>
      </div>
    </div>
  );
}
