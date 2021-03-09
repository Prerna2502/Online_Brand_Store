using System;
using System.Collections.Generic;
using System.Text;
using BaseExceptions.StoreException;
using Interfaces.StoreInterfaces;
using BaseModels;
namespace Services
{
    public class StoreServices : IStoreServices<Store>
    {
        IStoreRepository<Store> _storeRepository;
        public StoreServices(IStoreRepository<Store> storeRepository)
        {
            _storeRepository = storeRepository;
        }
        public List<Store> GetStores()
        {
            return _storeRepository.GetStores();
        }
        public Store GetStore(string storeId)
        {
            var dataExist=_storeRepository.GetStore(storeId);
            if (dataExist != null)
                return dataExist;
            throw new StoreNotFoundException("Store Not Found");
        }
        public void AddStore(Store store)
        {
            var dataExist = _storeRepository.GetStore(store.StoreId);
            if (dataExist== null)
            {
                _storeRepository.AddStore(store);
                return;
            }  
            throw new StoreExistException("Store already exist");
        }
        public void UpdateStore(string storeId, Store store)
        {
            if (storeId == store.StoreId)
            {
                    _storeRepository.UpdateStore(storeId,store);
                    return;
            }
            throw new WrongStoreIdException("invalid store id");
        }
        public void DeleteStore(string storeId)
        {
            _storeRepository.DeleteStore(storeId);
        }
    }
}
