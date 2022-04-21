const { listProductsService, getProductService, searchProductService } = require("../services/products");

const listProducts = async (req, res) => {
  const { pagination } = req.params;

  const response = await listProductsService(pagination); // Envia informações da paginação para o service 
  res.send({
    status: true,
    products: response,
  });
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  const response = await getProductService(id); // Envia informação do id do produto para o service 
  res.send({
    status: true,
    product: response,
  });
};

const searchProduct = async (req, res) => {
  const { parameter } = req.params;

  const response = await searchProductService(parameter); // Envia informação do id do produto para o service
  if (response.name === "Error") {
    res.send({
      status: false,
      msg: 'Produto não encontrado',
    });
  } else {
    res.send({
      status: true,
      product: response,
    });
  }
};

module.exports = { listProducts, getProduct, searchProduct };
