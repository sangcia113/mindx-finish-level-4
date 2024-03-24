import axios from 'axios';
const instanceConnection = accessToken =>
    axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });
export default instanceConnection;
