using System;
using System.Collections.Generic;
using System.Text;

namespace AuthInterfaces
{
    public interface IAuthDbSettings
    {
        string EmployeeCollectionName { get; set; }
        string CustomerCollectionName { get; set; }
        string AdminCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
