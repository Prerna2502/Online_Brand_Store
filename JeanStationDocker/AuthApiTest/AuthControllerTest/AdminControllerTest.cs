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
    class AdminControllerTest
    {
        Mock<IAdminServices<Admin>> mockService;
        AdminController _controller;
        List<Admin> admins;
        [OneTimeSetUp]
        public void SetUp()
        {
            mockService = new Mock<IAdminServices<Admin>>();
            _controller = new AdminController(mockService.Object);
            mockService.Setup(repo => repo.CreateAdmin(It.IsAny<Admin>())).Returns(It.IsAny<Admin>());
        }
        [Test]
        public void TestRegisterSuccess()
        {
            Admin result=_controller.Register((new Admin() { AdminId = "a1", AdminPassword = "1234" }));
            Assert.IsNull(result);
        }
        [Test]
        public void TestLoginSuccess()
        {
            Assert.IsInstanceOf<ActionResult<string>>(_controller.Login((new Admin() { AdminId = "a1", AdminPassword = "1234" })));
        }

    }
}
