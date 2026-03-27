import { children, createChild } from "./data.js";
import { createInputWrapper, createChildCard } from "./ui.js";

// Main UI elements
const dashboard = document.getElementById("dashboard"); // Main dashboard container
const addBtn = document.querySelector(".add-btn"); // Button to add new child
const childList = document.getElementById("child-list"); // Container for displaying child card

const childName = document.querySelector(".child-name");
const childBirth = document.querySelector(".child-birth");
const childHeight = document.querySelector(".child-height");
const childWeight = document.querySelector(".child-weight");
const childGender = document.querySelector(".child-gender");

const editBtn = document.querySelector(".edit-btn");
const deleteBtn = document.querySelector(".delete-btn");
