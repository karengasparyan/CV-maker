'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true
        },
        social_id: {
          type: Sequelize.STRING(255),
          allowNull: true,
          defaultValue: null,
          unique: true,
        },
        customer_id: {
          type: Sequelize.STRING(255),
          allowNull: true,
          defaultValue: null,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: true,
          get: () => null,
          set: (password) => {
            const social_id = this.getDataValue('social_id');
            if (!social_id && !password) throw new Error('Password is mandatory!');
            return this.setDataValue("password", password);
          },
        },
        image: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        socials: {
          type: Sequelize.JSON,
          allowNull: false,
          defaultValue: '[]',
          get: () => JSON.parse(this.getDataValue("socials")),
          set: (value) => this.setDataValue("socials", JSON.stringify(value)),
        },
        forgot_password_code: {
          type: Sequelize.STRING(255),
          allowNull: true,
          defaultValue: null,
        },
        verified_at: {
          type: "TIMESTAMP",
          defaultValue: null,
          allowNull: true,
        },
        created_at: {
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        updated_at: {
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        deleted_at: {
          type: "TIMESTAMP",
          defaultValue: null,
          allowNull: true,
        },
      },{transaction});
      await transaction.commit();
    } catch(e) {
      await transaction.rollback();
      throw e;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('users', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
