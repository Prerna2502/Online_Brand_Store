using Moq;
using NUnit.Framework;
using Service;
using System;
using System.Collections.Generic;
using System.Text;
using UserException;
using UserInterface;
using UserModels;

namespace UserApiTest.UserServiceTest
{
    [TestFixture]
    class CartServiceTest
    {
        CartServices _service;
        List<Cart> carts;
        Mock<ICartRepository<Cart>> mockRepository;
        [OneTimeSetUp]
        public void setUp()
        {
            mockRepository = new Mock<ICartRepository<Cart>>();
            _service = new CartServices(mockRepository.Object);
            carts = new List<Cart>()
                {
                    new Cart() { CustomerId="c1",ProductId="p1",Quantity=6},
                    new Cart() { CustomerId="c2",ProductId="p1",Quantity=6},
                    new Cart() { CustomerId="s3",ProductId="p1",Quantity=6},

                };
            mockRepository.Setup(repo => repo.GetAllCart()).Returns(carts);
            mockRepository.Setup(repo => repo.AddCart(It.IsAny<Cart>())).Returns(true);


        }
        [Test]
        public void TestGetAllCartSuccess()
        {
            Assert.IsAssignableFrom<List<Cart>>(_service.GetAllCart());
        }
        [Test]
        public void TestAddCartSuccess()
        {
            Assert.AreEqual(true, _service.AddCart(new Cart() { CustomerId = "c1", ProductId = "p1", Quantity = 6 }));
        }
        [Test]
        public void TestUpdateCartThrowException()
        {
            var actual = Assert.Throws<NoCartExistException>(() => _service.UpdateCart("c1", "p1", new Cart() { CustomerId= "c1", ProductId = "p1", Quantity = 6 }));
            Assert.AreEqual("No Such Cart Item Exists", actual.Message);
        }
        [Test]
        public void TestDeleteCartThrowException()
        { 
            var actual = Assert.Throws<NoCartExistException>(() => _service.DeleteCart("c1", "p1"));
            Assert.AreEqual("No Such Cart Item Exists", actual.Message);
        }
    }
}

