using System;
using System.Collections.Generic;
using System.Text;
using AuthInterfaces.RepositoryInterfaces;
using AuthInterfaces.ServicesInterfaces;
using AuthModels;
using AuthExceptions;

namespace AuthServices
{
    public class CustomerServices : ICustomerServices<Customer>
    {
        private readonly ICustomerRepository<Customer> _repository;
        public CustomerServices(ICustomerRepository<Customer> repository)
        {
            _repository = repository;
        }
        public bool CustomerLogin(string customerId,string customerPassword)
        {
            var result = _repository.CustomerLogin(customerId,customerPassword);
            if (result == 1)
                return true;
            if (result == 0)
                throw new UserNotFoundException("Invalid customer Id!!");
            else
                throw new UserNotFoundException("Invalid customer password!!");
            //return _repository.CustomerLogin(customer);
        }
        public Customer CreateCustomer(Customer customer)
        {
            Customer result = null;
            if (_repository.IsCustomerExists(customer.CustomerId) == false)
            {
                result = _repository.CreateCustomer(customer);
            }
            if (result != null)
                return result;
            throw new UserAlreadyExistsException("customer Id already exists!!");
            //return _repository.CreateCustomer(customer);
        }
        public List<Customer> GetAllCustomers()
        {
            var result = _repository.GetAllCustomers();
            if(result != null)
                return result;
            throw new UserNotFoundException("Currently no Customers!!");
        }
        public Customer GetCustomerById(string customerId)
        {
            var result = _repository.GetCustomerById(customerId);
            if (result != null)
                return result;
            throw new UserNotFoundException("No customer with this Id exists!!");
        }
        public bool UpdateCustomer(Customer customer)
        {
            if (_repository.IsCustomerExists(customer.CustomerId))
            {
                return _repository.UpdateCustomer(customer);
            }
            throw new UserNotFoundException("No customer with this Id exists!!");
            //return _repository.UpdateCustomer(customer);
        }
        public bool DeleteCustomer(string customerId)
        {
            if (_repository.IsCustomerExists(customerId))
            {
                return _repository.DeleteCustomer(customerId);
            }
            throw new UserNotFoundException("No customer with this Id existed anyway!!");
            //return _repository.DeleteCustomer(customerId);
        }
    }
}
