const AdjustName = (name: string) => {
  if (name.length <= 16) return name;
  const names = name.split(' ');
  if (names[0].length >= 16) return name.substring(0, 16) + '...';

  if (names[0].length + names[1].length <= 16) return `${names[0]} ${names[1]}`;

  const firtLetterSecondName = name.split(' ')[1].charAt(0).toUpperCase();

  return `${name.split(' ')[0]} ${firtLetterSecondName}.`;
};

export default AdjustName;
