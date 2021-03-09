using System;
using System.Collections.Generic;
using System.Text;
using Moq;
using NUnit.Framework;
using Service;
using UserException;
using UserInterface;
using UserModels;

namespace UserApiTest.UserServiceTest
{
    class OrderServiceTest
    {

        OrdersService _service;
        List<Order> orders;
        Mock<IOrderRepository<Order>> mockRepository;
        [OneTimeSetUp]
        public void setUp()
        {
            mockRepository = new Mock<IOrderRepository<Order>>();
            _service = new OrdersService(mockRepository.Object);
            orders = new List<Order>()
                {
                    new Order() { ProductId="p1",StoreId="s1",CustomerId="c1"
                        ,Address="Global logic near white flied",OrderId="o1",Contact="22222222"
                        ,OrderStatus="Delivered",Quantity=3
                    },
                    new Order() { ProductId="p1",StoreId="s1",CustomerId="c1"
                        ,Address="Global logic near white flied",OrderId="o2",Contact="22222222"
                        ,OrderStatus="Delivered",Quantity=3
                    },
                    new Order() { ProductId="p1",StoreId="s1",CustomerId="c1"
                        ,Address="Global logic near white flied",OrderId="o3",Contact="22222222"
                        ,OrderStatus="Delivered",Quantity=3
                    }

                };
            mockRepository.Setup(repo => repo.GetAllOrders()).Returns(orders);
            mockRepository.Setup(repo => repo.AddOrder(It.IsAny<Order>())).Returns(true);


        }
        [Test]
        public void TestGetAllOrdersSuccess()
        {
            Assert.IsAssignableFrom<List<Order>>(_service.GetAllOrder());
        }
        [Test]
        public void TestAddOrderSuccess()
        {
            Assert.AreEqual(true, _service.AddOrder(new Order()
            {
                ProductId = "p1",
                StoreId = "s1",
                CustomerId = "c1",
                Address = "Global logic near white flied",
                OrderId = "o3",
                Contact = "22222222",
                OrderStatus = "Delivered",
                Quantity = 3
            }));
        }
        [Test]
        public void TestUpdateOrderThrowException()
        {
            var actual = Assert.Throws<NoOrderExistsException>(() => _service.UpdateOrder("o1",new Order()
            {
                ProductId = "p1",
                StoreId = "s1",
                CustomerId = "c1",
                Address = "Global logic near white flied",
                OrderId = "o3",
                Contact = "22222222",
                OrderStatus = "Delivered",
                Quantity = 3
            }));
            Assert.AreEqual("No Such Order Item Exists", actual.Message);
        }
        [Test]
        public void TestDeleteOrderThrowException()
        {
            var actual = Assert.Throws<NoOrderExistsException>(() => _service.DeleteOrderByOrderId("o1"));
            Assert.AreEqual("No Such Order Item Exists", actual.Message);
        }
    }
}

