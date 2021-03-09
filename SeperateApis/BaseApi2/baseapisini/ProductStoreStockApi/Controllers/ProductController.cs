using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.ProductInterfaces;
using BaseModels;
using BaseExceptions.ProductException;
namespace ProductStoreStockApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        IProductServices<Product> _service;
        public ProductController(IProductServices<Product> service)
        {
            _service = service;
        }
        [HttpGet]
        public ActionResult<List<Product>> GetProducts()
        {
            try
            {
                return _service.GetProducts();
            }
           catch(Exception)
            {
                return StatusCode(500, "some server error");
            }
        }
        [HttpGet("productId/{id}")]
        public ActionResult<Product> GetProducts(string id)
        {
            try
            {
                return _service.GetProducts(id);
            }
            catch (ProductNotFoundException p)
            {
                return Conflict(p.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "some server error");
            }

        }
        [HttpGet("categoryonly/{category}")]
        public ActionResult<List<Product>> GetProductsByCategoryOnly(string category)
        {
            try
            {
                return _service.GetProductsByCategoryOnly(category);
            }
            catch (ProductNotFoundException p)
            {
                return Conflict(p.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "some server error");
            }
        }
        [HttpGet("category/{category}")]
        public ActionResult<List<Product>> GetProductsByCategory(string category)
        {
            try
            {
                return _service.GetProductsByCategory(category);
            }
            catch (ProductNotFoundException p)
            {
                return Conflict(p.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "some server error");
            }

        }
        [HttpGet("productname/{productname}")]
        public ActionResult<List<Product>> GetProductsByName(string productname)
        {
            try
            {
                return _service.GetProductsByName(productname);
            }
            catch (ProductNotFoundException p)
            {
                return Conflict(p.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "some server error");
            }
        }
        [HttpGet("gender/{gender}")]
        public ActionResult<List<Product>> GetProductsByGender(string gender)
        {
            try
            {
                return _service.GetProductsByGender(gender);
            }
            catch (ProductNotFoundException p)
            {
                return Conflict(p.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "some server error");
            }
        }
        [HttpGet("tag/{tags}")]
        public ActionResult<List<Product>> GetProductsByTags(string tags)
        {
            try
            {
                return _service.GetProductsByTag(tags);
            }
            catch (ProductNotFoundException p)
            {
                return Conflict(p.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "some server error");
            }
        }

        [HttpPost]
        public IActionResult AddProducts([FromBody] Product product)
        {
            try
            {
                _service.AddProducts(product);
            }
            catch (ProductExistsException pe)
            {
                return Conflict(pe.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server Error Occoured");
            }
            return StatusCode(StatusCodes.Status201Created, "Products Added Successfully ");
        }
        [HttpPut("{id}")]
        public IActionResult UpdateProduct([FromBody] Product product, String id)
        {
            
            try
            {
                _service.UpdateProduct(product, id);
                return StatusCode(202,"Product Updated successfully");
            }
            catch(ProductNotFoundException p)
            {
                return Conflict(p.Message);
            }
            catch (WrongProductIdException we)
            {
                return Conflict(we.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server Error");
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(string id)
        {
            try
            {
                 _service.DeleteProduct(id);
                return StatusCode(200,"Product deleted successfully");
            }
            catch (ProductNotFoundException p)
            {
                return Conflict(p.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server Error");
            }
        }
    }
}

