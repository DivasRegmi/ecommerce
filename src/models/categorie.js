module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define(
    'Categorie',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      paranoid: true,
    }
  );

  Categorie.associate = (models) => {
    Categorie.hasMany(models.SubCategorie, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'categorieId',
        allowNull: false,
      },
    });
  };

  return Categorie;
};
