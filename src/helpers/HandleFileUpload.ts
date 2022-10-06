export default (target) => {
  if (!target.files || target.files.length <= 0) return;
  const files = [];
  for (let i = 0; i < target.files.length; i++) {
    const fileReader = new FileReader();
    const file = target.files[i];
    let type = 'none';
    if (file.type.includes('/'))
      type = target.files[i].type.split('/')[1];
    
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      files.push({
        name: file.name,
        type,
        size: file.size,
        data: fileReader.result,
      });
    };
  }

  return files;
};