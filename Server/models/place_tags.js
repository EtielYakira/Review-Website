const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('place_tags', {
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'places',
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tags',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'place_tags',
    timestamps: false,
    indexes: [
      {
        name: "FK_place_tags_place_idx",
        using: "BTREE",
        fields: [
          { name: "placeId" },
        ]
      },
      {
        name: "FK_place_tags_tags",
        using: "BTREE",
        fields: [
          { name: "tagId" },
        ]
      },
    ]
  });
};
