using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthInterfaces.ServicesInterfaces;
using AuthModels;
using AuthExceptions;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json;

namespace Auth_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerServices<Customer> _services;
        public CustomersController(ICustomerServices<Customer> services)
        {
            _services = services;
        }
        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] Customer customer)
        {
            try
            {
                var result = _services.CreateCustomer(customer);
                if(result != null)
                    return StatusCode(201, "You are successfuly registered");
                return StatusCode(StatusCodes.Status304NotModified,"Unable to register..Try again!!");
            }
            catch (UserAlreadyExistsException ue)
            {
                return Conflict(ue.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "There is some server error");
            }
        }
        [HttpPost]
        [Route("Login")]
        public ActionResult<string> Login([FromBody] Customer customer)
        {
            try
            {
                if (_services.CustomerLogin(customer.CustomerId, customer.Password))
                    return GetToken(customer.CustomerId);
                //return StatusCode(StatusCodes.Status202Accepted,GetToken(customer.CustomerId));
                else
                    return StatusCode(StatusCodes.Status304NotModified, "Unable to login..Try again!!");
            }
            catch (UserNotFoundException ne)
            {
                return NotFound(ne.Message);
            }
            catch
            {
                return StatusCode(500, "There is some server error");
            }
        }

        // GET: api/<CustomersController>
        [HttpGet]
        public ActionResult<IEnumerable<Customer>> Get()
        {
            try
            {
                var result = _services.GetAllCustomers();
                return result;
            }
            catch(UserNotFoundException ne)
            {
                return NotFound(ne.Message);
            }
            catch
            {
                return StatusCode(500, "There is some server error");
            }
        }

        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public ActionResult<Customer> Get(string id)
        {
            try
            {
                var result = _services.GetCustomerById(id);
                return result;
            }
            catch (UserNotFoundException ne)
            {
                return NotFound(ne.Message);
            }
            catch
            {
                return StatusCode(500, "There is some server error");
            }
        }

        // PUT api/<CustomersController>/5
        [HttpPut("{id}")]
        public ActionResult<bool> Put(Customer customer)
        {
            try
            {
                return _services.UpdateCustomer(customer);
            }
            catch (UserNotFoundException ne)
            {
                return NotFound(ne.Message);
            }
            catch
            {
                return StatusCode(500, "There is some server error");
            }
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(string id)
        {
            try
            {
                return _services.DeleteCustomer(id);
            }
            catch (UserNotFoundException ne)
            {
                return NotFound(ne.Message);
            }
            catch
            {
                return StatusCode(500, "There is some server error");
            }
        }
        private string GetToken(string customerId)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, customerId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this_is_customer"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: "AuthenticationServer",
                audience: "AuthClient",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(20),
                signingCredentials: creds
                );
            var response = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                type = "customer",
                cId = customerId
            };
            return JsonConvert.SerializeObject(response);
        }
    }
}
