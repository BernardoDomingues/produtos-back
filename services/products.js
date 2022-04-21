const axios = require("axios");

const listProductsService = async (pagination) => {
  let finalList = [];
  let totalCount = 0;

  const initialList = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/?limit=9&offset=${pagination}`) // Realiza Requisição de dados base em API externa
    .then((res) => {
      totalCount = res.data.count;
      return res.data.results;
    });
  for (const pokemon of initialList) { // Coloca array de informações base em loop para buscar algumas informações detalhadas
    await axios.get(pokemon.url).then((res) => {
      const pokemon = res.data;
      finalList.push({ // Cria objeto de informações necessárias e adiciona ao array
      id: pokemon.id,
      name: pokemon.name,
      frontImage: pokemon.sprites.front_default,
      backImage: pokemon.sprites.back_default,
      });
    });
  };
  return {
    totalCount: totalCount,
    list: finalList,
  };
};

const findProductService = async (id) => {
  let data = {};
  await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => {
      const pokemon = res.data;
      data = {
        id: pokemon.id,
        name: pokemon.name,
        frontImage: pokemon.sprites.front_default,
        backImage: pokemon.sprites.back_default,
        types: pokemon.types,
        height: pokemon.height / 10,
        weight: pokemon.weight / 10,
        stats: pokemon.stats,
        abilities: pokemon.abilities,
      }
    })
    .catch((error) => error)
  return data;
};

module.exports = { listProductsService, findProductService };
