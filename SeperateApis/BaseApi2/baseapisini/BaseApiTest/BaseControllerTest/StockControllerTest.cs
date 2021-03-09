using BaseModels;
using Interfaces.StockInterfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using ProductStoreStockApi.Controllers;
using System;
using System.Collections.Generic;
using System.Text;

namespace BaseApiTest.BaseControllerTest
{
    [TestFixture]
    class StockControllerTest
    {
        Mock<IStockServices<Stock>> mockService;
        StockController _controller;
        List<Stock> stocks;
        [OneTimeSetUp]
        public void SetUp()
        {
            mockService = new Mock<IStockServices<Stock>>();
            _controller = new StockController(mockService.Object);
            stocks = new List<Stock>()
                {
                     new Stock() { StoreId="s1",ProductId="p1",Quantity=6},
                     new Stock() { StoreId="s2",ProductId="p1",Quantity=4},
                     new Stock() { StoreId="s3",ProductId="p1",Quantity=8},
            };
            mockService.Setup(service => service.GetAllStock()).Returns(stocks);
        }
        [Test]
        public void TestGetProductSuccess()
        {

            Assert.IsAssignableFrom<ActionResult<List<Stock>>>(_controller.GetAllStock());
            Assert.IsNotNull(_controller.GetAllStock());
        }
        [Test]
        public void TestGetStockByProductIdSuccess()
        {
            var result = _controller.GetStockByProductId("p2");
            Assert.True(result is ActionResult<List<Stock>>);
        }
        [Test]
        public void TestDeleteStockSuccess()
        {
            IActionResult actionResult = _controller.DeleteStock("s1","p1");
            Assert.IsNotNull(actionResult);
        }
        [Test]
        public void TestAddStockSuccess()
        {
            Assert.IsInstanceOf<ObjectResult>(_controller.AddStock((new Stock() { StoreId = "s1", ProductId = "p1", Quantity = 6 })));
        }
        [Test]
        public void TestUpdateStockFail()
        {
            Assert.IsNotAssignableFrom<Stock>(_controller.UpdateStock("s1","p1",
                  new Stock() { StoreId = "s1", ProductId = "p1", Quantity = 6 }));
        }
    }
}

