const express = require('express')
const router = express.Router()
const Value = require('../models/Value.model')
const User = require('../models/User.model')
const CloseValue = require('../models/CloseValue.model')



router.post('/new', (req, res) => {
    const value = req.body
// console.log(req)

    Value.create({
        symbol: req.body.symbol,
        qty: req.body.qty,
        buyPrice: req.body.buyPrice
    })
        .then(theNewValue => {

            console.log()
              User.findByIdAndUpdate(req.user._id, {
                $addToSet: { cartera: theNewValue._id }
              }, {new:true})
                .then(user => {

                  res.json({theNewValue,user})

                })
                .catch(err => console.log(err));

           
        })
        .catch(err => console.log('DB error', err))
})

router.get('/getAllValues', (req, res) => {
  console.log("ENTRA")
    User.findById(req.user._id)
    .populate("cartera")
        .then(allValues =>{
console.log(allValues)
          res.json(allValues)
        })
        .catch(err => console.log('DB error', err))
        


})

//crear asiento en registro de operaciones
router.post('/close', (req, res) => {
  const value = req.body
// console.log(req)

  CloseValue.create({
      symbol: req.body.symbol,
      qty: req.body.qty,
      buyPrice: req.body.buyPrice,
      sellPrice: req.body.sellPrice,
      comision: req.body.comision,
      bruto: req.body.bruto,
      neto: req.body.neto
  })
      .then(theNewValue => {

          console.log()
            User.findByIdAndUpdate(req.user._id, {
              $addToSet: { cartera: theNewValue._id }
            }, {new:true})
              .then(user => {

                res.json({theNewValue,user})

              })
              .catch(err => console.log(err));

         
      })
      .catch(err => console.log('DB error', err))
})



module.exports = router