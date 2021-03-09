using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UserInterface;
using Microsoft.EntityFrameworkCore;
using UserModels;
namespace Repository
{
    public class CustomerRepository : ICustomerRepository<Customer>
    {
        IJeanStation_UserServiceContext<DbSet<Cart>, DbSet<Customer>, DbSet<Order>> _context;
        public CustomerRepository(IJeanStation_UserServiceContext<DbSet<Cart>, DbSet<Customer>, DbSet<Order>> context)
        {
            _context = context;
        }
        public List<Customer> GetAllCustomers()
        {
            try
            {
                return _context.Customers.ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Customer GetCustomer(string customerId)
        {
            try
            {
                return _context.Customers.Find(customerId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //public Cart GetCart(string customerId, string productId)
        //{
        //    try
        //    {
        //        return _context.Carts.Where(e => e.CustomerId == customerId && e.ProductId == productId).FirstOrDefault();
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        public bool AddCusetomer(Customer customer)
        {
            _context.Customers.Add(customer);
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool UpdateCustomer(string customerId, Customer customer)
        {
            try
            {
                Customer data = _context.Customers.Find(customerId);
                if (data != null)
                {
                    data.FirstName = customer.FirstName;
                    data.LastName = customer.LastName;
                    data.Email = customer.Email;
                    data.PastOrderCount = customer.PastOrderCount;
                    _context.SaveChanges();
                    return true;
                }
                return false;
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
                var data = _context.Customers.Find(customerId);
                if (data != null)
                {
                    _context.Customers.Remove(data);
                    _context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
