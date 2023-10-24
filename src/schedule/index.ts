import {
  EmbedBuilder,
  type Client,
  Colors,
  type TextChannel,
  type Guild,
  type Collection,
} from "discord.js";
import schedule from "node-schedule";
import { logger } from "../core/logger";
import { questions } from "../questions";

function randomNumber(min: number, max: number): number {
  const strictMin: number = Math.ceil(Number(min));
  const strictMax: number = Math.floor(Number(max));
  return Math.floor(Math.random() * (strictMax - strictMin + 1)) + strictMin;
}

function getRandomTime() {
  return `${randomNumber(0, 57)} ${randomNumber(17, 21)} * * *`; // Between 5:00 PM and 9:57 PM AEST
}

export function initializeScheduler(client: Client) {
  logger.info("Initializing scheduler.", {
    guildIds: client.guilds.cache.map((g) => g.id),
  });

  const questionJob = schedule.scheduleJob(getRandomTime(), () => {
    client.guilds.cache.forEach((guild) => {
      logger.info("Sending question to guild.", { guild: guild.id });

      sendQuestion(guild).catch((error) => {
        logger.error("There was an error sending the question.", {
          error,
          guild: guild.id,
        });
      });
    });
  });

  logger.info("Initial question job configured.", {
    nextInvocation: questionJob.nextInvocation(),
  });

  const reschedulingJob = schedule.scheduleJob("59 23 * * *", (date) => {
    logger.info("Rescheduling question job.", { date });

    questionJob.reschedule(getRandomTime());

    logger.info("Question job has been rescheduled", {
      nextInvocation: questionJob.nextInvocation(),
    });
  });

  logger.info("Question rescheduling job configured.", {
    nextInvocation: reschedulingJob.nextInvocation(),
  });
}

async function getTextChannel(
  guild: Guild,
  channelName = ""
): Promise<TextChannel | void> {
  const allChannels = await guild.channels.fetch();
  const textChannels = allChannels.filter(
    (c) => c?.isTextBased() && !c?.isThread() && c?.type === 0
  ) as Collection<string, TextChannel>;

  // There HAS to be one text-channel in a server
  const baseChannel = textChannels.first();

  if (channelName.trim().length === 0 && baseChannel !== undefined)
    return baseChannel;

  const channel = textChannels.find((c) => c.name === channelName);

  if (channel) return channel;

  if (baseChannel) return baseChannel;
}

const allColors = Object.values(Colors);

async function sendQuestion(guild: Guild) {
  const channel = await getTextChannel(guild);

  if (!channel) {
    throw new Error("Could not find a suitable text channel");
  }

  const question = questions[randomNumber(0, questions.length - 1)];

  const embed = new EmbedBuilder()
    .setColor(allColors[randomNumber(0, allColors.length - 1)])
    .setDescription(`**${question.question}**`)
    .setFooter({ text: `Category: ${question.category}` });

  await channel.send({ embeds: [embed] });
}
