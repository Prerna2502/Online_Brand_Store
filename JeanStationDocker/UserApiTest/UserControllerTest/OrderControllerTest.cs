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
    class OrderControllerTest
    {
        
        Mock<IOrdersService<Order>> mockService;
        OrdersController _controller;
        List<Order> orders;
        [OneTimeSetUp]
        public void SetUp()
        {
            mockService = new Mock<IOrdersService<Order>>();
            _controller = new OrdersController(mockService.Object);
            orders = new List<Order>()
                {
                    new Order() { ProductId="p1",StoreId="s1",CustomerId="c1"
                        ,Address="Global logic near white flied",OrderId="o1",Contact="22222222"
                        ,OrderStatus="Delivered",Quantity=3
                    },
                    new Order() { ProductId="p1",StoreId="s1",CustomerId="c1"
                        ,Address="Global logic near white flied",OrderId="o2",Contact="22222222"
                        ,OrderStatus="Delivered",Quantity=3
                    }
            };
            mockService.Setup(service => service.GetAllOrder()).Returns(orders);
        }
        [Test]
        public void TestGetAllOrderFail()
        {

            Assert.IsNotAssignableFrom<ActionResult<List<Order>>>(_controller.Get());
            Assert.IsNotNull(_controller.Get());
        }
        [Test]
        public void TestGetOrderByIdFail()
        {
            var result = _controller.Get("o2");
            Assert.False(result is IEnumerable<Order>);
        }
        [Test]
        public void TestDeleteOrderSuccess()
        {
            IActionResult actionResult = _controller.Delete("o1");
            Assert.IsNotNull(actionResult);
        }
        [Test]
        public void TestAddOrderSuccess()
        {
            Assert.IsInstanceOf<ObjectResult>(_controller.Post((new Order()
            {
                ProductId = "p1",
                StoreId = "s1",
                CustomerId = "c1",
                Address = "Global logic near white flied",
                OrderId = "o1",
                Contact = "22222222",
                OrderStatus = "Delivered",
                Quantity = 3
            })));
        }
        [Test]
        public void TestUpdateOrderFail()
        {
            Assert.IsNotAssignableFrom<Order>(_controller.Put("o1",
                new Order()
                {
                    ProductId = "p1",
                    StoreId = "s1",
                    CustomerId = "c1",
                    Address = "Global logic near white flied",
                    OrderId = "o1",
                    Contact = "22222222",
                    OrderStatus = "Delivered",
                    Quantity = 3
                }));
        }
    }
}
