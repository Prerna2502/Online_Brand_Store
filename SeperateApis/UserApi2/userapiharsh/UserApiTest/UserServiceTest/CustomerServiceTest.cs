using System;
using System.Collections.Generic;
using System.Text;
using Moq;
using NUnit.Framework;
using Service;
using UserException;
using UserInterface;
using UserModels;

namespace UserApiTest.UserServiceTest
{
    class CustomerServiceTest
    { 
        CustomerService _service;
        List<Customer> customers;
        Mock<ICustomerRepository<Customer>> mockRepository;
        [OneTimeSetUp]
        public void setUp()
        {
            mockRepository = new Mock<ICustomerRepository<Customer>>();
            _service = new CustomerService(mockRepository.Object);
            customers = new List<Customer>()
                    {
                    new Customer() { CustomerId="c1",FirstName="sini",LastName="robin"
                        ,Email="Sini@gmail.com",PastOrderCount=5
                    },
                     new Customer() { CustomerId="c2",FirstName="sini",LastName="robin"
                        ,Email="Sini@gmail.com",PastOrderCount=5
                    },
                      new Customer() { CustomerId="c3",FirstName="sini",LastName="robin"
                        ,Email="Sini@gmail.com",PastOrderCount=5
                    },
                };
            mockRepository.Setup(repo => repo.GetAllCustomers()).Returns(customers);
            mockRepository.Setup(repo => repo.AddCusetomer(It.IsAny<Customer>())).Returns(true);


        }
        [Test]
        public void TestGetAllCustomerSuccess()
        {
            Assert.IsAssignableFrom<List<Customer>>(_service.GetAllCustomers());
        }
        [Test]
        public void TestAddCustomerSuccess()
        {
            Assert.AreEqual(true, _service.AddCustomer((new Customer()
            {
                CustomerId = "c3",
                FirstName = "sini",
                LastName = "robin",
                Email = "Sini@gmail.com",
                PastOrderCount = 5
            })));
        }
        [Test]
        public void TestUpdateCustomerThrowException()
        {
            var actual = Assert.Throws<NoCustomerExistsException>(() => _service.UpdateCustomer("c1",new Customer()
            {
                CustomerId = "c3",
                FirstName = "sini",
                LastName = "robin",
                Email = "Sini@gmail.com",
                PastOrderCount = 5
            }));
            Assert.AreEqual("No Such CustomerId Exists", actual.Message);
        }
        [Test]
        public void TestDeleteCustomerThrowException()
        {
            var actual = Assert.Throws<NoCustomerExistsException>(() => _service.DeleteCustomer("c1"));
            Assert.AreEqual("No Such CustomerId Exists", actual.Message);
        }
    }
}

