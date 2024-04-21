import {Linguini} from "linguini";
import {
    AutocompleteInteraction, CacheType,
    ChatInputCommandInteraction,
    Collection,
    ContextMenuCommandBuilder,
    Message,
    MessageContextMenuCommandInteraction,
    ModalSubmitInteraction,
    PermissionResolvable,
    SlashCommandBuilder, UserContextMenuCommandInteraction
} from "discord.js";

declare module "discord-player";
declare module "dotenv";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            PREFIX: string,
            DB_HOST: string,
            DB_USER: string,
            DB_NAME: string,
            DB_PASS: string
        }
    }

    interface String {
        format(...args: any[]): string;
    }
}

declare module "discord.js" {
    export interface Client {
        contextCommands: Collection<string, ContextCommand>,
        slashCommands: Collection<string, SlashCommand>,
        commands: Collection<string, Command>,
        cooldowns: Collection<string, number>,
        guildInfo: Collection<string, GuildInfo>
        guildLanguage: Collection<string, string>,
        defaultLanguage: string,
        languages: Array,
        lang: Linguini
    }

    export interface ContextCommand {
        command: ContextMenuCommandBuilder,
        execute: (interaction : MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction) => void,
        cooldown?: number // in seconds
    }

    export interface SlashCommand {
        command: SlashCommandBuilder,
        execute: (interaction : ChatInputCommandInteraction) => void,
        autocomplete?: (interaction: AutocompleteInteraction) => void,
        modal?: (interaction: ModalSubmitInteraction<CacheType>) => void,
        cooldown?: number // in seconds
    }

    export interface GuildInfo {
        prefix: string,
        language: string
    }

    export interface Command {
        name: string,
        execute: (message: Message, args: Array<string>) => void,
        permissions: Array<PermissionResolvable>,
        aliases: Array<string>,
        cooldown?: number,
    }

    export interface BotEvent {
        name: string,
        once?: boolean | false,
        execute: (...args?) => void
    }
}
