using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using Services;
using BaseModels;
using Interfaces.StoreInterfaces;
using Moq;
using BaseExceptions.StoreException;

namespace BaseApiTest.BaseServiceTest
{
    [TestFixture]
    class StoreServiceTest
    {
        StoreServices _service;
        List<Store> stores;
        Mock<IStoreRepository<Store>> mockRepository;
        [OneTimeSetUp]
        public void setUp()
        {
            mockRepository = new Mock<IStoreRepository<Store>>();
            _service = new StoreServices(mockRepository.Object);
            stores = new List<Store>()
                {
                    new Store() { StoreId="s1",Location="bengaluru",Manager="Teju"
                        ,Contact="8787878787",Address="Globallogic near Whitefied"
                    },
                    new Store() { StoreId="s2",Location="bengaluru",Manager="Teju"
                        ,Contact="8787878787",Address="Globallogic near Whitefied"
                    }

                };
            mockRepository.Setup(repo => repo.GetStores()).Returns(stores);


        }
        [Test]
        public void TestGetStoreSuccess()
        {
            Assert.IsAssignableFrom<List<Store>>(_service.GetStores());
        }
        [Test]
        public void TestGetStoreThrowException()
        {
            var actual = Assert.Throws<StoreNotFoundException>(() => _service.GetStore("s1"));
            Assert.AreEqual("Store Not Found", actual.Message);
        }
        [Test]
        public void TestUpdateStoreThrowException()
        {
            var actual = Assert.Throws<WrongStoreIdException>(() => _service.UpdateStore("s1",new Store()
            {
                StoreId = "s2",
                Location = "bengaluru",
                Manager = "Teju",
                Contact = "8787878787",
                Address = "Globallogic near Whitefied"
            }));
            Assert.AreEqual("invalid store id", actual.Message);
        }
    }
}
