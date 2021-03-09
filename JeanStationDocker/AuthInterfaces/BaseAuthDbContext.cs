using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Driver;

namespace AuthInterfaces
{
    public abstract class BaseAuthDbContext<C,E,A>
    {
        readonly IMongoDatabase database;
        protected BaseAuthDbContext(IAuthDbSettings dbsettings) { }
        //public virtual IMongoCollection<C> Customers => null;
        //public virtual IMongoCollection<E> Employees => null;
        //public virtual IMongoCollection<A> Admins => null;
        public virtual IMongoCollection<C> Customers => database.GetCollection<C>("Customers");
        public virtual IMongoCollection<E> Employees => database.GetCollection<E>("Employees");
        public virtual IMongoCollection<A> Admins => database.GetCollection<A>("Admin");
    }
}
