export default (password: string) => {
  if (!password) return;
  let minChars = false,
    hasNumber = false,
    hasUpper = false,
    hasSpecial = false;

  if (password.length >= 8) minChars = true;
  if (password.match(/[0-9]/)) hasNumber = true;
  if (password.match(/[A-Z]/)) hasUpper = true;
  if (password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)) hasSpecial = true;

  return {
    minChars,
    hasNumber,
    hasUpper,
    hasSpecial,
    passed: minChars && hasNumber && hasUpper && hasSpecial,
  };
};
