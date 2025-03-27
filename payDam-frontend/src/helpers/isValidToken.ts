import axiosInstance from "./axiosInstance";
 
export async function isValidToken () {
    try {
        const response = await axiosInstance.get('/api/v1/auth/isValidToken')
        return response.data.success ;
    } catch (error) {
        console.error(error)
    }
}