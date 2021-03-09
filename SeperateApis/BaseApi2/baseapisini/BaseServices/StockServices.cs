using System;
using System.Collections.Generic;
using System.Text;
using BaseRepository;
using BaseModels;
using BaseExceptions.StockException;
using Interfaces.StockInterfaces;
namespace Services
{
    public class StockServices : IStockServices<Stock>
    {
        IStockRepository<Stock> _stockRepository;
        public StockServices(IStockRepository<Stock> stockRepository)
        {
            _stockRepository = stockRepository;
        }
        public List<Stock> GetAllStock()
        {
            return _stockRepository.GetAllStock();
        }
        public List<Stock> GetStocksByProductId(string productId)
        {
            return _stockRepository.GetStocksByProductId(productId);
        }
        public Stock GetStock(string storeId, string productId)
        {
            var dataExist = _stockRepository.GetStock(storeId, productId);
            if (dataExist != null)
                return dataExist;
            throw new StockNotFound($"Stock with Store Id:{storeId} and ProductId:{productId} not found");
        }
        public bool AddStock(Stock stock)
        {
            var dataExist = _stockRepository.GetStock(stock.StoreId, stock.ProductId);
            if (dataExist == null)
                return _stockRepository.AddStock(stock);
            throw new StockExistException("Stock already Exist");
        }
        public bool UpdateStock(string storeId, string productId, Stock stock)
        {
            var dataExist = _stockRepository.GetStock(storeId, productId);
            if (dataExist != null)
                return _stockRepository.UpdateStock(storeId,productId,stock);
            throw new StockNotFound($"Stock with Store Id:{storeId} and ProductId:{productId} not found");
        }
        public bool DeleteStock(string storeId, string productId)
        {
            var dataExist = _stockRepository.GetStock(storeId, productId);
            if (dataExist != null)
                return _stockRepository.DeleteStock(storeId, productId);
            throw new StockNotFound($"Stock with Store Id:{storeId} and ProductId:{productId} not found");
        }
    }
}

