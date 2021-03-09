using AuthExceptions;
using AuthInterfaces.RepositoryInterfaces;
using AuthModels;
using AuthServices;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuthApiTest.AuthServiceTest
{
    class EmployeeServiceTest
    {
        EmployeeServices _service;
        List<Employee> employees;
        Mock<IEmployeeRepository<Employee>> mockRepository;
        [OneTimeSetUp]
        public void setUp()
        {
            mockRepository = new Mock<IEmployeeRepository<Employee>>();
            _service = new EmployeeServices(mockRepository.Object);
            employees = new List<Employee>()
                    {
                    new Employee() { EmployeeId="e1",StoreId="s1",FirstName="Prerna",LastName="agarwal"
                        ,Email="new@gmail.com",ContactNo="2222222222",Address="noida",Designation="Manager"
                        ,Password="123"
                    },
                    new Employee() { EmployeeId="e2",StoreId="s1",FirstName="Prerna",LastName="agarwal"
                        ,Email="new@gmail.com",ContactNo="2222222222",Address="noida",Designation="Manager"
                        ,Password="123"
                    },
                    new Employee() { EmployeeId="e3",StoreId="s1",FirstName="Prerna",LastName="agarwal"
                        ,Email="new@gmail.com",ContactNo="2222222222",Address="noida",Designation="Manager"
                        ,Password="123"
                    }
                };
            mockRepository.Setup(repo => repo.GetAllEmployees()).Returns(employees);
            mockRepository.Setup(repo => repo.CreateEmployee(It.IsAny<Employee>())).Returns(It.IsAny<Employee>());


        }
        [Test]
        public void TestGetAllEmployeeSuccess()
        {
            Assert.IsAssignableFrom<List<Employee>>(_service.GetAllEmployees());
        }
        [Test]
        public void TestCreateEmployeeSuccess()
        {
            var actual = Assert.Throws<UserAlreadyExistsException>(() => _service.CreateEmployee(new Employee()
            {
                EmployeeId = "e3",
                StoreId = "s1",
                FirstName = "Prerna",
                LastName = "agarwal",
                Email = "new@gmail.com",
                ContactNo = "2222222222",
                Address = "noida",
                Designation = "Manager",
                Password = "123"
            }));
            Assert.AreEqual("employee Id already exists!!", actual.Message);
        }
        [Test]
        public void TestUpdateEmployeeThrowException()
        {
            var actual = Assert.Throws<UserNotFoundException>(() => _service.UpdateEmployee(new Employee()
            {
                EmployeeId = "e3",
                StoreId = "s1",
                FirstName = "Prerna",
                LastName = "agarwal",
                Email = "new@gmail.com",
                ContactNo = "2222222222",
                Address = "noida",
                Designation = "Manager",
                Password = "123"
            }));
            Assert.AreEqual("No employee with this Id exists!!", actual.Message);
        }
        [Test]
        public void TestDeleteEmployeeThrowException()
        {
            var actual = Assert.Throws<UserNotFoundException>(() => _service.DeleteEmployee("e1"));
            Assert.AreEqual("No employee with this Id existed anyway!!", actual.Message);
        }
    }
}

