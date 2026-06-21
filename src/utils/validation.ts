export interface SignupErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  leadSource?: string;
  interest?: string;
}

export function validateSignupForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  leadSource: string;
  interest: string;
}): SignupErrors {
  const errors: SignupErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password =
      "Password must be at least 8 characters";
  }

  if (!data.leadSource) {
    errors.leadSource =
      "Please select a lead source";
  }

  if (!data.interest) {
    errors.interest =
      "Please select an interest";
  }

  return errors;
}