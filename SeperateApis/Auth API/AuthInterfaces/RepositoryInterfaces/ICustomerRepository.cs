using System;
using System.Collections.Generic;
using System.Text;

namespace AuthInterfaces.RepositoryInterfaces
{
    public interface ICustomerRepository<C>
    {
        int CustomerLogin(string cId, string cPassword);
        C CreateCustomer(C c);
        bool IsCustomerExists(string cId);
        List<C> GetAllCustomers();
        C GetCustomerById(string cId);
        bool UpdateCustomer(C c);
        bool DeleteCustomer(string cId);
    }
}
