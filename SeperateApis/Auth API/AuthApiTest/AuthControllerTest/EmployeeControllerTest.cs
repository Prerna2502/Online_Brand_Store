using Auth_API.Controllers;
using AuthInterfaces.ServicesInterfaces;
using AuthModels;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuthApiTest.AuthControllerTest
{
    [TestFixture]
    class EmployeeControllerTest
    {
        Mock<IEmployeeServices<Employee>> mockService;
        EmployeesController _controller;
        List<Employee> employees;
        [OneTimeSetUp]
        public void SetUp()
        {
            mockService = new Mock<IEmployeeServices<Employee>>();
            _controller = new EmployeesController(mockService.Object);
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
            mockService.Setup(service => service.GetAllEmployees()).Returns(employees);
        }
        [Test]
        public void TestGetAllEmployeesSuccess()
        {

            Assert.IsAssignableFrom<ActionResult<IEnumerable<Employee>>>(_controller.Get());
            Assert.IsNotNull(_controller.Get());
        }
        [Test]
        public void TestGetEmployeeByProductIdSuccess()
        {
            var result = _controller.Get("e2");
            Assert.True(result is ActionResult<Employee>);
        }
        [Test]
        public void TestDeleteEmployeeSuccess()
        {
            ActionResult<bool> actionResult = _controller.Delete("e1");
            Assert.IsFalse(actionResult.Value);
        }
        [Test]
        public void TestRegisterSuccess()
        {
            Assert.IsInstanceOf<ObjectResult>(_controller.Register((new Employee()
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
            })));
        }
        [Test]
        public void TestUpdateEmployeeFail()
        {
            Assert.IsNotAssignableFrom<Employee>(_controller.Put("e1",
                  new Employee()
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
        }
    }
}

