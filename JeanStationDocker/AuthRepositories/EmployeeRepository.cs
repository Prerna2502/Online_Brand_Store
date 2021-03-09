using System;
using System.Collections.Generic;
using System.Text;
using AuthInterfaces;
using AuthInterfaces.RepositoryInterfaces;
using AuthModels;
using MongoDB.Driver;

namespace AuthRepositories
{
    public class EmployeeRepository : IEmployeeRepository<Employee>
    {
        private readonly BaseAuthDbContext<Customer, Employee, Admin> _context;
        public EmployeeRepository(BaseAuthDbContext<Customer, Employee, Admin> context)
        {
            _context = context;
        }
        public int EmployeeLogin(string employeeId, string employeePassword, string storeId)
        {
            Employee e = null;
            try
            {
                e = _context.Employees.Find(e=>e.EmployeeId == employeeId && e.StoreId == storeId).FirstOrDefault();
            }
            catch (Exception) { }
            if (e == null)
                return 0;
            else
            {
                var password = e.Password;
                if (password == employeePassword)
                    return 1;
            }
            return -1;
        }
        public bool IsEmployeeExists(string empId)
        {
            Employee result = null;
            try
            {
                result = _context.Employees.Find(e => e.EmployeeId == empId).FirstOrDefault();
            }
            catch (Exception) { }
            if (result != null)
                return true;
            return false;
        }
        public Employee CreateEmployee(Employee employee)
        {
            Employee result = null;
            try
            {
                _context.Employees.InsertOne(employee);
                result = _context.Employees.Find(e => e.EmployeeId == employee.EmployeeId).FirstOrDefault();
            }
            catch (Exception) { }
            return result;
        }
        public List<Employee> GetAllEmployees()
        {
            List<Employee> employees = null;
            try
            {
                employees = _context.Employees.Find(_ => true).ToList();
            }
            catch (Exception) { }
            return employees;
        }
        public Employee GetEmployeeById(string empId)
        {
            Employee employee = null;
            try
            {
                employee = _context.Employees.Find(e => e.EmployeeId == empId).FirstOrDefault();
            }
            catch (Exception) { }
            return employee;
        }
        public List<Employee> GetEmployeesByStore(string storeId)
        {
            List<Employee> employee = null;
            try
            {
                employee = _context.Employees.Find(e => e.StoreId == storeId).ToList();
            }
            catch (Exception) { }
            return employee;
        }
        public bool UpdateEmployee(Employee employee)
        {
            bool result = false;
            try
            {
                var filter = Builders<Employee>.Filter.Where(e => e.EmployeeId == employee.EmployeeId);
                var update = Builders<Employee>.Update.Set(e => e.FirstName, employee.FirstName)
                    .Set(e => e.LastName, employee.LastName)
                    .Set(e => e.ContactNo, employee.ContactNo)
                    .Set(e => e.Email, employee.Email)
                    .Set(e => e.Designation, employee.Designation)
                    .Set(e => e.Address, employee.Address)
                    .Set(e => e.Password, employee.Password)
                    .Set(e => e.StoreId, employee.StoreId);
                var updateResult = _context.Employees.UpdateOne(filter, update);
                if (updateResult.MatchedCount > 0)
                    result = true;
            }
            catch (Exception) { }
            return result;
        }
        public bool DeleteEmployee(string empId)
        {
            bool result = false;
            try
            {
                var deleteResult = _context.Employees.DeleteOne(e => e.EmployeeId == empId);
                if (deleteResult.DeletedCount > 0)
                    result = true;
            }
            catch (Exception) { }
            return result;
        }
    }
}
