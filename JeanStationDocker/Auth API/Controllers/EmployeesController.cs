using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthInterfaces.ServicesInterfaces;
using AuthModels;
using AuthExceptions;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json;

namespace Auth_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeServices<Employee> _services;
        public EmployeesController(IEmployeeServices<Employee> services)
        {
            _services = services;
        }
        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] Employee employee)
        {
            try
            {
                var result = _services.CreateEmployee(employee);
                if (result != null)
                    return StatusCode(201, "Employee successfuly registered");
                return StatusCode(StatusCodes.Status304NotModified, "Unable to register..Try again!!");
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
        public ActionResult<string> Login([FromBody] Employee employee)
        {
            try
            {
                if (_services.EmployeeLogin(employee.EmployeeId, employee.Password, employee.StoreId))
                    return GetToken(employee.EmployeeId, employee.StoreId);
                //return StatusCode(StatusCodes.Status202Accepted, GetToken(employee.EmployeeId,employee.StoreId));
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
        public ActionResult<IEnumerable<Employee>> Get()
        {
            try
            {
                var result = _services.GetAllEmployees();
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

        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public ActionResult<Employee> Get(string id)
        {
            try
            {
                var result = _services.GetEmployeeById(id);
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

        [HttpPost]
        [Route("Store")]
        public ActionResult<List<Employee>> GetByStore([FromBody]string sid)
        {
            try
            {
                var result = _services.GetEmployeesByStore(sid);
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
        public ActionResult<bool> Put(string id, [FromBody]Employee employee)
        {
            try
            {
                if(id==employee.EmployeeId)
                    return _services.UpdateEmployee(employee);
                throw new Exception();
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
                return _services.DeleteEmployee(id);
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
        private string GetToken(string employeeId, string storeId)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, employeeId),
                new Claim(JwtRegisteredClaimNames.UniqueName, storeId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this_is_employee"));
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
                type = "employee",
                storeId = storeId
            };
            return JsonConvert.SerializeObject(response);
        }
    }
}
