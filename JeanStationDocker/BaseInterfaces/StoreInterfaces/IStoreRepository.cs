
using System.Collections.Generic;

namespace Interfaces.StoreInterfaces
{
    public interface IStoreRepository<T>
    {
        void AddStore(T store);
        void DeleteStore(string storeId);
        T GetStore(string StoreId);
        List<T> GetStores();
        void UpdateStore(string storeId,T store);
    }
}