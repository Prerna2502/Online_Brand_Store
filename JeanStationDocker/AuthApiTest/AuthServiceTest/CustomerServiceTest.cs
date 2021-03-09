using System;
using System.Collections.Generic;
using System.Text;
using AuthExceptions;
using AuthInterfaces.RepositoryInterfaces;
using AuthModels;
using AuthServices;
using Moq;
using NUnit.Framework;

namespace AuthApiTest.AuthServiceTest
{
    [TestFixture]
    class CustomerServiceTest
    {

        CustomerServices _service;
        List<Customer> customers;
        Mock<ICustomerRepository<Customer>> mockRepository;
        [OneTimeSetUp]
        public void setUp()
        {
            mockRepository = new Mock<ICustomerRepository<Customer>>();
            _service = new CustomerServices(mockRepository.Object);
            customers = new List<Customer>()
                    {
                    new Customer() { CustomerId="c1",FirstName="sini",LastName="robin"
                        ,Email="Sini@gmail.com",ContactNo="2222222222",PastOrderCount="5"
                        ,Password="123"
                    },
                     new Customer() { CustomerId="c2",FirstName="sini",LastName="robin"
                        ,Email="Sini@gmail.com",PastOrderCount="5",Password="123"
                    },
                      new Customer() { CustomerId="c3",FirstName="sini",LastName="robin"
                        ,Email="Sini@gmail.com",PastOrderCount="5",Password="123"
                    },
                };
            mockRepository.Setup(repo => repo.GetAllCustomers()).Returns(customers);
            mockRepository.Setup(repo => repo.CreateCustomer(It.IsAny<Customer>())).Returns(It.IsAny<Customer>());


        }
        [Test]
        public void TestGetAllCustomerSuccess()
        {
            Assert.IsAssignableFrom<List<Customer>>(_service.GetAllCustomers());
        }
        [Test]
        public void TestCreateCustomerSuccess()
        {
            var actual = Assert.Throws<UserAlreadyExistsException>(() => _service.CreateCustomer(new Customer()
            {
                CustomerId = "c3",
                FirstName = "sini",
                LastName = "robin",
                Email = "Sini@gmail.com",
                PastOrderCount = "5",
                Password = "123"
            }));
            Assert.AreEqual("customer Id already exists!!", actual.Message);
        }
        [Test]
        public void TestUpdateCustomerThrowException()
        {
            var actual = Assert.Throws<UserNotFoundException>(() => _service.UpdateCustomer(new Customer()
            {
                CustomerId = "c3",
                FirstName = "sini",
                LastName = "robin",
                Email = "Sini@gmail.com",
                PastOrderCount = "5",
                Password = "123"
            }));
            Assert.AreEqual("No customer with this Id exists!!", actual.Message);
        }
        [Test]
        public void TestDeleteCustomerThrowException()
        {
            var actual = Assert.Throws<UserNotFoundException>(() => _service.DeleteCustomer("c1"));
            Assert.AreEqual("No customer with this Id existed anyway!!", actual.Message);
        }
    }
}

