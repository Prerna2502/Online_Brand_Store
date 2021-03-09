using System.Collections.Generic;

namespace UserInterface
{
    public interface ICustomerService<Customer>
    {
        bool AddCustomer(Customer customer);
        bool DeleteCustomer(string customerId);
        List<Customer> GetAllCustomers();
        Customer GetCustomer(string customerId);
        bool UpdateCustomer(string customerId, Customer customer);
    }
}