const req = require('express/lib/request')
const houses = require('./db.json')
const housesId = 4;

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },

    deleteHouse: (req,res) => {
        let index = houses.findIndex(item => {
            +item.id === +req.params.id
          
        })
        houses.splice(index, 1)
        res.status(200).send(houses)
    }, 

    createHouse: (req, res) => {
        let newHouse = req.body
        newHouse.id = housesId
        houses.push(newHouse)
        res.status(200).send(houses)
        housesId++
    }, 



    updateHouse: (req, res) => {
        const addPrice = 10000;
        let editHouse = {};
        console.log(req.params, req.body);
        houses.forEach((house, index) => {
          if (house.id === Number(req.params.id)) {
            editHouse = house;
            houses.splice(index, 1);
          }
        });
        switch (req.body.type) {
          case 'plus':
            console.log('Plus');
            houses.push({ ...editHouse, price: editHouse.price + addPrice });
            res.status(200).send(houses);
            break;
          case 'minus':
            console.log('Minus');
            houses.push({ ...editHouse, price: editHouse.price - addPrice });
            res.status(200).send(houses);
            break;
          default:
            console.log('Nothing');
        }
      },

}
