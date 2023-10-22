"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const registerValidate_1 = require("../utils/registerValidate");
const userModel_1 = __importDefault(require("../models/userModel"));
const dataHashing_1 = require("../utils/dataHashing");
const envalid_1 = require("envalid");
const loginValidate_1 = require("../utils/loginValidate");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // form validation
    const { errors, isValid } = (0, registerValidate_1.validateRegisterInput)(req.body);
    try {
        //   check validation
        if (!isValid) {
            res.status(500).json(errors);
        }
        const existingUser = yield userModel_1.default.findOne({ email: envalid_1.email });
        if (existingUser) {
            res
                .status(400)
                .json({ message: "a user with that email already existed" });
        }
        const hashedPassword = yield (0, dataHashing_1.hashData)(req.body.password);
        const newUser = yield userModel_1.default.create({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // form validation
    const { errors, isValid } = (0, loginValidate_1.loginValidate)(req.body);
    try {
        if (!isValid) {
            res.status(500).json(errors);
        }
        const user = yield userModel_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json("no user asscociated with provided email");
        }
        const hashedPassword = user.password;
        const passwordMatch = yield (0, dataHashing_1.verifyHashedData)(hashedPassword, req.body.password);
        if (!passwordMatch) {
            res.status(400).json("Incorrect passwword");
        }
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
