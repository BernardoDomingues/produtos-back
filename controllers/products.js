const { listProductsService, findProductService } = require("../services/products");

const listProducts = async (req, res) => {
  const { pagination } = req.params;
  console.log(pagination);

  const response = await listProductsService(pagination); // Envia informações da paginação para o service 
  res.send({
    status: true,
    products: response,
  });
};

const findProduct = async (req, res) => {
  const { id } = req.params;

  const response = await findProductService(id); // Envia informação do id do produto para o service 
  res.send({
    status: true,
    product: response,
  });
};

module.exports = { listProducts, findProduct };
