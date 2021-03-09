using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OrderDiscountService;
using OrderDiscountModels;
using OrderDiscountException;
using OrderDiscountInterfaces;
namespace OrderDiscountApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        IDiscountService<Discount> _service;
        public DiscountController(IDiscountService<Discount> service)
        {
            _service = service;
        }
        [HttpGet]
        public ActionResult<List<Discount>> GetAllDiscount()
        {
            try
            {
                return _service.GetAllDiscount();
            }
            catch(Exception)
            {
                return StatusCode(500, "Some Server Error");
            }
        }
        [HttpGet("bydiscount/{amount}")]
        public ActionResult<Discount> GetDiscountByAmount(decimal amount)
        {
            try
            {
                return _service.GetDiscountByAmount(amount);
            }
            catch (DiscountNotFound d)
            {
                return StatusCode(404, d.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server Error");
            }
        }
        [HttpGet("applydiscount/{amount}")]
        public ActionResult<Discount> GetDiscountBasedOnAmount(decimal amount)
        {
            try
            {
                return _service.GetDiscountBasedOnAmount(amount);
            }
            catch (DiscountNotFound d)
            {
                return StatusCode(404, d.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server Error");
            }
        }
        [HttpPost]
        public IActionResult AddDiscount([FromBody]Discount discount)
        {
            try
            {
                _service.AddDiscount(discount);
                return StatusCode(StatusCodes.Status201Created, "Added Successfully");
            }
            catch (DiscountExist d)
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, d.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server Error");
            }
        }
        [HttpPut("{amount}")]
        public IActionResult UpdateDiscountByAmount(decimal amount,[FromBody]Discount discount)
        {
            try
            {
                _service.UpdateDiscountByAmount(amount, discount);
                return StatusCode(StatusCodes.Status202Accepted, "Updated Successfully");
            }
            catch (DiscountNotFound d)
            {
                return StatusCode(404, d.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server Error");
            }
        }
        [HttpDelete("{amount}")]
        public IActionResult DeleteDiscountByAmount(decimal amount)
        {
            try
            {
                _service.DeleteDiscountByAmount(amount);
                return StatusCode(StatusCodes.Status202Accepted, "Deleted Successfully");
            }
            catch (DiscountNotFound d)
            {
                return StatusCode(404, d.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server Error");
            }
        }
    }
}
