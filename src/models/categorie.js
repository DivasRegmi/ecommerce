module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    itemCount: DataTypes.NUMBER,
  });
  return Categorie;
};
