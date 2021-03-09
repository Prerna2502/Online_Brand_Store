using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Interfaces;
using Interfaces.StockInterfaces;
using Microsoft.EntityFrameworkCore;
using BaseModels;

namespace BaseRepository
{
    public class StockRepository : IStockRepository<Stock>
    {
        IProductStoreStockDbContext<Product,Stock,Store> _context;
        public StockRepository(IProductStoreStockDbContext<Product,Stock, Store> context)
        {
            _context = context;
        }
        public List<Stock> GetAllStock()
        {
            try
            {
                return _context.Stocks.ToList();
            }
            catch (Exception e)
            {
                throw e;
            }

        }
        public List<Stock> GetStocksByProductId(string productId)
        {
            try
            {
                return _context.Stocks.Where(e => e.ProductId == productId).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Stock GetStock(string storeId, string productId)
        {
            try
            {
                return _context.Stocks.Where(e => e.StoreId == storeId && e.ProductId == productId).FirstOrDefault();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool AddStock(Stock stock)
        {
            try
            {
                _context.Stocks.Add(stock);
                _context.SaveChanges();
                return true;
            }
            catch (Exception d)
            {
                throw d;
            }

        }
        public bool UpdateStock(string storeId,string productId,Stock stock)
        {
            try
            {
                var data= _context.Stocks.Where(e => e.StoreId == storeId && e.ProductId == productId).FirstOrDefault();
                data.Quantity = stock.Quantity;
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }

        }
        public bool DeleteStock(string storeId, string productId)
        {
            try
            {

                 var data = _context.Stocks.Where(e => e.StoreId == storeId && e.ProductId == productId).FirstOrDefault();
                _context.Stocks.Remove(data);
                    _context.SaveChanges();
                    return true;
            }
            catch (Exception e)
            {
                throw e;

            }
        }
    }
}

