import { ApiRoutes } from '@app/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const FileToUrl = async (file, id): Promise<string | { error: any }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await HttpClient.post(
      ApiRoutes.upload + `?id=${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

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

export const FilesToDelete = async (
  files,
): Promise<string | { error: any }> => {
  try {
    if (files.length <= 0) return;
    const response = await HttpClient.post(ApiRoutes.upload_delete, files);

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
