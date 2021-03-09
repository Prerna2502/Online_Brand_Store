using System;
using System.Collections.Generic;
using System.Linq;
using UserInterface;
using Microsoft.EntityFrameworkCore;
using UserModels;
namespace Repository
{
    public class CartRepository : ICartRepository<Cart>
    {
        IJeanStation_UserServiceContext<DbSet<Cart>, DbSet<Customer>, DbSet<Order>> _context;
        public CartRepository(IJeanStation_UserServiceContext<DbSet<Cart>, DbSet<Customer>, DbSet<Order>> context)
        {
            _context = context;
        }
        public List<Cart> GetAllCart()
        {
            try
            {
                return _context.Carts.ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<Cart> GetUserCart(string customerId)
        {
            try
            {
                return _context.Carts.Where(e => e.CustomerId == customerId).ToList();
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        public Cart GetCart(string customerId, string productId)
        {
            try
            {
                return _context.Carts.Where(e => e.CustomerId == customerId && e.ProductId == productId).FirstOrDefault();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool AddCart(Cart cart)
        {
            _context.Carts.Add(cart);
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
        public bool UpdateCart(string customerId, string productId, Cart cart)
        {
            try
            {
                Cart data = _context.Carts.Where(c => c.CustomerId == customerId && c.ProductId == productId).FirstOrDefault();
                if (data != null)
                {
                    data.Quantity = cart.Quantity;
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
        public bool DeleteCart(string customerId, string productId)
        {
            try
            {
                var data = _context.Carts.Where(c => c.CustomerId == customerId && c.ProductId == productId).FirstOrDefault();
                if (data != null)
                {
                    _context.Carts.Remove(data);
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
