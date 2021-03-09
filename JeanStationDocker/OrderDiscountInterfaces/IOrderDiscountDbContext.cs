using Microsoft.EntityFrameworkCore;

namespace OrderDiscountInterfaces
{
    public interface IOrderDiscountDbContext<T> where T:class
    {
        DbSet<T> Discounts { get; set; }

        void SaveChanges();
    }
}