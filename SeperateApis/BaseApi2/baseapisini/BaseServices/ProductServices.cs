using System;
using System.Collections.Generic;
using System.Text;
using BaseRepository;
using BaseModels;
using BaseExceptions.ProductException;
using Interfaces.ProductInterfaces;
namespace Services
{
    public class ProductServices : IProductServices<Product>
    {
        IProductRepository<Product> _repository;
        public ProductServices(IProductRepository<Product> repository)
        {
            _repository = repository;
        }
        public List<Product> GetProducts()
        {
            return _repository.GetProducts();
        }
        public Product GetProducts(string productId)
        {
            Product _product_copy = _repository.GetProducts(productId);
            if (_product_copy != null)
                return _product_copy;
            throw new ProductNotFoundException("Product Not found");
        }
        public List<Product> GetProductsByCategoryOnly(string category)
        {
            List<Product> products = _repository.GetProducts();
            List<Product> filteredProducts = new List<Product>();
            foreach(var prod in products)
            {
                if(prod.ProductType == category)
                {
                    filteredProducts.Add(prod);
                }
            }
            if (filteredProducts != null) return filteredProducts;
            else throw new ProductNotFoundException("no matching products found");
        }
        public List<Product> GetProductsByGender(string gender)
        {
            List<Product> products = _repository.GetProducts();
            List<Product> filteredProducts = new List<Product>();
            foreach (var prod in products)
            {
                if (prod.Gender == gender)
                {
                    filteredProducts.Add(prod);
                }
            }
            if (filteredProducts != null) return filteredProducts;
            else throw new ProductNotFoundException("no matching products found");
        }
        public List<Product> GetProductsByCategory(string category)
        {
            try
            {
                if (category == null) category = "";
                List<Product> productList =  _repository.GetProductByCategory(category);
                if (productList != null) return productList;
                else throw new ProductNotFoundException("No product Found");
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        public List<Product> GetProductsByName(string productName)
        {
            try
            {
                if (productName == null) productName = "";
                List<Product> productList =  _repository.GetProductByName(productName);
                if (productList != null) return productList;
                else throw new ProductNotFoundException("No product Found");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<Product> GetProductsByTag(string tags)
        {
            try
            {
                if (tags == null) tags = "";
                List<Product> productList = _repository.GetProductsByTag(tags);
                if (productList != null) return productList;
                else throw new ProductNotFoundException("No product Found");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool AddProducts(Product product)
        {
            Product _product_copy = _repository.GetProducts(product.ProductId);
            if (_product_copy == null)
                return _repository.AddProducts(product);
            else throw new ProductExistsException("Product Exists");
        }
        public bool UpdateProduct(Product product, string productId)
        {
            if (productId == product.ProductId)
            {
                Product _product_copy = _repository.GetProducts(productId);
                if (_product_copy != null)
                {
                    _repository.UpdateProduct(productId,product);
                    return true;
                }
                    

                throw new ProductNotFoundException("Product Not found");

            }
            else
                throw new WrongProductIdException("Incorrect Id for Update");
        }
        public bool DeleteProduct(string productId)
        {
            Product _product_copy = _repository.GetProducts(productId);
            if (_product_copy != null)
            {
                _repository.DeleteProducts(productId);
                return true;
            }
               
            throw new ProductNotFoundException("Product Not found");
        }
    }
}

