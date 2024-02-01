const express = require("express");

const router = express.Router();

const { v4 } = require("uuid");
const multer = require("multer");
// Configuration de notre multer avec les otpions de destinations et de taille
// cb fonctionne comme next, il fait les choses les unes apres les autres
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    const name = `${v4()}-${file.originalname}`;
    req.body.url = name;
    cb(null, name);
  },
});

// on passe les option définis plus haut au multer
const uploadImg = multer({ storage });

/* ********************+***************************************************** */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const contactControllers = require("./controllers/contactControllers");
// Import auth services for security operations
const { hashPassword, verifyToken } = require("./services/auth");

// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/contact", contactControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);
router.get("/contact/:id", contactControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
router.post("/contact", uploadImg.single("image"), contactControllers.add);

// // Route to add a new item
router.post("/user", hashPassword, userControllers.add);

// Route to modify item
router.put("/contact/:id", contactControllers.update);

// // Route to authentification
router.post("/login", authControllers.login);

//  ROute to delete item
router.delete("/contact/:id", contactControllers.destroy);

router.use(verifyToken);

router.get("/userbytoken", userControllers.getbytoken);
/* ************************************************************************* */

module.exports = router;
