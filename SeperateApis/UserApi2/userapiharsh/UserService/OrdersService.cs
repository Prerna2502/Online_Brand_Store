using System;
using System.Collections.Generic;
using System.Text;
using UserModels;
using UserInterface;
using UserException;
namespace Service
{
    public class OrdersService : IOrdersService<Order>
    {
        IOrderRepository<Order> _orderRepository;
        public OrdersService(IOrderRepository<Order> orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public List<Order> GetAllOrder()
        {
            return _orderRepository.GetAllOrders();
        }
        public List<Order> GetUserOrder(string customerId)
        {
            try
            {
                return _orderRepository.GetUserOrders(customerId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //public Order GetOrder(string customerId, string productId)
        //{
        //    try
        //    {
        //        return _orderRepository.Get(customerId, productId);
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        public bool AddOrder(Order order)
        {
            Order order_copy = _orderRepository.GetOrderByOrderId(order.OrderId);
            if (order_copy == null)
            {
                try
                {
                    return _orderRepository.AddOrder(order);
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            else
            {
                throw new OrderExistsException("Order Id Already Exists");
            }
        }
        public bool UpdateOrder(string orderId, Order order)
        {
            try
            {
                bool result = _orderRepository.UpdateOrder(orderId, order);
                if (result) return true;
                else throw new NoOrderExistsException("No Such Order Item Exists");
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
                bool result = _orderRepository.DeleteOrderByOrderId(orderId);
                if (result) return true;
                else throw new NoOrderExistsException("No Such Order Item Exists");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //only the first matching one will get deleted
        public bool DeleteOrderByCustomerProduct(string customerId, string productId)
        {
            try
            {
                bool result = _orderRepository.DeleteOrderByCustomerProduct(customerId, productId);
                if (result) return true;
                else throw new NoOrderExistsException("No Such Order Item Exists");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
