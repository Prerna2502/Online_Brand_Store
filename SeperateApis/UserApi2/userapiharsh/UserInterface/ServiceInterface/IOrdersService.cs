using System.Collections.Generic;

namespace UserInterface
{
    public interface IOrdersService<Order>
    {
        bool AddOrder(Order order);
        bool DeleteOrderByCustomerProduct(string customerId, string productId);
        bool DeleteOrderByOrderId(string orderId);
        List<Order> GetAllOrder();
        List<Order> GetUserOrder(string customerId);
        bool UpdateOrder(string orderId, Order order);
    }
}