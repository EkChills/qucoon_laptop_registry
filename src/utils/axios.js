import axios from 'axios'

export const customFetch = axios.create({
  baseURL:'https://418kwprqjk.execute-api.us-east-1.amazonaws.com/dev/'
})