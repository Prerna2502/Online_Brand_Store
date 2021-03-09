
using System.Collections.Generic;

namespace Interfaces.StoreInterfaces
{
    public interface IStoreServices<T>
    {
        void AddStore(T store);
        void DeleteStore(string storeId);
        T GetStore(string storeId);
        List<T> GetStores();
        void UpdateStore(string storeId, T store);
    }
}