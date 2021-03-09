using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using UserInterface;
using UserModels;
using UserServiceAPI.Controllers;

namespace UserApiTest.UserControllerTest
{
    [TestFixture]
    class CartControllerTest
    {
        Mock<ICartServices<Cart>> mockService;
        CartController _controller;
        List<Cart> carts;
        [OneTimeSetUp]
        public void SetUp()
        {
            mockService = new Mock<ICartServices<Cart>>();
            _controller = new CartController(mockService.Object);
            carts = new List<Cart>()
                {
                    new Cart() { CustomerId = "c1", ProductId = "p1", Quantity = 6 },
                    new Cart() { CustomerId = "c2", ProductId = "p1", Quantity = 6 }
            };
            mockService.Setup(service => service.GetAllCart()).Returns(carts);
        }
        [Test]
        public void TestGetAllCartSuccess()
        {

            Assert.IsAssignableFrom<List<Cart>>(_controller.GetAllCarts());
            Assert.IsNotNull(_controller.GetAllCarts());
        }
        [Test]
        public void TestGetUserCartFail()
        {
            var result = _controller.GetUserCart("c2");
            Assert.False(result is List<Cart>);
        }
        [Test]
        public void TestDeleteCartSuccess()
        {
            IActionResult actionResult = _controller.DeleteCartItem("c1","p1");
            Assert.IsNotNull(actionResult);
        }
        [Test]
        public void TestAddCartSuccess()
        {
            Assert.IsInstanceOf<ObjectResult>(_controller.AddCart((new Cart() { CustomerId = "c1", ProductId = "p1", Quantity = 6 })));
        }
        [Test]
        public void TestUpdateCartFail()
        {
            Assert.IsNotAssignableFrom<Cart>(_controller.UpdateCart("c1","p1",
                 new Cart() { CustomerId = "c1", ProductId = "p1", Quantity = 6 }));
        }
    }
}
