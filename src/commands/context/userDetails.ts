import {
    ApplicationCommandType,
    ContextCommand,
    ContextMenuCommandBuilder, EmbedBuilder,
    Interaction,
    PermissionFlagsBits
} from "discord.js";
import moment from "moment/moment";

const command: ContextCommand  = {
    command: new ContextMenuCommandBuilder()
        .setName("Show Details")
        .setType(ApplicationCommandType.User)
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    ,
    execute: async (interaction: any) => {
        const user = interaction.targetUser;
        const joined = user.joinedAt;

        const embed = new EmbedBuilder()
            .setColor("#000000")
            .setImage(user.avatarURL({extension: "png", size: 1024}))
            .addFields(
                {
                    name: "**ID**",
                    value: user.id
                },
                {
                    name: "**Username**",
                    value: `<@${user.id}>`
                },
                {
                    name: "**Joined in Guild at**",
                    value: moment(joined).format("DD/MM/YYYY, at HH:mm:ss")
                }
            ).setTimestamp();

        interaction.reply({embeds: [embed], ephemeral: true});
    },
    cooldown: 10
};

export default command;
