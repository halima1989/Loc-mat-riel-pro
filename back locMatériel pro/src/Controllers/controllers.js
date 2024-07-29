const { pool } = require("../Services/sql");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { transporter } = require('../Services/mailer');
require('dotenv').config();



const register = async (req, res) => {
  console.log("je suis dans le controller register")
  if (
    !req.body.nom ||
    !req.body.prénom ||
    !req.body.email ||
    !req.body.password ||
    !req.body.téléphone||
    !req.body.adresse 

  ) {
    res.status(400).json({ error: 'missing fields' })
    return
  }  
  let nom = req.body.nom
  let prénom = req.body.prénom
  let email = req.body.email
  let password = req.body.password
  let téléphone = req.body.téléphone
  let adresse = req.body.adresse
  console.log("le mail est ", email)
  const values = [email]
  const sqlCheck = `SELECT email FROM client WHERE email = ?`
  try {

    const [result] = await pool.execute(sqlCheck, values)
    console.log("la verif de ladresse mail",result)
    if (result.length !== 0) {
      res.status(400).json({ error: 'Invalid credentials' }) 
      return
    } else {
      const hash = await bcrypt.hash(password, 10)
      const hashEmail = await bcrypt.hash(email, 10)
      const cleanToken = hashEmail.replaceAll('/',"")
      const sqlInsert =
        'INSERT INTO `client` VALUES (NULL,?, ?, ?, ?, ?, ?, 1, 0 ,? )'


      const insertValues = [nom, prénom, email, hash, téléphone, adresse,cleanToken]

      const [rows] = await pool.execute(sqlInsert, insertValues)

       if (rows.affectedRows > 0) {
        const info = await transporter.sendMail({
          from: `${process.env.SMTP_EMAIL}`,
          to: email,
          subject: 'Email activation',
          text: 'Activate your remail',
          html: `<p> You need to activate your email, to access our services, please click on this link :
                <a href="http://localhost:3002/api/email/validate/${cleanToken}">Activate your email</a>
          </p>`,
        })
       return  res.status(201).json({ success: 'registration successfull' })
        
      } else {
        res.status(500).json({ error: 'registration failed.' })
        return
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erreur serveur' })
    return
  }
};
const valideAccount = async (req, res) => {
  try {
    console.log("ici");
    const token = req.params.token;
    const sql = `SELECT * FROM client WHERE token = ?`;
    const values = [token];
    const [result] = await pool.execute(sql, values);
    if (!result) {
      res.status(204).json({ error: 'Invalid credentials' });
      return;
    }
    await pool.execute(
      `UPDATE client SET isActive = 1, token = NULL WHERE token = ?`,
      [token]
    );
    res.status(200).json({ result: 'registration successfull' });
  } catch (error) {
    res.status(500).json({ error: error.stack });
    console.log(error.stack);
  }
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ error: 'missing fields' })
    return
  }

  const email = req.body.email
  const password = req.body.password

  try {
    const values = [email]
    const sql = `SELECT * FROM client WHERE email = ? `
    const [result] = await pool.query(sql, values)
    if (result.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    } else {
      await bcrypt.compare(
        password,
        result[0].password,
        function (err, bcyrptresult) {
          if (err) {
            res.status(401).json({ error: 'Invalid credentials' })
            return
          }
          const token = jwt.sign(
            {
              email: result[0].email,
              client_id: result[0].client_id,
            },
            process.env.MY_SUPER_SECRET_KEY,
            { expiresIn: '20d' }
          )
          console.log(result[0].role_id)
          res.status(200).json({ jwt: token, role: result[0].role_id })
          return
        }

      )
    }
  } catch (error) {
    console.log(error.stack)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}


const ctrlAllclients = async (req, res) => {

  try {
    const [rows, fields] = await pool.query(`SELECT * FROM client`);
    console.log(rows);
    res.json(rows)
  } catch (err) {
    console.log(err);

  }
};
const ctrlOneClient = async (req, res) => {
  const client_id = req.params.client_id;
  const sql = `SELECT * FROM client WHERE client_id=?`;
  const values = [client_id];
  const [rows] = await pool.execute(sql, values);
  res.json(rows);
};
const ctrlAllEngin = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute(`SELECT * FROM engin`);
    console.log(rows);
    res.json(rows);

  } catch (err) {
    console.log(err);
  }
}


const ctrlOneEngin = async (req, res) => {
  const client_id = req.params.client_id;
  const sql = `SELECT * FROM engin WHERE engin_id=?`;
  const values = [client_id];
  const [rows] = await pool.execute(sql, values);
  res.json(rows);

};


const insertOneEngin = async (req, res) => {
  console.log(req.body)
  const nom = req.body.nom
  const catégorie = req.body.catégorie
  const description = req.body.description
  const Nb_exemplaires = req.body.Nb_exemplaires
  const prix_location = req.body.prix_location
  const sql = `INSERT INTO engin (nom, image, catégorie, description, Nb_exemplaires, prix_location) VALUES (?,?, ?, ?, ?, ?)`;
  //vérification du body (validator)
  const values = [nom, image , catégorie, description, Nb_exemplaires, prix_location];
  console.log("values", values)
  const [rows, fields] = await pool.execute(sql, values);

  res.json(rows);
  console.log(rows);

};

const ctrlUpdateEngin = async (req, res) => {
  try {
    
    let data = req.data;
    let values = req.values;
    const sql = `UPDATE engin SET ${data} where engin_id= ? `;
    const [result] = await pool.execute(sql, values);
    res.status(200).json(result);

  } catch (error) {

    console.log(error.stack);
    res.status(500).json({ message: "erreur serveur" });
  }
};

const ctrlDeleteEngin = async (req, res) => {
  try{
    const [rows] = await pool.execute(`DELETE FROM engin WHERE engin_id = ?`, [req.params.engin_id]);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "erreur serveur" });
  }
};

const ctrlLouerEngin = async (req, res) => {

  try {
   console.log("coucou") 
    const { date_début_location, date_fin_location, engin_id, client_id } = req.body;
    const sql = 'INSERT INTO louer (date_début_location, date_fin_location, engin_id, client_id) VALUES (?, ?, ?, ?)';
    const [rows]= await pool.execute(sql, [date_début_location, date_fin_location, engin_id, client_id]);
    res.status(201).json({ message: 'Location créée avec succès' });
  
  }
  catch (error) {
    console.error(error.stack);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const ctrlAllLocations = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM louer');
    res.status(200).json(rows);

    const token = jwt.sign(
      {
        email: result[0].email,
        client_id: result[0].client_id,
      },
      process.env.MY_SUPER_SECRET_KEY,
      { expiresIn: '20d' }
    )
    console.log()
    res.status(200).json({ jwt: token })
    return
  }

  catch (error) {
    console.log(error.stack)
    res.status(500).json({ message: 'Erreur serveur' })
  }

};


const testEmail = async (req, res) => {
  const info = await transporter.sendMail({
    from: `${process.env.SMTP_EMAIL}`, 
    to: 'amatollah.arabi89@gmail.com', 
    subject: 'bienvenue', 
    text: 'Hello ${nom}',
    html: '<b>Hello world? </b>', 
  })

  console.log('Message sent: %s', info.messageId)
  res.status(200).json(`Message send with the id ${info.messageId}`)
}

// const CtrlInsertImage = async (req, res)=>{
//   if (err) {
//     res.status(500).json({ message: 'Erreur lors du téléchargement du fichier', error: err });
//   } else {
//     // L'image a été téléchargée avec succès, vous pouvez traiter les données ici
//     const newFileName = req.file.filename;
//     res.status(200).json({ message: 'Image téléchargée avec succès', newFileName: newFileName });
//   }
    
// }










module.exports = { register, login, ctrlAllclients, ctrlOneClient, ctrlAllEngin, ctrlOneEngin, insertOneEngin, ctrlUpdateEngin, ctrlDeleteEngin, ctrlLouerEngin, ctrlAllLocations, testEmail, valideAccount};