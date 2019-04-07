import axios from "axios";

export default class UserService {

  getUserById = async (id) => {
    const result = await axios.get(`/api/user/${id}`);
    return result;
  }

  getUserByUsername = async (username) => {
    const result = await axios.get(`/api/user/by-username/${username}`);
    return result;
  }

  uploadHeaderImage = async (data) => {
    let progress = null;
    const result = await axios.post('/api/user/upload-image-header', data, {
      onUploadProgress: e => {
        process = Math.round(e.loaded / e.total * 100);
      }
    });
    return {result, progress};
  }

}