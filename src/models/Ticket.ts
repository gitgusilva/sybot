import {DataTypes, Model, Optional, Sequelize} from "sequelize";

interface Attributes {
    id: number;
    guildId: string;
    channelId: string;
    resolved: boolean;
    closedMessageId: string;
    authorId: string;
}

type CreationAttributes = Optional<Attributes, "id">;

class Ticket extends Model<Attributes, CreationAttributes> {
    public id!: number;
    public guildId!: string;
    public channelId!: string;
    public resolved!: boolean;
    public closedMessageId!: string;
    public authorId!: string;

    public static initModel(sequelize: Sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            guildId: {
                type: DataTypes.STRING,
            },
            channelId: {
                type: DataTypes.STRING,
            },
            resolved: {
                type: DataTypes.BOOLEAN,
            },
            closedMessageId: {
                type: DataTypes.STRING,
            },
            authorId: {
                type: DataTypes.STRING,
            }
        }, {
            sequelize,
            modelName: "Ticket",
            tableName: "Ticket",
        });
    }
}

export default Ticket;
