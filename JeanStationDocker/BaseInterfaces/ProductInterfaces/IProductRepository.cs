
using System.Collections.Generic;

namespace Interfaces.ProductInterfaces
{
    public interface IProductRepository<Product>
    {
        bool AddProducts(Product product);
        bool DeleteProducts(string ProductId);
        List<Product> GetProducts();
        Product GetProducts(string ProductId);
        List<Product> GetProductByCategory(string category);
        List<Product> GetProductByName(string name);
        List<Product> GetProductsByTag(string tags);
        Product UpdateProduct(string productId ,Product product);
    }
}