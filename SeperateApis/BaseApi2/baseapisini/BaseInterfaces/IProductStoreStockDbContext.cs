using Microsoft.EntityFrameworkCore;

namespace Interfaces
{
    public interface IProductStoreStockDbContext<T,S,W> where T:class where S:class where W:class
    {
        DbSet<T> Products { get; set; }
        DbSet<S> Stocks { get; set; }
        DbSet<W> Stores { get; set; }

        void SaveChanges();
    }
}