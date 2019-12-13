import axios from "axios"

export default class Services {
    constructor() {
        this._service = axios.create({
            baseURL: 'https://financialmodelingprep.com/api/v3',
            // withCredentials: true
            // withCredentials: "include"

        })
    }

    getAllValues = () => this._service.get('/company/stock/list')
    getMostActive = () => this._service.get('/stock/actives')
    getGainer = () => this._service.get('/stock/gainers')
    getLoser = () => this._service.get('/stock/losers')
    getProfile = (value) => {
        console.log(value)
       return this._service.get(`/company/profile/${value}`)
    }
    getRating = (value) => this._service.get(`/company/rating/${value}`)
    getRealTime = (value) => this._service.get(`/stock/real-time-price/${value}`)
    getHistoric = (value) => this._service.get(`/historical-price-full/${value}?timeseries=21`)
    getMarketList = () => this._service.get('/company/stock/list')

}