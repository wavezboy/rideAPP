import isEmpty from "is-empty";
import Validator from "validator";
export interface loginBody {
  email: string;
  password: string;
}

export const loginValidate = (data: loginBody) => {
  const errors = { email: "", password: "" };
  // Converts empty fields to String in order to validate them
  data.email = isEmpty(data.email) ? data.email : "";
  data.password = isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is require";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
