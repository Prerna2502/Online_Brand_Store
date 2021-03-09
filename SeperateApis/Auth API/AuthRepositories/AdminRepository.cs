using System;
using System.Collections.Generic;
using System.Text;
using AuthInterfaces;
using AuthInterfaces.RepositoryInterfaces;
using AuthModels;
using MongoDB.Driver;

namespace AuthRepositories
{
    public class AdminRepository : IAdminRepository<Admin>
    {
        private readonly BaseAuthDbContext<Customer,Employee,Admin> _context;
        public AdminRepository(BaseAuthDbContext<Customer, Employee, Admin> context)
        {
            _context = context;
        }
        public Admin CreateAdmin(Admin admin)
        {
            Admin result = null;
            try
            {
                _context.Admins.InsertOne(admin);
                result = _context.Admins.Find(a => a.AdminId == admin.AdminId).FirstOrDefault();
            }
            catch (Exception) { }
            return result;
        }
        public int AdminLogin(string adminId, string adminPassword)
        {
            Admin a = null;
            try
            {
                a = _context.Admins.Find(a => a.AdminId == adminId).FirstOrDefault();
            }
            catch (Exception) { }
            if (a == null)
            {
                if (adminId == BaseAdmin.Instance.AdminId)
                {
                    if (adminPassword == BaseAdmin.Instance.AdminPassword)
                        return 1;
                    return -1;
                }
                return 0;
            }
            else
            {
                var password = a.AdminPassword;
                if (password == adminPassword)
                    return 1;
            }
            return -1;
        }
    }
}
