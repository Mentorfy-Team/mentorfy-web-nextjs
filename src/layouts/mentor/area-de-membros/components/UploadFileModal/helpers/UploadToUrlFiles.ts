import { FileToUrl } from "~/services/file-upload.service";
import { FileType } from "..";

export default async (files:FileType[])=>{
  const readyFiles = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file.sourceUrl){
      const url = await FileToUrl(file);
      file.sourceUrl = url as string;
      readyFiles.push(file);
    } else {
      readyFiles.push(file);
    }
    
  }
}