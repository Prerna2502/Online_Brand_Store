using System;
using System.Collections.Generic;
using System.Text;

namespace AuthInterfaces.ServicesInterfaces
{
    public interface IEmployeeServices<E>
    {
        bool EmployeeLogin(string eId, string ePassword,string sId);
        E CreateEmployee(E e);
        List<E> GetAllEmployees();
        E GetEmployeeById(string eId);
        List<E> GetEmployeesByStore(string sId);
        bool UpdateEmployee(E e);
        bool DeleteEmployee(string eId);
    }
}
