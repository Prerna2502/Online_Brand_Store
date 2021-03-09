using System.Collections.Generic;

namespace UserInterface
{
    public interface ICartRepository<Ca>
    {
        bool AddCart(Ca cart);
        bool DeleteCart(string customerId, string productId);
        List<Ca> GetAllCart();
        Ca GetCart(string custumerId, string productId);
        List<Ca> GetUserCart(string customerId);
        bool UpdateCart(string customerId, string productId, Ca cart);
    }
}