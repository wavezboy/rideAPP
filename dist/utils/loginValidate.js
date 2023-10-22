"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidate = void 0;
const is_empty_1 = __importDefault(require("is-empty"));
const validator_1 = __importDefault(require("validator"));
const loginValidate = (data) => {
    const errors = { email: "", password: "" };
    // Converts empty fields to String in order to validate them
    data.email = (0, is_empty_1.default)(data.email) ? data.email : "";
    data.password = (0, is_empty_1.default)(data.password) ? data.password : "";
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "email field is required";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "password field is require";
    }
    return {
        errors,
        isValid: (0, is_empty_1.default)(errors),
    };
};
exports.loginValidate = loginValidate;
