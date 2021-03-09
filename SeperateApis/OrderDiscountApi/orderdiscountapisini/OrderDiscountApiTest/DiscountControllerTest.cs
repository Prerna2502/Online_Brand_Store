using Moq;
using NUnit.Framework;
using OrderDiscountInterfaces;
using OrderDiscountModels;
using System;
using System.Collections.Generic;
using System.Text;
using OrderDiscountApi.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace OrderDiscountApiTest
{
    [TestFixture]
    class DiscountControllerTest
    {
        Mock<IDiscountService<Discount>> mockService;
        DiscountController _controller;
        List<Discount> discounts;
        [OneTimeSetUp]
        public void SetUp()
        {
            mockService = new Mock<IDiscountService<Discount>>();
            _controller = new DiscountController(mockService.Object);
            discounts = new List<Discount>()
                {
                     new Discount() { MinimumOrderAmount=3000,MinimumPastOrder=7,DiscountPercent=60},
                   new Discount() { MinimumOrderAmount=600,MinimumPastOrder=7,DiscountPercent=60},
                   new Discount() { MinimumOrderAmount=9000,MinimumPastOrder=7,DiscountPercent=60}
            };
            mockService.Setup(service => service.GetAllDiscount()).Returns(discounts);
        }
        [Test]
        public void TestGetAllDiscountSuccess()
        {

            Assert.IsAssignableFrom<ActionResult<List<Discount>>>(_controller.GetAllDiscount());
            Assert.IsNotNull(_controller.GetAllDiscount());
        }
        [Test]
        public void TestGetDiscountByMinimumAmountSuccess()
        {
            var result = _controller.GetDiscountByAmount(5000);
            Assert.True(result is ActionResult<Discount>);
        }
        [Test]
        public void TestDeleteDiscountSuccess()
        {
            IActionResult actionResult = _controller.DeleteDiscountByAmount(4000);
            Assert.IsNotNull(actionResult);
        }
        [Test]
        public void TestAddDiscountSuccess()
        {
            Assert.IsInstanceOf<ObjectResult>(_controller.AddDiscount((new Discount() { MinimumOrderAmount = 3000, MinimumPastOrder = 7, DiscountPercent = 60 })));
        }
        [Test]
        public void TestUpdateDiscountFail()
        {
            Assert.IsNotAssignableFrom<Discount>(_controller.UpdateDiscountByAmount(2000,
                  new Discount() { MinimumOrderAmount = 3000, MinimumPastOrder = 7, DiscountPercent = 60 }));
        }
    }
}
