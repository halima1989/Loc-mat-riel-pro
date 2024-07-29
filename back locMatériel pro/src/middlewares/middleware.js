var validator = require("validator");
const jwt = require('jsonwebtoken');

const verifDataClient = async (req, res, next) => {

  const { nom, prénom, email, password,téléphone, adresse } = req.body;
  //  vérification du body CLIENT 
  if (!validator.isAlpha(nom)) {
    return res.status(400).json({ message: "le nom doit contenir que des lettres." });
  }
  if (!validator.isAlpha(prénom)) {
    return res.status(400).json({ message: "le prénom doit contenir que des lettres." });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "l'adresse mail n'est pas valide." });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "le mot de passe n'est pas valide." });
  }
  if (!validator.isAlpha(adresse, ({min:1}))) {
    return res.status(400).json({ message: "l'adresse n'est pas valide." });
  }
  if (!validator.isMobilePhone(téléphone)) {
    return res.status(400).json({ message: "le format de téléphone n'est pas valide." });
  }

  next();
};




//vérification du body ENGIN

const verifDataEngin = async (req, res, next) => {

  const { nom, catégorie, description, Nb_exemplaires, prix_location } = req.body;

  if (!nom || !validator.isLength(nom, { min: 1 })) {
    return { success: false, message: "Le nom de l'engin est requis." };
  }

  if (!catégorie || !validator.isLength(catégorie, { min: 1 })) {
    return { success: false, message: "La catégorie de l'engin est requise." };
  }

  if (!description || !validator.isLength(description, { min: 1 })) {
    return { success: false, message: "La description de l'engin est requise." };
  }

  if (!Nb_exemplaires || !validator.isInt(Nb_exemplaires.toString())) {
    return { success: false, message: "Le nombre d'exemplaires doit être un entier valide." };
  }

  if (!prix_location || !validator.isFloat(prix_location.toString())) {
    return { success: false, message: "Le prix de location doit être un nombre décimal valide." };
  }

  next();
}
;
const verifUpdate = async (req, res, next) => {
  const engin_id = req.params.engin_id;
  const { nom, catégorie, description, Nb_exemplaires, prix_location } = req.body;
  let data = [];
  let values = [];
  if (nom) {
    data.push("nom= ?");
    values.push(nom);
  }
  if (catégorie) {
    data.push("catégorie= ?");
    values.push(catégorie);
  }
  if (description) {
    data.push("description= ?");
    values.push(description);
  }
  if (Nb_exemplaires) {
    data.push("Nb_exemplaires = ?");
    values.push(Nb_exemplaires);
  }
  if (prix_location) {
    data.push("prix_location = ?");
    values.push(prix_location);
  }
  console.log(values);
  if (data.length == 0) {
    return res.json({ message: "vous n'avez modifié aucune donnée" });
  }
  values.push(engin_id);
  data = data.join(",");
  req.data = data;
  req.values = values;
  next();

}
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'JWT non fourni' });
  }

  jwt.verify(token, process.env.MY_SUPER_SECRET_KEY,async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'JWT invalide' });
    }

    let id = decoded.id;
   try {
    const sql = `SELECT * FROM client WHERE client_id=?`;
    const [rows]= await pool.execute (sql ,[id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Client non trouvé' })
    }
    req.id= id;
   next()
   } catch (error) {
    return res.status(500).json({ message: 'Erreur' });

   }
  })};

module.exports = { verifDataClient, verifDataEngin, verifUpdate , verifyToken};