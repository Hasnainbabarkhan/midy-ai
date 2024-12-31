"use client";

import Main from "@/components/main/main";
import { createScopedLogger } from "@/utils/logger";

const logger = createScopedLogger("Home");

export default function Home() {
  logger.info("Hello, Welcome to 302.AI");
  return <Main />;
}
