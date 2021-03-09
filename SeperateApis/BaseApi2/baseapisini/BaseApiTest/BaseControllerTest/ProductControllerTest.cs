using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using Services;
using BaseModels;
using ProductStoreStockApi.Controllers;
using Moq;
using Interfaces.ProductInterfaces;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http;
using System.Web.Http.Results;
using System.Net;
using Microsoft.AspNetCore.Http;

namespace BaseApiTest.BaseControllerTest
{
    [TestFixture]
    class ProductControllerTest
    {
        Mock<IProductServices<Product>> mockService;
        ProductController _controller;
        List<Product> products;
        [OneTimeSetUp]
        public void SetUp()
        {
            mockService = new Mock<IProductServices<Product>>();
            _controller = new ProductController(mockService.Object);
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
            mockService.Setup(service => service.GetProducts()).Returns(products);
        }
        [Test]
        public void TestGetProductSuccess()
        {
            
            Assert.IsAssignableFrom<ActionResult<List<Product>>>(_controller.GetProducts());
            Assert.IsNotNull(_controller.GetProducts());
        }
        [Test]
        public void TestGetProductByIdSuccess()
        {
            var result=_controller.GetProducts("p2");
            Assert.True(result is ActionResult<Product>);
        }
        [Test]
        public void TestDeleteProductSuccess()
        {
            IActionResult actionResult = _controller.DeleteProduct("p1");
            Assert.IsNotNull(actionResult);
        }
        [Test]
        public void TestAddProductSuccess()
        {
             Assert.IsInstanceOf<ObjectResult> (_controller.AddProducts((new Product()
            {
                ProductId = "p3",
                ProductName = "Red Slint Bag",
                ProductPrice = 3000,
                ProductType = "Slint Bag",
                Gender = "F",
                Description = "Red Slint Bag made of Leather",
                FilterTag = "Red Slint"
            })));
        }
        [Test]
        public void TestUpdateProductFail()
        {
            Assert.IsNotAssignableFrom<Product>(_controller.UpdateProduct(
                 new Product()
                 {
                     ProductId = "p2",
                     ProductName = "Red Slint Bag",
                     ProductPrice = 3000
                        ,
                     ProductType = "Slint Bag",
                     Gender = "F",
                     Description = "Red Slint Bag made of Leather"
                        ,
                     FilterTag = "Red Slint"
                 }, "p1"));
        }
    }
}
