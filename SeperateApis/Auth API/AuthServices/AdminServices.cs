using System;
using System.Collections.Generic;
using System.Text;
using AuthInterfaces.RepositoryInterfaces;
using AuthInterfaces.ServicesInterfaces;
using AuthModels;
using AuthExceptions;

namespace AuthServices
{
    public class AdminServices : IAdminServices<Admin>
    {
        private readonly IAdminRepository<Admin> _repository;
        public AdminServices(IAdminRepository<Admin> repository)
        {
            _repository = repository;
        }
        public Admin CreateAdmin(Admin admin)
        {
            Admin result = _repository.CreateAdmin(admin);
            if (result != null)
                return result;
            throw new UserAlreadyExistsException("admin Id already exists!!");
            //return _repository.CreateCustomer(customer);
        }
        public bool AdminLoginService(string adminId,string adminPassword)
        {
            var result = _repository.AdminLogin(adminId,adminPassword);
            if (result == 1)
                return true;
            if(result == 0)
                throw new UserNotFoundException("Invalid admin Id!!");
            else
                throw new UserNotFoundException("Invalid admin password!!");
            //return _repository.AdminLogin(admin);
        }
    }
}
