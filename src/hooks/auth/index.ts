"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  CHINA_REGION,
  FALSE_STRING,
  SHARE_CODE_REMEMBER_KEY,
  SHARE_CODE_STORE_KEY,
  SHARE_CODE_URL_PARAM,
  TRUE_STRING,
} from "@/constants";
import { env } from "@/env";
import { useRouter } from "@/i18n/navigation";
import { login } from "@/services/auth";
import { useAppStore } from "@/stores";
import { logger } from "@/utils";
import { useClientTranslation } from "../global/use-client-translation";
import { usePathUtils } from "../global/use-path-utils";

// Define the schema using Zod for form validation
const schema = z.object({
  code: z.string().optional(),
  remember: z.boolean().optional(),
});

// Define the type for authentication data
type AuthData = {
  code: string;
  remember: boolean;
};

const useAuth = () => {
  const [isPending, setIsPending] = useState(false);
  const params = useSearchParams();
  const { replace } = useRouter();
  const { isAuthPath } = usePathUtils();
  const { t } = useClientTranslation();

  // Initialize form handling with react-hook-form and Zod resolver
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AuthData>({
    defaultValues: {
      code: "", // Default code to empty string
      remember: true, // Default remember to true
    },
    resolver: zodResolver(schema),
  });

  // Retrieve values from query param or local storage only when params change
  useEffect(() => {
    const queryCode = params.get(SHARE_CODE_URL_PARAM) || "";
    const sessionCode = sessionStorage.getItem(SHARE_CODE_STORE_KEY) || "";
    const storedCode = localStorage.getItem(SHARE_CODE_STORE_KEY) || "";
    const storeRemember = localStorage.getItem(SHARE_CODE_REMEMBER_KEY) || "";

    // Reset remember
    if (storeRemember === FALSE_STRING) {
      setValue("remember", false);
    }

    // Reset code
    if (queryCode || sessionCode || storedCode) {
      setValue("code", queryCode || sessionCode || storedCode);
    }
  }, [params, setValue]);

  // Function to handle authentication
  const performAuth = useCallback(
    async ({ code, remember }: AuthData) => {
      try {
        setIsPending(true);

        // Call login function to validate the code
        const result = await login(code);

        logger.debug("result:", JSON.stringify(result));

        // Update app configuration from the store with result
        const { updateConfig } = useAppStore.getState();

        updateConfig({
          apiKey: result.data?.apiKey,
          modelName: result.data?.modelName,
          isChina: result.data?.region === CHINA_REGION,
          toolInfo: result.data?.info,
          shareCode: result.data?.code,
          hideBrand: result.data?.hideBrand,
        });

        // Store or remove auth code based on remember flag
        if (remember) {
          localStorage.setItem(SHARE_CODE_REMEMBER_KEY, TRUE_STRING);
          localStorage.setItem(SHARE_CODE_STORE_KEY, code);
        } else {
          localStorage.setItem(SHARE_CODE_REMEMBER_KEY, FALSE_STRING);
          sessionStorage.setItem(SHARE_CODE_STORE_KEY, code);
          localStorage.setItem(SHARE_CODE_STORE_KEY, "");
        }

        console.log("here", isAuthPath);

        // Redirect to the home page if on auth page
        if (isAuthPath) {
          replace("/");
        } else {
          window.history.replaceState({}, "", window.location.pathname);
        }
      } catch (error: unknown) {
        // Handle error by navigating to auth and setting error state
        replace(env.NEXT_PUBLIC_AUTH_PATH);
        if (error instanceof Error) {
          setError("code", {
            type: "server",
            message: t(error.message),
          });
        }
      } finally {
        setIsPending(false);
      }
    },
    [t, setError, isAuthPath, replace]
  );

  // Callback for form submission
  const onSubmit = useCallback(
    async (data: AuthData) => {
      await performAuth(data);
    },
    [performAuth]
  );

  const onAuth = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  return {
    isPending,
    setValue,
    onAuth,
    watch,
    register,
    errors,
  };
};

export default useAuth;
