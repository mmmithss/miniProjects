import {json} from "express";
import Contact from "../model/Contact.js";
import mongoose from "mongoose";

export const createContact = async (req, res) => {
  try {
    console.log(req.body);
    const {fullName, phoneNumber, location, email, notes} = req.body;
    console.log(phoneNumber);
    if (!fullName || !phoneNumber) {
      return res.status(400).json({
        error: "Missing fields",
        missing: [
          !fullName
            ? "fullName"
            : null,
          !phoneNumber
            ? "phoneNumber"
            : null
        ].filter(Boolean)
      });
    }

    const existingName = await Contact.findOne({fullName: fullName});
    if (existingName) {
      return res.status(409).json({error: "Name Already Exixts"});
    }

    const existingPhone = await Contact.findOne({phoneNumber: phoneNumber});
    if (existingPhone) {
      return res.status(409).json({error: "Phone Number Already Exists"});
    }
    const newUser = await Contact.create({
      fullName: fullName,
      phoneNumber: phoneNumber,
      location: location || "",
      email: email || "",
      notes: notes || ""
    });

    return res.status(201).json({success: "Successfully Created New User", newUser});
  } catch (error) {
    console.log("Error in createContact Controller");
    console.error(error);
    return res.status(500).json({error: "Internal Server Error"});
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const allContacts = await Contact.find();
    return res.status(200).json({allContacts});
  } catch (error) {}
  res.error("error in getAllContacts Controller", error);
  return res.status(500).json({error: "Internal Server Error"});
};

export const getContact = async (req, res) => {
  try {
    const contactID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(contactID)) {
      return res.status(400).json({message: "Invalid Contact Id"});
    }

    const contact = await Contact.findById(contactID);

    if (!contact) {
      return res.status(404).json({message: `No contact with id ${contactID}`});
    }

    return res.status(200).json({success: "Contact found ", contact});
  } catch (error) {
    console.log("Error in getContact Controller");
    console.error(error);
    return res.status(500).json({error: "Internal Server Error"});
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(contactID)) {
      return res.status(400).json({message: "Invalid Contact Id"});
    }

    const contact = await Contact.findById(contactID);

    await Contact.findByIdAndDelete(contactID);

    return res.status(200).json({success: "Successfully deleted contact", contact});
  } catch (error) {
    console.log("Error in deleteContact Controller");
    console.error(error);
    return res.status(500).json({error: "Internal Server Error"});
  }
};

export const updateContact = async (req, res) => {
  try {
    const contactID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(contactID)) {
      return res.status(400).json({message: "Invalid Contact Id"});
    }

    const {fullName, phoneNumber, location, email, notes} = req.body;
    const existingName = await Contact.findOne({
      fullName: fullName,
      _id: {
        $ne: contactID
      }
    });
    if (existingName) {
      return res.status(409).json({error: "Name Already Exixts"});
    }

    const existingPhone = await Contact.findOne({
      phoneNumber: phoneNumber,
      _id: {
        $ne: contactID
      }
    });
    if (existingPhone) {
      return res.status(409).json({error: "Phone Number Already Exists"});
    }

    const updatedContact = await Contact.findByIdAndUpdate(contactID, {
      fullName: fullName,
      phoneNumber: phoneNumber,
      location: location || "",
      email: email || "",
      notes: notes || ""
    });
    return res.status(200).json({success: "Successfully updated contact", updatedContact});
  } catch (error) {
    console.log("Error is Update Contact Controller", error);
    return res.status(500).json({error: "Internal Server error"});
  }
};
