
import axios from 'axios';

export default class PostService {

  create = async (data) => {
    const result = await axios.post('/api/post', data);
    return result;
  }

  getAllPosts = async () => {
    const reuslt = await axios.get('/api/post');
    return reuslt;
  }

  uploadImage = async (data) => {
    const result = await axios.post('/api/upload', data);
    return result;
  }

  uploadHeaderImage = async (data) => {
    let progress = null;
    const result = await axios.post('/api/post/upload-image-header', data, {
      onUploadProgress: e => {
        process = Math.round(e.loaded / e.total * 100);
      }
    });
    return {result, progress};
  }

  initPost = async (id) => {
    const result = await axios.post(`/api/post/init-post`, {id});
    return result; 
  }
}
