using System;
using System.Collections.Generic;
using System.Text;
using AuthInterfaces;
using AuthInterfaces.RepositoryInterfaces;
using AuthModels;
using MongoDB.Driver;

namespace AuthRepositories
{
    public class CustomerRepository : ICustomerRepository<Customer>
    {
        private readonly BaseAuthDbContext<Customer, Employee, Admin> _context;
        public CustomerRepository(BaseAuthDbContext<Customer, Employee, Admin> context)
        {
            _context = context;
        }
        public int CustomerLogin(string customerId, string customerPassword)
        {
            Customer c = null;
            try
            {
                c = _context.Customers.Find(c =>c.CustomerId == customerId).FirstOrDefault();
            }
            catch (Exception) { }
            if (c == null)
                return 0;
            else
            {
                var password = c.Password;
                if (password == customerPassword)
                    return 1;
            }
            return -1;
        }
        public bool IsCustomerExists(string customerId)
        {
            Customer result = null;
            try
            {
                result = _context.Customers.Find(c => c.CustomerId == customerId).FirstOrDefault();
            }
            catch (Exception) { }
            if (result != null)
                return true;
            return false;
        }
        public Customer CreateCustomer(Customer customer)
        {
            Customer result = null;
            try
            {
                _context.Customers.InsertOne(customer);
                result = _context.Customers.Find(c => c.CustomerId == customer.CustomerId).FirstOrDefault();
            }
            catch (Exception) { }
            return result;
        }
        public List<Customer> GetAllCustomers()
        {
            List<Customer> customers = null;
            try
            {
                customers = _context.Customers.Find(_ => true).ToList();
            }
            catch (Exception) { }
            return customers;
        }
        public Customer GetCustomerById(string customerId)
        {
            Customer customer = null;
            try
            {
                customer = _context.Customers.Find(c => c.CustomerId == customerId).FirstOrDefault();
            }
            catch (Exception) { }
            return customer;
        }
        public bool UpdateCustomer(Customer customer)
        {
            bool result = false;
            try
            {
                var filter = Builders<Customer>.Filter.Where(c => c.CustomerId == customer.CustomerId);
                var update = Builders<Customer>.Update.Set(c => c.FirstName, customer.FirstName)
                    .Set(c => c.LastName, customer.LastName)
                    .Set(c => c.ContactNo, customer.ContactNo)
                    .Set(c => c.Addresses, customer.Addresses)
                    .Set(c => c.Email, customer.Email)
                    .Set(c => c.Password, customer.Password)
                    .Set(c => c.PastOrderCount, customer.PastOrderCount);
                var updateResult = _context.Customers.UpdateOne(filter, update);
                if (updateResult.MatchedCount > 0)
                    result = true;
            }
            catch (Exception) { }
            return result;
        }
        public bool DeleteCustomer(string customerId)
        {
            bool result = false;
            try
            {
                var deleteResult = _context.Customers.DeleteOne(c => c.CustomerId == customerId);
                if (deleteResult.DeletedCount > 0)
                    result = true;
            }
            catch (Exception) { }
            return result;
        }
    }
}
