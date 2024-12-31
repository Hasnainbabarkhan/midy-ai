"use client";

import { env } from "@/env";
import useAuth from "@/hooks/auth";
import { usePathUtils } from "@/hooks/global/use-path-utils";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useAppStore } from "@/stores";
import { createScopedLogger } from "@/utils";
import { isOutsideDeployMode } from "@/utils/302";
import { useEffect } from "react";

const logger = createScopedLogger("AppAuth");

const AppAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { onAuth } = useAuth();
  const updateConfig = useAppStore((state) => state.updateConfig);
  const { needAuth, isAuthPath } = usePathUtils();

  useEffect(() => {
    if (isOutsideDeployMode()) {
      // Update app configuration from the store with result
      updateConfig({ apiKey: env.NEXT_PUBLIC_302_API_KEY });
      if (isAuthPath) {
        router.replace("/");
      }
      return;
    }

    logger.debug("needAuth:", needAuth);
    // Auto auth for match router
    if (needAuth) {
      onAuth();
    }
  }, [pathname, onAuth, needAuth, router, updateConfig, isAuthPath]);
  return null;
};

export default AppAuth;
