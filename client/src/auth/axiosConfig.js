import axios from 'axios';

const instance = axios.create();

instance.defaults.withCredentials = true

export default instance;