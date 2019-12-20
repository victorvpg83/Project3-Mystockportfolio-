import React from 'react'
import Service from '../../service/Value_service'
import { Container, Row, Table, Col } from 'react-bootstrap'
import ValueCardMarket from './ValueCardMarket'

class CalendarMarkets extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            values: [],
            holidays: [],
            holidayDates: []
        }
    }

    componentDidMount = () => this.updateMarket()

    updateMarket = () => {
        this._service.getMarketFest()
            .then(Markets =>{
//                 
                
                let hol = Object.keys(Markets.data.stockMarketHolidays[0])
                let dates = Markets.data.stockMarketHolidays.map(values => Object.values(values).join(" "))
      
                this.setState({values: Markets.data.stockMarketHolidays, holidays: hol, holidayDates: dates})
            }
                )    
            .catch(err => console.log("Error", err))
    }

    render() {
        // console.log(this.state.values)
        return (
            <section>
                <Container>
                <h3>Mercado</h3>
                    <Row>
                        <Col className="table-index" md={4}>

                   {this.state.values ? this.state.values.map(elm => {
                       let values =  Object.values(elm).map(e => <span>{e}</span>)
                       let keys = Object.keys(elm).map(e => <span>{e}</span>)
                       return (
                   <p>{values}: {keys}</p>
                       
                       )
                    //    console.log(elm)
                   }): null}
   
                            
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default CalendarMarkets