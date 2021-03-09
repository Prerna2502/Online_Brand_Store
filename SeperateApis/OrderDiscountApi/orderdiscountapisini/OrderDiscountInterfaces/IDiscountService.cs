
using System.Collections.Generic;

namespace OrderDiscountInterfaces
{
    public interface IDiscountService<T>
    {
        bool AddDiscount(T discount);
        bool DeleteDiscountByAmount(decimal amount);
        List<T> GetAllDiscount();
        T GetDiscountBasedOnAmount(decimal amount);
        T GetDiscountByAmount(decimal amount);
        bool UpdateDiscountByAmount(decimal amount, T discount);
    }
}