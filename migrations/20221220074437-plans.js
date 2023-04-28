'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
//   id
//   name
//   number (it cv count number)
// disabled (we can enable or disable this plan, store it boolean type - 0/1, default 0 )
// price
// price_id (which come from stripe )- it can be null first time
// timestamp
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('plans', {
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
        number: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        disabled: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0
        },
        product_id: {
          type: Sequelize.STRING(255),
          allowNull: true,
          defaultValue: null
        },
        price_id: {
          type: Sequelize.STRING(255),
          allowNull: true,
          defaultValue: null
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
      await queryInterface.dropTable('plans', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
