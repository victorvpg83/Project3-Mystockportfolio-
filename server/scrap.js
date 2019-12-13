const cheerio = require('cheerio')
let jsonframe = require('jsonframe-cheerio');
const axios = require('axios')
const fs = require ('fs')




axios.get('https://www.infobolsa.es/mercado-nacional/mercado-continuo')
    .then(response => {
        // console.log(response.data)
        const $ = cheerio.load(response.data)
        // console.log($)
        const items = $('.fullTable .normal').toArray()
            // console.log(items)
            .map(item => {

                // console.log(item.next)
                const $item = $(item)
                // console.log($item.children)

                return {
                    title: $item.find('.name').text(),
                    valor: $item.find('.price').text(),
                    // cambio: $item.find('.change').text(),
                    // volumen: $item.find('.volume').text(),
                    // hora: $item.find('.hour').text()

                }
            })
        return items
        // const JSONarr = JSON.stringify(items)
        // const transf = items.map(elm => {
            // console.log(typeof elm.title)
    .then (items => {
        fs.writeFile('./items.json',JSON.stringify(items), function(error){
            if (error) return console.log (error)
            console.log('items saved')
        })
    })
            // elm.title.replace(" ", "")

            // elm.title.trim()
            // console.log(elm.valor)
            // console.log(elm.title.replace(" ", ""))
    

        // console.log(JSONarr)
})





// let $ = cheerio.load('https://www.infobolsa.es/mercado-nacional/mercado-continuo')

// const valueList = []

console.log("holaaaaa")

// $('#instrumentListTable').each(function (idx, elm) {
//     valueList[idx] = {}

//     var header = $(elm).find('.normal');
//     valueList[idx]['name'] = $(header).find('[class=name]').text();
//     // companiesList[index]['description'] = $(header).find('[rel=description]').text();

//     console.log(valueList);


// })

// console.log(valueList)