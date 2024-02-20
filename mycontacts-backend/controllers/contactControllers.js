//@desc Get all contacts
//@route GET /api/contacts
//access publlic

const expressAsyncHandler = require("express-async-handler")
const Contact = require("../models/contactsModels")

const getAllContact = expressAsyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts)
})

const getContact = expressAsyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        console.log('====================================');
        console.log(contact, "contactcontactcontact");
        console.log('====================================');
        res.status(200).json(contact)
    } catch (error) {
        res.status(400);
        throw new Error("Contact not found");
        console.log(error, "errorerrorerror");
    }
})

const createContact = expressAsyncHandler(async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact)
})

const updateContact = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req?.params?.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found");
    }
    if (contact.user.id !== req.id) {
        res.status(403)
        throw new Error("You don't have permission to update this contact")
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updateContact)
})

const deleteContact = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found");
    }
    if (contact.user.id !== req.id) {
        res.status(403)
        throw new Error("You don't have permission to update this contact")
    }
    // await contact.remove()
    await contact.deleteOne({ _id: req.params.id })
    res.status(200).json(contact)
})

module.exports = {
    getAllContact,
    getContact,
    createContact,
    updateContact,
    deleteContact
};