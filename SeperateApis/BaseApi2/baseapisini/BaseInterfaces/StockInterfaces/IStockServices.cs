
using System.Collections.Generic;

namespace Interfaces.StockInterfaces
{
    public interface IStockServices<T>
    {
        bool AddStock(T stock);
        bool DeleteStock(string storeId, string productId);
        List<T> GetAllStock();
        List<T> GetStocksByProductId(string productId);
        T GetStock(string storeId, string productId);
        bool UpdateStock(string storeId, string productId, T stock);
    }
}