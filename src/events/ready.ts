import type { Client } from "discord.js";
import { logger } from "../core/logger";
import { initializeScheduler } from "../schedule";

async function exec(client: Client) {
  logger.info("Ready!");
  initializeScheduler(client);
}

export const ready = {
  name: "ready",
  exec,
};
