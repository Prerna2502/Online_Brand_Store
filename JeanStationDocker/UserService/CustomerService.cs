using System;
using System.Collections.Generic;
using System.Text;
using UserModels;
using UserInterface;
using UserException;
namespace Service
{
    public class CustomerService : ICustomerService<Customer>
    {
        readonly ICustomerRepository<Customer> _customerRepository;
        public CustomerService(ICustomerRepository<Customer> customerRepository)
        {
            _customerRepository = customerRepository;
        }
        public List<Customer> GetAllCustomers()
        {
            try
            {
                return _customerRepository.GetAllCustomers();
            }
            catch (Exception e) { throw e; }
        }
        public Customer GetCustomer(string customerId)
        {
            try
            {
                return _customerRepository.GetCustomer(customerId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool AddCustomer(Customer customer)
        {
            Customer customer_copy = _customerRepository.GetCustomer(customer.CustomerId);
            if (customer_copy == null)
            {
                try
                {
                    return _customerRepository.AddCusetomer(customer);
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            else
            {
                throw new CustomerExistsException("Customer Id Already Exists");
            }
        }
        public bool UpdateCustomer(string customerId, Customer customer)
        {
            try
            {
                bool result = _customerRepository.UpdateCustomer(customerId, customer);
                if (result) return true;
                else throw new NoCustomerExistsException("No Such CustomerId Exists");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool DeleteCustomer(string customerId)
        {
            try
            {
                bool result = _customerRepository.DeleteCustomer(customerId);
                if (result) return true;
                else throw new NoCustomerExistsException("No Such CustomerId Exists");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
