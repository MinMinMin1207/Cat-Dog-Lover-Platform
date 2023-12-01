import { Sequelize } from "sequelize/types/sequelize"

const UUIDModel = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNullValues: false,
        primaryKey: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: literal('NOW()')
    },
}

export default UUIDModel