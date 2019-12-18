const express = require('express')
const router = express.Router()
const Value = require('../models/Value.model')
const User = require('../models/User.model')
const CloseValue = require('../models/CloseValue.model')



router.post('/new', (req, res) => {
    const value = req.body
console.log(req.body)

  // Value.findOne({symbol: req.body.symbol})
  // .then(value => {
  //   if(!value) {
      Value.create({
        symbol: req.body.symbol,
        qty: req.body.qty,
        buyPrice: req.body.buyPrice
    })
        .then(theNewValue => {

              User.findByIdAndUpdate(req.user._id, {
                $addToSet: { cartera: theNewValue._id }
              }, {new:true})
                .then(user => {

                  res.json({theNewValue,user})

                })
                .catch(err => console.log(err));
         
        })
        .catch(err => console.log('DB error', err))
    // } else { console.log('La posición ya esta tomada')}
  // })


})

router.get('/getAllValues', (req, res) => {
    User.findById(req.user._id)
    .populate("cartera")
    .populate("registroOP")
        .then(allValues =>{
          res.json(allValues)
        })
        .catch(err => console.log('DB error', err))
})

//create value regOp
router.post('/close', (req, res) => {
  const value = req.body

  CloseValue.create({
      symbol: req.body.symbol,
      qty: req.body.qty,
      buyPrice: req.body.buyPrice,
      sellPrice: req.body.sellPrice,
      comision: req.body.comision,
      bruto: req.body.bruto,
      neto: req.body.neto
  })
      .then(theCloseValue => {

        Value.findOneAndDelete({symbol: req.body.symbol})
        .then(value => {
            User.findByIdAndUpdate(req.user._id, {
              $addToSet: { registroOP: theCloseValue._id },
              $pull: {cartera: value._id}}, {new:true})
              .populate("registroOP")
              .then(user => res.json({theCloseValue,user}))
              .catch(err => console.log(err));
        })
  
      })
      .catch(err => console.log('DB error', err))
})

router.get('/getregop', (req, res) => {
  // console.log("ENTRA")
    User.findById(req.user._id)
    .populate("registroOP")
        .then(allCloseValues =>{
// console.log(allValues)
          res.json(allCloseValues)
        })
        .catch(err => console.log('DB error', err))

})

module.exports = router