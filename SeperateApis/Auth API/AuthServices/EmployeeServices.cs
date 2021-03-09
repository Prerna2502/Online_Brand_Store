using System;
using System.Collections.Generic;
using System.Text;
using AuthInterfaces.RepositoryInterfaces;
using AuthInterfaces.ServicesInterfaces;
using AuthModels;
using AuthExceptions;

namespace AuthServices
{
    public class EmployeeServices : IEmployeeServices<Employee>
    {
        private readonly IEmployeeRepository<Employee> _repository;
        public EmployeeServices(IEmployeeRepository<Employee> repository)
        {
            _repository = repository;
        }
        public bool EmployeeLogin(string employeeId, string employeePassword,string storeId)
        {
            var result = _repository.EmployeeLogin(employeeId,employeePassword, storeId);
            if (result == 1)
                return true;
            if (result == 0)
                throw new UserNotFoundException("Invalid employee Id!!");
            else
                throw new UserNotFoundException("Invalid employee password!!");
            //return _repository.EmployeeLogin(employee);
        }
        public Employee CreateEmployee(Employee employee)
        {
            Employee result = null;
            if (_repository.IsEmployeeExists(employee.EmployeeId) == false)
            {
                result = _repository.CreateEmployee(employee);
            }
            if (result != null)
                return result;
            throw new UserAlreadyExistsException("employee Id already exists!!");
            //return _repository.CreateEmployee(employee);
        }
        public List<Employee> GetAllEmployees()
        {
            var result = _repository.GetAllEmployees();
            if (result != null)
                return result;
            throw new UserNotFoundException("Currently no Employees!!");
            //return _repository.GetAllEmployees();
        }
        public Employee GetEmployeeById(string employeeId)
        {
            var result = _repository.GetEmployeeById(employeeId);
            if (result != null)
                return result;
            throw new UserNotFoundException("No employee with this Id exists!!");
            //return _repository.GetEmployeeById(employeeId);
        }
        public List<Employee> GetEmployeesByStore(string storeId)
        {
            var result = _repository.GetEmployeesByStore(storeId);
            if (result != null)
                return result;
            throw new UserNotFoundException("No employee exists in this store!!");
        }
        public bool UpdateEmployee(Employee employee)
        {
            if (_repository.IsEmployeeExists(employee.EmployeeId))
            {
                return _repository.UpdateEmployee(employee);
            }
            throw new UserNotFoundException("No employee with this Id exists!!");
            //return _repository.UpdateEmployee(employee);
        }
        public bool DeleteEmployee(string employeeId)
        {
            if (_repository.IsEmployeeExists(employeeId))
            {
                return _repository.DeleteEmployee(employeeId);
            }
            throw new UserNotFoundException("No employee with this Id existed anyway!!");
            //return _repository.DeleteEmployee(employeeId);
        }
    }
}
