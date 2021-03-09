using System;
using System.Collections.Generic;
using System.Text;
using Moq;
using NUnit.Framework;
using BaseModels;
using Services;
using Interfaces.ProductInterfaces;
using BaseExceptions.ProductException;

namespace BaseApiTest.BaseServiceTest
{
    [TestFixture]
    class ProductServiceTest
    {
        
            ProductServices _service;
            List<Product> products;
            Mock<IProductRepository<Product>> mockRepository;
            [OneTimeSetUp]
            public void setUp()
            {
                mockRepository = new Mock<IProductRepository<Product>>();
                _service = new ProductServices(mockRepository.Object);
                products = new List<Product>()
                {
                    new Product() { ProductId="p1",ProductName="Red Slint Bag",ProductPrice=3000
                        ,ProductType="Slint Bag",Gender="F",Description="Red Slint Bag made of Leather"
                        ,FilterTag="Red Slint"
                    },
                    new Product() { ProductId="p2",ProductName="Red Slint Bag",ProductPrice=3000
                        ,ProductType="Slint Bag",Gender="F",Description="Red Slint Bag made of Leather"
                        ,FilterTag="Red Slint"
                    }

                };
            mockRepository.Setup(repo => repo.GetProducts()).Returns(products);
            mockRepository.Setup(repo => repo.AddProducts(It.IsAny<Product>())).Returns(true);
      

        }
        [Test]
        public void TestGetProductsSuccess()
        {
            Assert.IsAssignableFrom<List<Product>>(_service.GetProducts());
        }
        [Test]
        public void TestAddProductSuccess()
        {
            Assert.AreEqual(true, _service.AddProducts(new Product()
            {
                ProductId = "p3",
                ProductName = "Red Slint Bag",
                ProductPrice = 3000,
                ProductType = "Slint Bag",
                Gender = "F",
                Description = "Red Slint Bag made of Leather"
                        ,
                FilterTag = "Red Slint"
            }));
        }
        [Test]
        public void TestUpdateProductThrowException()
        {
            var actual = Assert.Throws<ProductNotFoundException>(() => _service.UpdateProduct(new Product()
            {
                ProductId = "p1",
                ProductName = "Green Slint Bag",
                ProductPrice = 8000
                        ,
                ProductType = "Slint Bag",
                Gender = "F",
                Description = "Green Slint Bag made of Leather"
                        ,
                FilterTag = "Red Slint"
            }, "p1"));
            Assert.AreEqual("Product Not found", actual.Message);
        }
        [Test]
        public void TestUpdateProductThrowInCorrectIdException()
        {
            var actual = Assert.Throws<WrongProductIdException>(() => _service.UpdateProduct(new Product()
            {
                ProductId = "p2",
                ProductName = "Green Slint Bag",
                ProductPrice = 8000
                        ,
                ProductType = "Slint Bag",
                Gender = "F",
                Description = "Green Slint Bag made of Leather"
                        ,
                FilterTag = "Red Slint"
            }, "p1"));
            Assert.AreEqual("Incorrect Id for Update", actual.Message);
        }
        [Test]
        public void TestDeleteProductThrowException()
        {
            var actual = Assert.Throws<ProductNotFoundException>(() => _service.DeleteProduct("p1"));
            Assert.AreEqual("Product Not found", actual.Message);
        }
    }
}
