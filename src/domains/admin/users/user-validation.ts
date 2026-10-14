export function validateNewUser(input: {
  email: string;
  password: string;
  name: string;
  selectedRoles: string[];
}): Record<string, string> {
  const errs: Record<string, string> = {};
  const trimmedEmail = input.email.trim();
  if (!trimmedEmail) {
    errs.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errs.email = "Enter a valid email address.";
  } else if (trimmedEmail.length > 254) {
    errs.email = "Email must not exceed 254 characters.";
  }

  if (!input.password) {
    errs.password = "Password is required.";
  } else if (input.password.length < 12) {
    errs.password = "Password must be at least 12 characters.";
  } else if (input.password.length > 128) {
    errs.password = "Password must not exceed 128 characters.";
  }

  if (input.name.trim().length > 120) {
    errs.name = "Name must not exceed 120 characters.";
  }

  if (input.selectedRoles.length === 0) {
    errs.roles = "Assign at least one role.";
  } else if (input.selectedRoles.length > 10) {
    errs.roles = "Cannot assign more than 10 roles.";
  }

  return errs;
}
