using BaseExceptions.StockException;
using BaseModels;
using Interfaces.StockInterfaces;
using Moq;
using NUnit.Framework;
using Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace BaseApiTest.BaseServiceTest
{
    [TestFixture]
    class StockServiceTest
    {
        StockServices _service;
        List<Stock> stocks;
        Mock<IStockRepository<Stock>> mockRepository;
        [OneTimeSetUp]
        public void setUp()
        {
            mockRepository = new Mock<IStockRepository<Stock>>();
            _service = new StockServices(mockRepository.Object);
            stocks = new List<Stock>()
                {
                    new Stock() { StoreId="s1",ProductId="p1",Quantity=6},
                    new Stock() { StoreId="s2",ProductId="p1",Quantity=6},
                    new Stock() { StoreId="s3",ProductId="p1",Quantity=6},

                };
            mockRepository.Setup(repo => repo.GetAllStock()).Returns(stocks);
            mockRepository.Setup(repo => repo.AddStock(It.IsAny<Stock>())).Returns(true);


        }
        [Test]
        public void TestGetAllStockSuccess()
        {
            Assert.IsAssignableFrom<List<Stock>>(_service.GetAllStock());
        }
        [Test]
        public void TestAddStockSuccess()
        {
            Assert.AreEqual(true, _service.AddStock(new Stock() { StoreId = "s1", ProductId = "p1", Quantity = 6 }));
        }
        [Test]
        public void TestUpdateStockThrowException()
        {
            var StoreId = "s1";
            var ProductId = "p1";
            var actual = Assert.Throws<StockNotFound> (() => _service.UpdateStock("s1","p1",new Stock() { StoreId = "s1", ProductId = "p1", Quantity = 6 }));
            Assert.AreEqual($"Stock with Store Id:{StoreId} and ProductId:{ProductId} not found", actual.Message);
        }
        [Test]
        public void TestDeleteStockThrowException()
        {
            var StoreId = "s1";
            var ProductId = "p1";
            var actual = Assert.Throws<StockNotFound>(() => _service.DeleteStock("s1","p1"));
            Assert.AreEqual($"Stock with Store Id:{StoreId} and ProductId:{ProductId} not found", actual.Message);
        }
    }
}

