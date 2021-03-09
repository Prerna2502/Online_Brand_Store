using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Interfaces;
using Interfaces.StoreInterfaces;
using Microsoft.EntityFrameworkCore;
using BaseModels;
using BaseExceptions.StoreException;
namespace BaseRepository
{
    public class StoreRepository : IStoreRepository<Store>
    {
        IProductStoreStockDbContext<Product,Stock, Store> _context;
        public StoreRepository(IProductStoreStockDbContext<Product,Stock, Store> context)
        {
            _context = context;
        }
        public List<Store> GetStores()
        {
            try
            {
                return _context.Stores.ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Store GetStore(string StoreId)
        {
            try
            {
                return _context.Stores.Find(StoreId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void AddStore(Store store)
        {
            try
            {
                _context.Stores.Add(store);
                _context.SaveChanges();
                return;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void UpdateStore(string storeId,Store store)
        {
            try
            {
                var dataExist = _context.Stores.Find(storeId);
                if(dataExist!=null)
                {
                    dataExist.Location =store.Location;
                    dataExist.Manager = store.Manager;
                    dataExist.Contact = store.Contact;
                    dataExist.Address = store.Address;
                    _context.SaveChanges();
                    return;
                }
                throw new StoreNotFoundException("Store not found");  
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void DeleteStore(string storeId)
        {
            try
            {
                var data = _context.Stores.Find(storeId);
                if (data != null)
                {
                    _context.Stores.Remove(data);
                    _context.SaveChanges();
                    return;
                }
                throw new StoreNotFoundException("Store Not Found");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}

