import axiosInstance from "./axiosInstance";
 
// so in the starting this will check everytime if the token is valid or not 
export async function isValidToken () {
    try {
        const response = await axiosInstance.get('/api/v1/auth/isValidToken')
        return response.data.success ;
    } catch (error) {
        console.error(error)
    }
}