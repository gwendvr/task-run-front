import axios from 'axios'

function getClientId() {
    let clientId = localStorage.getItem('clientId')
    if (!clientId) {
        clientId = crypto.randomUUID()
        localStorage.setItem('clientId', clientId)
    }
    return clientId
}

const api = axios.create({
    baseURL: 'https://task-run.onrender.com'
})

api.interceptors.request.use(config => {
    config.headers['X-Client-Id'] = getClientId()
    return config
})

export default api