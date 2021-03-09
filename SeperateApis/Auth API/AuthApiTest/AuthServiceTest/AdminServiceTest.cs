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
    class AdminServiceTest
    {
        AdminServices _service;
        List<Admin> admins;
        Mock<IAdminRepository<Admin>> mockRepository;
        [OneTimeSetUp]
        public void setUp()
        {
            mockRepository = new Mock<IAdminRepository<Admin>>();
            _service = new AdminServices(mockRepository.Object);
            admins = new List<Admin>()
                    {
                    new Admin() { AdminId="a1",AdminPassword="1234"
                    }
                };
            mockRepository.Setup(repo => repo.CreateAdmin(It.IsAny<Admin>())).Returns(It.IsAny<Admin>());
        }
        [Test]
        public void TestCreateAdminSuccess()
        {
            var actual = Assert.Throws<UserAlreadyExistsException>(() => _service.CreateAdmin(new Admin() { AdminId = "a1", AdminPassword = "1234" }));
            Assert.AreEqual("admin Id already exists!!", actual.Message);
        }
        [Test]
        public void TestAdminLoginServiceThrowException()
        {
            var actual = Assert.Throws<UserNotFoundException>(() => _service.AdminLoginService("a1","123"));
            Assert.AreEqual("Invalid admin Id!!", actual.Message);
        }
    }
}

