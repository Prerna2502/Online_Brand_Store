using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserInterface;
using UserModels;
using UserException;
namespace UserServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        ICartServices<Cart> _service;
        public CartController(ICartServices<Cart> service)
        {
            _service = service;
        }
        [HttpGet]
        public List<Cart> GetAllCarts()
        {
            try
            {
                return _service.GetAllCart();
            }
            catch (Exception) { return null; }
        }
        [HttpGet("{customerId}/{productId}")]
        public Cart GetCart(string customerId,string productId)
        {
            try { return _service.GetCart(customerId, productId); }
            catch (Exception) { return null; }
        }
        [HttpGet("{customerId}")]
        public List<Cart> GetUserCart(string customerId)
        {
            try { return _service.GetUserCart(customerId); }
            catch (Exception) { return null; }
        }
        [HttpPost]
        //if duplicate cart item is added it increments the quantity by 1;
        public IActionResult AddCart([FromBody]Cart cart)
        {
            bool result;
            try
            {
                result = _service.AddCart(cart);
            }
            catch(Exception e)
            {
                return NotFound(e.Message);
            }
            if (result) return StatusCode(200, "Added to Cart");
            else return StatusCode(500, "Cant Add to Cart");
        }
        [HttpPut("{customerId}/{productId}")]
        public IActionResult UpdateCart(string customerId,string productId,[FromBody]Cart cart)
        {
            try
            {
                _service.UpdateCart(customerId, productId, cart);
                return StatusCode(200, "updated cart item");
            }
            catch(NoCartExistException nce)
            {
                return NotFound(nce.Message);
            }
            catch(Exception)
            {
                return StatusCode(500, "Internal server Error");
            }
        }
        [HttpDelete("{customerId}/{productId}")]
        public IActionResult DeleteCartItem(string customerId,string productId)
        {
            try
            {
                _service.DeleteCart(customerId, productId);
                return StatusCode(200, "Deleted the Cart Item");
            }
            catch(NoCartExistException nce)
            {
                return NotFound(nce.Message);
            }
            catch(Exception)
            {
                return StatusCode(500, "server Error On Deletion of Cart Item");
            }
        }
    }
}
