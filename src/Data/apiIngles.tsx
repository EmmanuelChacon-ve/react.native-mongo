import axios from "axios";

// Usa la IP local de tu máquina
const IP_LOCAL = 'http://192.168.0.7:3000';

const ApiIngles = axios.create({
    baseURL: `${IP_LOCAL}/v1`,
    headers: {
        "Content-Type": 'application/json'
    }
});

const ApiInglesForImage = axios.create({
    baseURL: `${IP_LOCAL}/v1`,
    headers: {
        "Content-Type": 'multipart/form-data',
        "accept": 'application/json',
    }
});

export { ApiIngles, ApiInglesForImage };