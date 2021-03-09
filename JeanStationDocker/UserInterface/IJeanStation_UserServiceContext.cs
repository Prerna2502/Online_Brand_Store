using Microsoft.EntityFrameworkCore;

namespace UserInterface
{
    public interface IJeanStation_UserServiceContext<DbCa,DbCu,DbOr>
    {
        DbCa Carts { get; set; }
        DbCu Customers { get; set; }
        DbOr Orders { get; set; }
        int SaveChanges();
    }
}