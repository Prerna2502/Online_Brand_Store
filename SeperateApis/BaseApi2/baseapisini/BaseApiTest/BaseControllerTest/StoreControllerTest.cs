using BaseModels;
using Interfaces.StoreInterfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using ProductStoreStockApi.Controllers;
using System;
using System.Collections.Generic;
using System.Text;

namespace BaseApiTest.BaseControllerTest
{
    class StoreControllerTest
    {
        Mock<IStoreServices<Store>> mockService;
        StoreController _controller;
        List<Store> stores;
        [OneTimeSetUp]
        public void SetUp()
        {
            mockService = new Mock<IStoreServices<Store>>();
            _controller = new StoreController(mockService.Object);
            stores = new List<Store>()
                {
                    new Store() { StoreId="s1",Location="bengaluru",Manager="Teju"
                        ,Contact="8787878787",Address="Globallogic near Whitefied"
                    },
                    new Store() { StoreId="s2",Location="bengaluru",Manager="Teju"
                        ,Contact="8787878787",Address="Globallogic near Whitefied"
                    },
                    new Store() { StoreId="s3",Location="bengaluru",Manager="Teju"
                        ,Contact="8787878787",Address="Globallogic near Whitefied"
                    }
            };
            mockService.Setup(service => service.GetStores()).Returns(stores);
        }
        [Test]
        public void TestGetStoresSuccess()
        {

            Assert.IsAssignableFrom<ActionResult<List<Store>>>(_controller.GetStores());
            Assert.IsNotNull(_controller.GetStores());
        }
        [Test]
        public void TestGetStoreByIdSuccess()
        {
            var result = _controller.GetStore("s2");
            Assert.True(result is ActionResult<Store>);
        }
        [Test]
        public void TestDeleteStoreSuccess()
        {
            IActionResult actionResult = _controller.DeleteStore("p1");
            Assert.IsNotNull(actionResult);
        }
        [Test]
        public void TestAddStoreSuccess()
        {
            Assert.IsInstanceOf<ObjectResult>(_controller.AddStore((new Store()
            {
                StoreId = "s3",
                Location = "bengaluru",
                Manager = "Teju"
                        ,
                Contact = "8787878787",
                Address = "Globallogic near Whitefied"
            })));
        }
        [Test]
        public void TestUpdateStoreFail()
        {
            Assert.IsNotAssignableFrom<Store>(_controller.UpdateStore("s1",
                new Store()
                {
                    StoreId = "s3",
                    Location = "bengaluru",
                    Manager = "Teju"
                        ,
                    Contact = "8787878787",
                    Address = "Globallogic near Whitefied"
                }));
        }
    }
}

