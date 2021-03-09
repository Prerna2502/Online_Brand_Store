
using System.Collections.Generic;

namespace Interfaces.ProductInterfaces
{
    public interface IProductServices<T>
    {
        bool AddProducts(T product);
        bool DeleteProduct(string productId);
        List<T> GetProducts();
        T GetProducts(string productId);
        List<T> GetProductsByCategory(string category);
        List<T> GetProductsByName(string productName);
        List<T> GetProductsByCategoryOnly(string category);
        List<T> GetProductsByGender(string gender);
        List<T> GetProductsByTag(string tags);
        bool UpdateProduct(T product, string productId);
    }
}