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
    public class CustomersController : ControllerBase
    {
        readonly ICustomerService<Customer> _service;
        public CustomersController(ICustomerService<Customer> service)
        {
            _service = service;
        }
        // GET: api/<CustomersController>
        [HttpGet]
        public List<Customer> Get()
        {
            try
            {
                return _service.GetAllCustomers();
            }
            catch (Exception) { return null; }
        }

        // GET api/<CustomersController>/5
        [HttpGet("{customerId}")]
        public Customer Get(string customerId)
        {
            try
            {
                return _service.GetCustomer(customerId);
            }
            catch (Exception) { return null; }
        }

        // POST api/<CustomersController>
        [HttpPost]
        public IActionResult Post([FromBody] Customer customer)
        {
            try
            {
                _service.AddCustomer(customer);
                return StatusCode(200, "Added Customer To Db");
            }
            catch(CustomerExistsException ce) { return Conflict(ce.Message); }
            catch (Exception) { return StatusCode(500, "Internal Server Error"); }
        }
        // PUT api/<CustomersController>/5
        [HttpPut("{customerId}")]
        public IActionResult Put(string customerId, [FromBody] Customer customer)
        {
            try
            {
                _service.UpdateCustomer(customerId, customer);
                return StatusCode(200, "Updated Customer");
            }
            catch(NoCustomerExistsException nce) { return NotFound(nce.Message); }
            catch (Exception) { return StatusCode(500, "Internal Server Error"); }
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{customerId}")]
        public IActionResult Delete(string customerId)
        {
            try
            {
                _service.DeleteCustomer(customerId);
                return StatusCode(200, "Deleted the Custoemr");
            }
            catch (NoCustomerExistsException nce) { return NotFound(nce.Message); }
            catch (Exception) { return StatusCode(500, "Internal Server Error"); }
        }
    }
}
