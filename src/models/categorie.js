module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  });

  Categorie.associate = (models) => {
    Categorie.hasMany(models.SubCategorie, {
      foreignKey: {
        name: 'subCategorieId',
        allowNull: false,
      },
    });
  };

  return Categorie;
};
