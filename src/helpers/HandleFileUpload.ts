export default (files, onChange) => {
  if (!files || files.length <= 0) return;
  for (let i = 0; i < files.length; i++) {
    const fileReader = new FileReader();
    const file = files[i];
    let type = 'none';
    if (file.type.includes('/')) type = file.type.split('/')[1];

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const fl = {
        name: file.name,
        type,
        size: file.size,
        data: fileReader.result,
        file: file,
      };
      onChange(fl);
    };
  }
};
