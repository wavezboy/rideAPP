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
exports.verifyHashedData = exports.hashData = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashData = (data, saltRound = 10) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-useless-catch
    try {
        const hashedData = yield bcrypt_1.default.hash(data, saltRound);
        return hashedData;
    }
    catch (error) {
        throw error;
    }
});
exports.hashData = hashData;
const verifyHashedData = (hashed, unHashed) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-useless-catch
    try {
        const match = yield bcrypt_1.default.compare(hashed, unHashed);
        return match;
    }
    catch (error) {
        throw error;
    }
});
exports.verifyHashedData = verifyHashedData;
