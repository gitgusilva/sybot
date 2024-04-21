import {DataTypes, Model, Optional, Sequelize} from "sequelize";

interface GuildAttributes {
    id: number;
    guildId: string;
    language: string;
}

type GuildCreationAttributes = Optional<GuildAttributes, "id">;

class Guild extends Model<GuildAttributes, GuildCreationAttributes> {
    public id!: number;
    public guildId!: string;
    public language!: string;

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
            language: {
                type: DataTypes.STRING,
            }
        }, {
            sequelize,
            modelName: "Guild",
            tableName: "Guild",
        });
    }
}

export default Guild;
