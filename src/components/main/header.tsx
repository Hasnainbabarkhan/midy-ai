"use client";
import { cn } from "@/lib/utils";
import { useClientTranslation } from "@/hooks/global/use-client-translation";
import LogoIcon from "./logo-icon";
import { useAppStore } from "@/stores";

/**
 * Header with brand
 * @param props
 * @returns
 */
const Header = () => {
  const { t } = useClientTranslation();
  const { hideBrand } = useAppStore();
  return (
    <header
      className={cn(
        "z-0 mt-8 flex flex-col items-center justify-center space-y-4 px-2"
      )}
    >
      <div className="flex items-center space-x-4">
        {!hideBrand && <LogoIcon className="size-8 flex-shrink-0" />}
        <h1 className="break-all text-3xl font-bold leading-tight tracking-tighter transition-all lg:leading-[2]">
          {t("home:header.title")}
        </h1>
      </div>
    </header>
  );
};

export default Header;
