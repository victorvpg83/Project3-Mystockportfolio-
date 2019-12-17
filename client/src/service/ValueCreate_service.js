import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/values',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    getOneValue = id => this._service.get(`/${id}`)
    getAllValues = () => this._service.get('/getAllValues')
    postValue = value => this._service.post('/new', value)
    
    //cerrar posición y añadir al registro de operacines
    closeValue = value => this._service.post('/close', value)
    getRegOp = () => this._service.get('/getregop')
}