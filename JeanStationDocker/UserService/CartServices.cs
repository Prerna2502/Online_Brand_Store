using System;
using System.Collections.Generic;
using System.Text;
using UserInterface;
using UserModels;
using UserException;
namespace Service
{
    public class CartServices : ICartServices<Cart>
    {
        ICartRepository<Cart> _cartRepository;
        public CartServices(ICartRepository<Cart> cartRepository)
        {
            _cartRepository = cartRepository;
        }
        public List<Cart> GetAllCart()
        {
            return _cartRepository.GetAllCart();
        }
        public List<Cart> GetUserCart(string customerId)
        {
            try
            {
                return _cartRepository.GetUserCart(customerId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Cart GetCart(string customerId, string productId)
        {
            try
            {
                return _cartRepository.GetCart(customerId, productId);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        public bool AddCart(Cart cart)
        {
            Cart cart_copy = _cartRepository.GetCart(cart.CustomerId, cart.ProductId);
            if (cart_copy == null)
            {
                try
                {
                    return _cartRepository.AddCart(cart);
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            else //if cart item is present then update it's quantity i.e qty = qty+1;
            {
                cart_copy.Quantity += cart.Quantity;
                try
                {
                    return _cartRepository.UpdateCart(cart.CustomerId, cart.ProductId, cart_copy);
                }
                catch(Exception e)
                {
                    throw e;
                }
            }
        }
        public bool UpdateCart(string customerId, string productId, Cart cart)
        {
            try
            {
                bool result = _cartRepository.UpdateCart(customerId, productId, cart);
                if (result) return true;
                else throw new NoCartExistException("No Such Cart Item Exists");
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
                bool result = _cartRepository.DeleteCart(customerId, productId);
                if (result) return true;
                else throw new NoCartExistException("No Such Cart Item Exists");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
