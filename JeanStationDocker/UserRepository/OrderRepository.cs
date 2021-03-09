using System;
using System.Collections.Generic;
using System.Text;
using UserModels;
using UserInterface;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Repository
{
    public class OrderRepository : IOrderRepository<Order>
    {
        IJeanStation_UserServiceContext<DbSet<Cart>, DbSet<Customer>, DbSet<Order>> _context;
        public OrderRepository(IJeanStation_UserServiceContext<DbSet<Cart>, DbSet<Customer>, DbSet<Order>> context)
        {
            _context = context;
        }
        public List<Order> GetAllOrders()
        {
            try
            {
                return _context.Orders.ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<Order> GetUserOrders(string customerId)
        {
            try
            {
                return _context.Orders.Where(o => o.CustomerId == customerId).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Order GetOrderByOrderId(string orderId)
        {
            try
            {
                return _context.Orders.Find(orderId);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        //public Order GetOrders(string customerId, string productId)
        //{
        //    try
        //    {
        //        return _context.Orders.Where(e => e.CustomerId == customerId && e.ProductId == productId).FirstOrDefault();
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        public bool AddOrder(Order order)
        {
            _context.Orders.Add(order);
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
        public bool UpdateOrder(string orderId, Order order)
        {
            try
            {
                Order data = _context.Orders.Where(c => c.OrderId == orderId).FirstOrDefault();
                if (data != null)
                {
                    data.CustomerId = order.CustomerId;
                    data.ProductId = order.ProductId;
                    data.StoreId = order.StoreId;
                    data.Quantity = order.Quantity;
                    data.Address = order.Address;
                    data.Contact = order.Contact;
                    data.OrderStatus = order.OrderStatus;
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
        public bool DeleteOrderByOrderId(string orderId)
        {
            try
            {
                var data = _context.Orders.Where(o => o.OrderId == orderId).FirstOrDefault();
                if (data != null)
                {
                    _context.Orders.Remove(data);
                    _context.SaveChanges();
                    return true;
                }
                else return false;
            }
            catch (Exception e)
            { throw e; }
        }
        public bool DeleteOrderByCustomerProduct(string customerId, string productId)
        {
            try
            {
                var data = _context.Orders.Where(c => c.CustomerId == customerId && c.ProductId == productId).FirstOrDefault();
                if (data != null)
                {
                    _context.Orders.Remove(data);
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
