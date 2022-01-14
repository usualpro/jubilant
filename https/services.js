import Axios from "axios";

const AxiosInstance = Axios.create({
    baseURL: 'https://restcountries.com/v3.1/'
})

export const Services = {
    getAllCountries: () => AxiosInstance.get('all')
}