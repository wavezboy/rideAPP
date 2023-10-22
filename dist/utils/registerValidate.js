"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterInput = void 0;
const validator_1 = __importDefault(require("validator"));
const is_empty_1 = __importDefault(require("is-empty"));
const validateRegisterInput = (data) => {
    const errors = {
        name: "",
        email: "",
        password: "",
        pasword2: "",
        username: "",
    };
    // Converts empty fields to String in order to validate them
    data.name = !(0, is_empty_1.default)(data.name) ? data.name : "";
    data.email = !(0, is_empty_1.default)(data.email) ? data.email : "";
    data.password = !(0, is_empty_1.default)(data.password) ? data.password : "";
    data.password2 = !(0, is_empty_1.default)(data.password2) ? data.password2 : "";
    data.username = !(0, is_empty_1.default)(data.username) ? data.username : "";
    if (validator_1.default.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "password field is required";
    }
    if (validator_1.default.isEmpty(data.password2)) {
        errors.pasword2 = " confirm password field is required";
    }
    if (validator_1.default.isEmpty(data.username)) {
        errors.username = "username field is required";
    }
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "invalid email";
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!validator_1.default.equals(data.password, data.password2)) {
        errors.pasword2 = "password match";
    }
    return {
        errors,
        isValid: (0, is_empty_1.default)(errors),
    };
};
exports.validateRegisterInput = validateRegisterInput;
