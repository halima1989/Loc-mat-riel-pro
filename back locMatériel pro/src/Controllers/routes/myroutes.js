const express = require("express");
const { ctrlAllclients, ctrlOneClient, ctrlAllEngin, ctrlOneEngin, insertOneEngin, register, login, ctrlUpdateEngin, ctrlDeleteEngin, ctrlLouerEngin, ctrlAllLocations, testEmail,valideAccount } = require("../controllers");
const { verifDataClient, verifDataEngin, verifUpdate, verifyToken } = require
    ("../../middlewares/middleware");
const router = express.Router()


router.post('/register',verifDataClient, register);
router.post('/login', login);
router.get('/client/all', ctrlAllclients);
router.get('/client/:client_id', ctrlOneClient);
router.post('/engin/add', insertOneEngin);
router.patch('/engin/update/:engin_id', verifUpdate, ctrlUpdateEngin);
router.get('/engin/all', ctrlAllEngin);
router.get('/engin/:engin_id', ctrlOneEngin);
router.delete('/deleteEngin/:engin_id', ctrlDeleteEngin);
router.post('/louerEngin',ctrlLouerEngin);
router.get('/allLocations', ctrlAllLocations);
router.get('/email',testEmail);
router.get('/email/validate/:token', valideAccount);


// router.post('/insertImage' ,upload, ctrlInsertImage);


module.exports = router;




