import { jwtDecode } from 'jwt-decode';
const verifyToken = () => {
    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    if (!accessToken) return false;
    try {
        return jwtDecode(accessToken);
    } catch (error) {
        return false;
    }
};
export default verifyToken;
