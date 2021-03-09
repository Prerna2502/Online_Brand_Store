
using System.Collections.Generic;

namespace OrderDiscountInterfaces
{
    public interface IDiscountRepository<T>
    {
        bool AddDiscount(T discount);
        bool DeleteDiscountByAmount(decimal amount);
        List<T> GetAllDiscount();
        T GetDiscountByAmount(decimal amount);
        bool UpdateDiscountByAmount(decimal amount, T discount);
    }
}