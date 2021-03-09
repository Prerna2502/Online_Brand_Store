using System;
using System.Collections.Generic;
using System.Text;

namespace AuthInterfaces.RepositoryInterfaces
{
    public interface IAdminRepository<A>
    {
        A CreateAdmin(A a);
        int AdminLogin(string id, string password);
    }
}
