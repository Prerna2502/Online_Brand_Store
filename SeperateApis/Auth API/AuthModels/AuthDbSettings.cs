using System;
using System.Collections.Generic;
using System.Text;
using AuthInterfaces;

namespace AuthModels
{
    public class AuthDbSettings : IAuthDbSettings
    {
        public string EmployeeCollectionName { get; set; }
        public string CustomerCollectionName { get; set; }
        public string AdminCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
