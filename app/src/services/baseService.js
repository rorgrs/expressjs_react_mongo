import axios from 'axios'

let opts;
if (typeof window !== 'undefined') {
    opts = {
        headers: {
            'token': window.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }
}

const BaseService = {
    post: async function (route, data) {
        var resp;
        try {
            resp = await axios.post(process.env.NEXT_PUBLIC_URL_API + route, data, opts)
        } catch (err) {
            resp = err.response
        }
        return resp.data
    },
    get: async function (route) {
        var resp;
        try {
            resp = await axios.get(process.env.NEXT_PUBLIC_URL_API + route, opts)
        } catch (err) {
            resp = err.response
        }
        return resp.data
    },
    put: async function (route, data) {
        var resp;
        try {
            resp = await axios.put(process.env.NEXT_PUBLIC_URL_API + route, data, opts)
        } catch (err) {
            resp = err.response
        }
        return resp.data
    },
    delete: async function (route) {
        var resp;
        try {
            resp = await axios.delete(process.env.NEXT_PUBLIC_URL_API + route, opts)
        } catch (err) {
            resp = err.response
        }
        return resp.data
    }
}

export default BaseService