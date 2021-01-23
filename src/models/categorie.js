module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  });

  Categorie.associate = (models) => {
    Categorie.hasMany(models.Product, {
      foreignKey: {
        name: 'categorieId',
        allowNull: false,
      },
      as: 'product',
    });
  };

  return Categorie;
};
