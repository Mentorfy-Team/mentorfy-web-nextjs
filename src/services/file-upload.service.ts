import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const FileToUrl = async (
  file
): Promise<string | { error: any }> => {
  try {
    var formData = new FormData();
    formData.append("file", file);
    const response = await HttpClient.post(ApiRoutes.upload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })

    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};