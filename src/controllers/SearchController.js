const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//busca tdos os devs num raio 10km
//filtrar por tecnologia

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    //$in = operador lógico do MongoDB
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location:{
        $near: {
          $geometry:{
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        }
      }
    });

    return response.json({ devs });
  }
}