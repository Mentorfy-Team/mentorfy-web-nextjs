import { FileToUrl } from '~/services/file-upload.service';
import { FileType } from '..';

export default async (files: FileType[], refId) => {
  const readyFiles = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file?.sourceUrl) {
      const url = await FileToUrl(file.file, refId);
      file.sourceUrl = url as string;
      delete file.data;
      delete file.file;
      readyFiles.push(file);
    } else {
      delete file.data;
      delete file.file;
      readyFiles.push(file);
    }
  }

  return readyFiles;
};
