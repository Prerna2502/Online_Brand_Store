using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserModels;
using UserInterface;
using UserException;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UserServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        IOrdersService<Order> _service;
        public OrdersController(IOrdersService<Order> service)
        {
            _service = service;
        }
        // GET: api/<OrdersController>
        [HttpGet]
        public IEnumerable<Order> Get()
        {
            try
            {
                return _service.GetAllOrder();
            }
            catch (Exception) { return null; }
        }

        // GET api/<OrdersController>/5
        [HttpGet("{customerId}")]
        public IEnumerable<Order> Get(string customerId)
        {
            try
            {
                return _service.GetUserOrder(customerId);
            }
            catch (Exception) { return null; }
        }

        // POST api/<OrdersController>
        [HttpPost]
        public IActionResult Post([FromBody] Order order)
        {
            try
            {
                _service.AddOrder(order);
                return StatusCode(200, "Added to Orders");
            }
            catch(OrderExistsException oe)
            {
                return NotFound(oe.Message);
            }
            catch(Exception)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        // PUT api/<OrdersController>/5
        [HttpPut("{orderId}")]
        public IActionResult Put(string orderId, [FromBody] Order order)
        {
            try
            {
                _service.UpdateOrder(orderId, order);
                return StatusCode(200, "Updated The Order");
            }
            catch(NoOrderExistsException noe)
            {
                return NotFound(noe.Message);
            }
            catch(Exception)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        // DELETE api/<OrdersController>/5
        [HttpDelete("{orderId}")]
        public IActionResult Delete(string orderId)
        {
            try
            {
                _service.DeleteOrderByOrderId(orderId);
                return StatusCode(200, "Deleted This Order");
            }
            catch(NoOrderExistsException noe)
            {
                return NotFound(noe.Message);
            }
            catch(Exception)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
