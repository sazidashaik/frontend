import axios from 'axios'
export default axios.create({

    baseURL: 'http://localhost:8086/feedback',
    headers:{
        'content-type':'application/json'
    }
})