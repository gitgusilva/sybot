import {ChannelType, Command, EmbedBuilder, Message, PermissionFlagsBits} from "discord.js";
import moment from "moment";

const command : Command = {
    name: "serverinfo",
    execute: (message: Message) => {
        if (!message.guild) return;

        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const date = message.guild.createdAt;
        const joined = message.member?.joinedAt;

        const embed = new EmbedBuilder()
            .setColor("#000000")
            .setThumbnail(message.guild.iconURL())
            .setAuthor({name: message.guild.name})
            .setThumbnail(message.guild.iconURL({extension: "png", size: 1024}))
            .addFields(
                {
                    name: "**ID**",
                    value: message.guild.id
                },
                {
                    name: "**Guild Owner**",
                    value: `<@${message.guild.ownerId}>`
                },
                {
                    name: "**Member(s)**",
                    value: message.guild.memberCount.toString()
                },
                {
                    name: "**Bot(s)**",
                    value: members.filter((m) => m.user.bot).size.toString()
                },
                {
                    name: "**Boost**",
                    value: message.guild?.premiumSubscriptionCount?.toString() || "0"
                },
                {
                    name: "**Channels**",
                    value: `💬 ${channels.filter((channel) => ChannelType.GuildText).size} text\n🎤 ${channels.filter((channel) => ChannelType.GuildVoice).size} voice`
                },
                {
                    name: "**Created at**",
                    value: moment(date).format("DD/MM/YYYY, à\\s HH:mm:ss")
                },
                {
                    name: "**You Joined**",
                    value: moment(joined).format("DD/MM/YYYY, à\\s HH:mm:ss")
                },
                {
                    name: "**Discord Bot Creator:**",
                    value: "<@297888863244910592>"
                }
            ).setTimestamp();

        message.channel.send({embeds: [embed]});
    },
    cooldown: 10,
    aliases: [],
    permissions: ["Administrator", PermissionFlagsBits.AddReactions] // to test
};

export default command;
