import Validator from "validator";
import isEmpty from "is-empty";

export interface RegisterBody {
  name: string;
  password: string;
  password2: string;
  email: string;
  username: string;
}

export const validateRegisterInput = (data: RegisterBody) => {
  const errors = {
    name: "",
    email: "",
    password: "",
    pasword2: "",
    username: "",
  };

  // Converts empty fields to String in order to validate them

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.username = !isEmpty(data.username) ? data.username : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.pasword2 = " confirm password field is required";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "username field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "invalid email";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.pasword2 = "password match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
