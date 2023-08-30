const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El firstName es requerido'
            },
            notEmpty: {
                msg: 'Debe ingresar un firstName'
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El lastName es requerido'
            },
            notEmpty: {
                msg: 'Debe ingresar un lastName'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Debe ingresar un email válido'
            },
            notNull: {
                msg: 'El email es requerido'
            },
            notEmpty: {
                msg: 'Debe ingresar un email'
            }
        }
    },
}
);

module.exports = User;