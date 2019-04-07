
import axios from 'axios';

export default class ApiService {
  login = async (login, password) => {
    const res = await axios.post('/api/auth/login', { login, password });
    return res;
  };
}
