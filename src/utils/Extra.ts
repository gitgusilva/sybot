String.prototype.format = function(...args : []) {
    return this.replace(/{(\d+)}/g, function(_,m) {
        return args[--m];
    });
};


const inCooldown = async (event: any, cooldown?: number | undefined): Promise<boolean> => {
    if (!cooldown) return false;

    const key = `${event.guild.id}-${event.member.user.username}`;
    const userCooldown = event.client.cooldowns.get(key);

    if (userCooldown) {
        if (Date.now() < userCooldown) {
            await event.reply({
                content: "You have to wait {1} second(s) to use this command again.".format(Math.floor(Math.abs(Date.now() - userCooldown) / 1000)),
                ephemeral: true
            })
                .then((reply: any) => setTimeout(() => ("delete" in event) ? reply.delete() : event.deleteReply(), 5000));

            return true;
        }

        event.client.cooldowns.set(key, Date.now() + cooldown * 1000);

        setTimeout(() => {
            event.client.cooldowns.delete(key);
        }, cooldown * 1000);
    } else {
        event.client.cooldowns.set(key, Date.now() + cooldown * 1000);
    }

    return false;
};

export {inCooldown};
