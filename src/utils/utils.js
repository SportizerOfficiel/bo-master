import axios from "axios"

const config = {
    headers: {
        authorization: localStorage.getItem("token")
    }
}

export const postRequest = async (path, body) => {
    try {
        return await axios.post(`${process.env.REACT_APP_URL_API}/${path}`, body, config)
    } catch (e) {

    }
}

export const putRequest = async (path, body) => {
    try {
        return await axios.put(`${process.env.REACT_APP_URL_API}/${path}`, body, config)
    } catch (e) {

    }
}

export const getRequest = async (path) => {
    try {
        return await axios.get(`${process.env.REACT_APP_URL_API}/${path}`, config)
    } catch (e) {

    }
}

export const deleteRequest = async (path) => {
    try {
        return await axios.delete(`${process.env.REACT_APP_URL_API}/${path}`, config)
    } catch (e) {

    }
}