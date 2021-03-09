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
    class CustomerControllerTest
    {
        Mock<ICustomerServices<Customer>> mockService;
        CustomersController _controller;
        List<Customer> customers;
        [OneTimeSetUp]
        public void SetUp()
        {
            mockService = new Mock<ICustomerServices<Customer>>();
            _controller = new CustomersController(mockService.Object);
            customers = new List<Customer>()
                {
                     new Customer(){
                CustomerId = "c3",
                FirstName = "sini",
                LastName = "robin",
                Email = "Sini@gmail.com",
                PastOrderCount = "5"
                     },
                     new Customer(){
                CustomerId = "c3",
                FirstName = "sini",
                LastName = "robin",
                Email = "Sini@gmail.com",
                PastOrderCount = "5"
                     }
            };
            mockService.Setup(service => service.GetAllCustomers()).Returns(customers);
        }
        [Test]
        public void TestGetCustomerSuccess()
        {

            Assert.IsAssignableFrom<ActionResult<IEnumerable<Customer>>>(_controller.Get());
            Assert.IsNotNull(_controller.Get());
        }
        [Test]
        public void TestGetCustomerByProductIdSuccess()
        {
            var result = _controller.Get("c2");
            Assert.True(result is ActionResult<Customer>);
        }
        [Test]
        public void TestDeleteCustomerSuccess()
        {
            ActionResult<bool> actionResult = _controller.Delete("c1");
            Assert.IsFalse(actionResult.Value);
        }
        [Test]
        public void TestRegisterSuccess()
        {
            Assert.IsInstanceOf<ObjectResult>(_controller.Register((new Customer()
            {
                CustomerId = "c3",
                FirstName = "sini",
                LastName = "robin",
                Email = "Sini@gmail.com",
                PastOrderCount = " 5"
            })));
        }
        [Test]
        public void TestUpdateCustomerFail()
        {
            Assert.IsNotAssignableFrom<Customer>(_controller.Put(
                  new Customer()
                  {
                      CustomerId = "c3",
                      FirstName = "sini",
                      LastName = "robin",
                      Email = "Sini@gmail.com",
                      PastOrderCount = "5"
                  }));
        }
    }
}
