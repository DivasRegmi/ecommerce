module.exports = (sequelize, DataTypes) => {
  const SubCategorie = sequelize.define('SubCategorie', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  SubCategorie.associate = (models) => {
    SubCategorie.hasMany(models.Product, {
      foreignKey: {
        name: 'subCategorieId',
        allowNull: false,
      },
    });
    SubCategorie.belongsTo(models.Categorie, {
      foreignKey: {
        name: 'categorieId',
        allowNull: false,
      },
    });
  };

  return SubCategorie;
};
