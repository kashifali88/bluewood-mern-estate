import axios from 'axios'

const apiRequest = axios.create({
    baseURL: "http://localhost:8081/api",
    withCredentials: true

})

export default apiRequest