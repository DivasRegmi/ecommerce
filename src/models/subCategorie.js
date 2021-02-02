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
      onDelete: 'cascade',
      foreignKey: {
        name: 'subCategorieId',
        allowNull: false,
      },
    });
    SubCategorie.belongsTo(models.Categorie, {
      foreignKey: {
        onDelete: 'cascade',
        name: 'categorieId',
        allowNull: false,
      },
    });
  };

  return SubCategorie;
};
