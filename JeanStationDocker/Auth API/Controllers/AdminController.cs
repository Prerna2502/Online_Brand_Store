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
    public class AdminController : ControllerBase
    {
        private readonly IAdminServices<Admin> _services;
        public AdminController(IAdminServices<Admin> services)
        {
            _services = services;
        }
        [HttpGet]
        public void Get()
        {
        }
        [HttpPost]
        [Route("Register")]
        public Admin Register([FromBody] Admin admin)
        {
            return _services.CreateAdmin(admin);
        }
        [HttpPost]
        [Route("Login")]
        public ActionResult<string> Login([FromBody] Admin admin)
        {
            try
            {
                if (_services.AdminLoginService(admin.AdminId, admin.AdminPassword))
                    return GetToken(admin.AdminId);
                //return StatusCode(StatusCodes.Status202Accepted,GetToken(admin.AdminId));
                else
                    return StatusCode(StatusCodes.Status304NotModified, "Unable to login..Try again!!");
            }
            catch (UserNotFoundException ne)
            {
                return NotFound(ne.Message);
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }
        private string GetToken(string adminId)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, adminId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("global_access_admin"));
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
                type = "admin"
            };
            return JsonConvert.SerializeObject(response);
        }
    }
}
