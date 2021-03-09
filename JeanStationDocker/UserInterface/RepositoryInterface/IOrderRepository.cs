using System.Collections.Generic;

namespace UserInterface
{
    public interface IOrderRepository<Order>
    {
        bool AddOrder(Order order);
        bool DeleteOrderByCustomerProduct(string customerId, string productId);
        bool DeleteOrderByOrderId(string orderId);
        List<Order> GetAllOrders();
        List<Order> GetUserOrders(string customerId);
        Order GetOrderByOrderId(string orderId);
        bool UpdateOrder(string orderId, Order order);
    }
}