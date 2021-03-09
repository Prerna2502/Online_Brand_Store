using System;
using System.Collections.Generic;
using System.Text;

namespace AuthInterfaces.ServicesInterfaces
{
    public interface ICustomerServices<C>
    {
        bool CustomerLogin(string cId, string cPassword);
        C CreateCustomer(C c);
        List<C> GetAllCustomers();
        C GetCustomerById(string cId);
        bool UpdateCustomer(C c);
        bool DeleteCustomer(string cId);
    }
}
