module.exports = (sequelize, DataTypes) => {
  const SubCategorie = sequelize.define('SubCategorie', {
    name: DataTypes.STRING,
  });

  SubCategorie.associate = (models) => {
    SubCategorie.hasMany(models.Product, {
      foreignKey: {
        name: 'subCategorieId',
        allowNull: false,
      },
    });
    SubCategorie.belongsTo(models.Categories, {
      foreignKey: {
        name: 'subCategorieId',
        allowNull: false,
      },
    });
  };

  return SubCategorie;
};
