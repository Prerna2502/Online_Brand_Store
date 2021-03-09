using System;
using System.Collections.Generic;
using System.Text;

namespace AuthInterfaces.RepositoryInterfaces
{
    public interface IEmployeeRepository<E>
    {
        int EmployeeLogin(string eId, string ePassword, string sId);
        bool IsEmployeeExists(string eId);
        E CreateEmployee(E employee);
        List<E> GetAllEmployees();
        E GetEmployeeById(string eId);
        List<E> GetEmployeesByStore(string sId);
        bool UpdateEmployee(E employee);
        bool DeleteEmployee(string empId);
    }
}
