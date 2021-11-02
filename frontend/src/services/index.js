import axios from 'axios'

const config = {
    baseURL: 'http://0.0.0.0:8000/',
}

export const getAPI = (url, cancel = {}) => {
    const getConfig = { ...config, ...cancel }
    return axios.get(url, getConfig).then(res => res.data)
}

export const postAPI = (url, payload) => {
    const headerConfig = { ...config }
    // if (headers) {
    //   headerConfig.headers['Content-Type'] = 'application/json'
    // }
    return axios.post(url, payload, headerConfig).then(res => res.data)
  }