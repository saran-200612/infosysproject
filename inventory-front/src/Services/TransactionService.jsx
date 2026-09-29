import axios from 'axios';

const BASE      = process.env.REACT_APP_API_BASE_URL;
const STOCK_URL = `${BASE}/stock`;
const TRANS_URL = `${BASE}/trans`;
const ID_URL    = `${BASE}/trans-id`;
const ANA_URL   = `${BASE}/analysis`;

export const saveTransaction = (transaction) => {
    return axios.post(STOCK_URL, transaction, {
        withCredentials: true
    });
}

export const findTransactionById = (id) => {
    return axios.get(`${STOCK_URL}/${id}`, {
        withCredentials: true
    });
}

export const removeTransactionById = (id) => {
    return axios.delete(`${STOCK_URL}/${id}`, {
        withCredentials: true
    });
}

// flag: 1 = IN, 2 = OUT
export const transactionIdGenerate = (flag) => {
    return axios.get(`${ID_URL}/${flag}`, {
        withCredentials: true
    });
}

export const findTransactionByType = (type) => {
    return axios.get(`${TRANS_URL}/${type}`, {
        withCredentials: true
    });
}

export const getDemandByProduct = (product) => {
    return axios.get(`${ANA_URL}/${product}`, {
        withCredentials: true
    });
}

export const getDemandByDate = (date) => {
    return axios.get(`${ANA_URL}/date/${date}`, {
        withCredentials: true
    });
}

export const getProductWiseTotalSale = () => {
    return axios.get(`${ANA_URL}`, {
        withCredentials: true
    });
}