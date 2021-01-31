module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Categorie.associate = (models) => {
    Categorie.hasMany(models.SubCategorie, {
      foreignKey: {
        name: 'categorieId',
        allowNull: false,
      },
    });
  };

  return Categorie;
};
