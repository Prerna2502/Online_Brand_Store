using System;
using System.Collections.Generic;
using System.Text;

namespace AuthInterfaces.ServicesInterfaces
{
    public interface IAdminServices<A>
    {
        A CreateAdmin(A admin);
        bool AdminLoginService(string id,string password);
    }
}
