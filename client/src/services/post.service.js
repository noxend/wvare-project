import axios from 'axios';

export default class PostService {
  create = async data => {
    const result = await axios.post('/api/post', data);
    return result;
  };

  getAllPosts = async () => {
    const result = await axios.get('/api/post/get-all-posts');
    return result;
  };

  getUsersPosts = async id => {
    const result = await axios.get(`/api/post/get-users-posts/${id}`);
    return result;
  };

  uploadImage = async data => {
    const result = await axios.post('/api/upload', data);
    return result;
  };

  putLike = async (postId, userId) => {
    const result = await axios.put(`/api/post/put-like/${postId}`, {
      data: userId
    });
    return result;
  };

  uploadHeaderImage = async data => {
    let progress = null;
    const result = await axios.post('/api/post/upload-image-header', data, {
      onUploadProgress: e => {
        process = Math.round((e.loaded / e.total) * 100);
      }
    });
    return { result, progress };
  };

  initPost = async id => {
    const result = await axios.post(`/api/post/init-post`, { id });
    return result;
  };
}
