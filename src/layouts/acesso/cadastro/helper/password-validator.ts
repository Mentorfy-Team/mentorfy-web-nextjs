export default (password: string) => {
  let minChars = false,
    hasNumber = false,
    hasUpper = false,
    hasSpecial = false;

  if (!password)
    return {
      minChars,
      hasNumber,
      hasUpper,
      hasSpecial,
      passed: false,
    };

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
