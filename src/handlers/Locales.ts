import {TypeMapper, TypeMappers} from "linguini";

import GuildConfig from "../models/Guild";
import {Client} from "discord.js";

const defaultLanguage : "en-us"  = "en-us" as const;

export default async (client: Client) => {
    for (const guild of client.guilds.cache) {
        const guildId = guild[0];

        const query = await GuildConfig.findOne({where: {guildId: guildId}});
        const value = (query) ? query.getDataValue("language") : defaultLanguage;

        client.guildLanguage.set(guildId, value);
    }
};

const setLanguage = async (client: Client, guildId: string, lang: string) => {
    try {
        const query = await GuildConfig.findOne({where: {guildId: guildId}});
        if (query) {
            await GuildConfig.update({language: lang}, {where: {guildId: guildId}});
        } else {
            await GuildConfig.create({
                guildId: guildId,
                language: lang
            });
        }


        client.guildLanguage.set(guildId, lang);
    } catch (e) {
        console.log(e);
    }
};

const Translate = (client: Client, guildId: string | null, textId: number, options = {}, typeMappers : TypeMapper<string> = TypeMappers.String) => {
    if (!guildId) return;

    const lang = client.guildLanguage.get(guildId) ?? defaultLanguage;
    return client.lang.get(String(textId), String(lang), typeMappers, options);
};

export {Translate, setLanguage};
