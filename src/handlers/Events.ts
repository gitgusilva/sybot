import {Client, BotEvent} from "discord.js";
import {join} from "path";
import {readdirSync} from "node:fs";

export default async (client: Client) => {
    const eventsDir = join(__dirname, "../events");
    const eventFiles = readdirSync(eventsDir).filter((file: any) => file.endsWith(".js"));

    for (const file of eventFiles) {
        const event: BotEvent = (await import(`${eventsDir}/${file}`)).default;

        try {
            event.once ?
                client.once(event.name, (...args) => event.execute(...args))
                :
                client.on(event.name, (...args) => event.execute(...args));
        } catch (error) {
            console.error("[x]", `Não foi possível carregar o evento ${event.name}: ${error}`);
        }
    }

    console.log("[✓]", `loaded ${eventFiles.length} events`);
};
