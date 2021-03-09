using System;
using System.Collections.Generic;
using System.Text;
using AuthInterfaces;
using MongoDB.Driver;

namespace AuthModels
{
    public class AuthDbContext : BaseAuthDbContext<Customer,Employee,Admin>
    {
        readonly MongoClient client;
        readonly IMongoDatabase database;
        private readonly IAuthDbSettings settings;
        public AuthDbContext(IAuthDbSettings dbsettings):base(dbsettings)
        {
            settings = dbsettings;
            client = new MongoClient(dbsettings.ConnectionString);
            database = client.GetDatabase(dbsettings.DatabaseName);
        }
        public override IMongoCollection<Customer> Customers => database.GetCollection<Customer>(settings.CustomerCollectionName);
        public override IMongoCollection<Employee> Employees => database.GetCollection<Employee>(settings.EmployeeCollectionName);
        public override IMongoCollection<Admin> Admins => database.GetCollection<Admin>(settings.AdminCollectionName);
    }
}
