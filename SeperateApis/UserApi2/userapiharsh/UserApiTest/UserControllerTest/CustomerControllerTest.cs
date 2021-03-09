using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using UserModels;
using UserInterface;
using UserServiceAPI.Controllers;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;

namespace UserApiTest.UserControllerTest
{
    [TestFixture]
    class CustomerControllerTest
    {
        Mock<ICustomerService<Customer>> mockService;
        CustomersController _controller;
        List<Customer> customers;
        [OneTimeSetUp]
        public void SetUp()
        {
            mockService = new Mock<ICustomerService<Customer>>();
            _controller = new CustomersController(mockService.Object);
            customers = new List<Customer>()
                {
                     new Customer(){
                CustomerId = "c3",
                FirstName = "sini",
                LastName = "robin",
                Email = "Sini@gmail.com",
                PastOrderCount = 5
                     },
                     new Customer(){
                CustomerId = "c3",
                FirstName = "sini",
                LastName = "robin",
                Email = "Sini@gmail.com",
                PastOrderCount = 5
                     }
            };
            mockService.Setup(service => service.GetAllCustomers()).Returns(customers);
        }
        [Test]
        public void TestGetCustomerSuccess()
        {

            Assert.IsAssignableFrom<List<Customer>>(_controller.Get());
            Assert.IsNotNull(_controller.Get());
        }
        [Test]
        public void TestGetCustomerByProductIdFail()
        {
            var result = _controller.Get("c2");
            Assert.False(result is Customer);
        }
        [Test]
        public void TestDeleteCustomerSuccess()
        {
            IActionResult actionResult = _controller.Delete("c1");
            Assert.IsNotNull(actionResult);
        }
        [Test]
        public void TestAddCustomerSuccess()
        {
            Assert.IsInstanceOf<ObjectResult>(_controller.Post((new Customer()
            {
                CustomerId = "c3",
                FirstName = "sini",
                LastName = "robin",
                Email = "Sini@gmail.com",
                PastOrderCount = 5
            })));
        }
        [Test]
        public void TestUpdateCustomerFail()
        {
            Assert.IsNotAssignableFrom<Customer>(_controller.Put("c1",
                  new Customer()
                  {
                      CustomerId = "c3",
                      FirstName = "sini",
                      LastName = "robin",
                      Email = "Sini@gmail.com",
                      PastOrderCount = 5
                  }));
        }
    }
}

