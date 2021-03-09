using System;
using System.Collections.Generic;
using System.Text;
using OrderDiscountService;
using OrderDiscountModels;
using OrderDiscountException;
using OrderDiscountInterfaces;
using Moq;
using NUnit.Framework;

namespace OrderDiscountApiTest
{
    class DiscountServiceTest
    {
        DiscountService _service;
        List<Discount> discounts;
        Mock<IDiscountRepository<Discount>> mockRepository;
        [OneTimeSetUp]
        public void setUp()
        {
            mockRepository = new Mock<IDiscountRepository<Discount>>();
            _service = new DiscountService(mockRepository.Object);
            discounts = new List<Discount>()
                {
                    new Discount() { MinimumOrderAmount=3000,MinimumPastOrder=7,DiscountPercent=60},
                   new Discount() { MinimumOrderAmount=600,MinimumPastOrder=7,DiscountPercent=60},
                   new Discount() { MinimumOrderAmount=9000,MinimumPastOrder=7,DiscountPercent=60}

                };
            mockRepository.Setup(repo => repo.GetAllDiscount()).Returns(discounts);
            mockRepository.Setup(repo => repo.AddDiscount(It.IsAny<Discount>())).Returns(true);


        }
        [Test]
        public void TestGetAllDiscountSuccess()
        {
            Assert.IsAssignableFrom<List<Discount>>(_service.GetAllDiscount());
        }
        [Test]
        public void TestAddDiscountSuccess()
        {
            Assert.AreEqual(true, _service.AddDiscount(new Discount() { MinimumOrderAmount = 9000, MinimumPastOrder = 7, DiscountPercent = 60 }));
        }
        [Test]
        public void TestUpdateDiscountByAmountThrowException()
        {
            var actual = Assert.Throws<DiscountNotFound>(() => _service.UpdateDiscountByAmount(2000, new Discount() { MinimumOrderAmount = 2000, MinimumPastOrder = 7, DiscountPercent = 60 }));
            Assert.AreEqual("Discount Not Found", actual.Message);
        }
        [Test]
        public void TestDeleteDiscountByAmountThrowException()
        {
            var actual = Assert.Throws<DiscountNotFound>(() => _service.DeleteDiscountByAmount(3000));
            Assert.AreEqual("Discount Not Found", actual.Message);
        }
    }
}

