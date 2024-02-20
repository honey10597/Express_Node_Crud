const express = require("express");
const router = express.Router()

const {
    getAllContact,
    createContact,
    updateContact,
    deleteContact,
    getContact
} = require("../controllers/contactControllers");

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)

router.route("/get-all-contacts").get(getAllContact)
router.route("/create-contact").post(createContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = router;