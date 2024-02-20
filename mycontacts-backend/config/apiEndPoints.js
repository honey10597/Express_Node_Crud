
const CONTACTS_END_POINT = require("api/contacts/")
const USER_END_POINT = require("api/users/")

const GET_ALL_CONTACT = require("get-all-contacts")
const CREATE_NEW_CONTACT = require("create-new-contact")
const GET_PARTICULAR_CONTACT = require("get-particular-contact?id=:id")
const UPDATE_CONTACT = require("update-contact?id=:id")
const DELETE_CONTACT = require("delete-contact?id=:id")

const REGISTER_USER = require("register-user")
const LOGIN = require("login")
const GET_MY_DETAILS = require("get-my-details")

module.exports = {
    CONTACTS_END_POINT,
    USER_END_POINT,
    GET_ALL_CONTACT,
    CREATE_NEW_CONTACT,
    GET_PARTICULAR_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    REGISTER_USER,
    LOGIN,
    GET_MY_DETAILS
}