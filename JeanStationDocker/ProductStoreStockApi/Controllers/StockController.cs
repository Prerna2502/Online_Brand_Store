using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Services;
using BaseModels;
using BaseExceptions.StockException;
using Interfaces.StockInterfaces;

namespace ProductStoreStockApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        IStockServices<Stock> _stockServices;
        public StockController(IStockServices<Stock> stockServices)
        {
            _stockServices = stockServices;
        }
        [HttpGet]
        public ActionResult<List<Stock>> GetAllStock()
        {
            try
            {
                return _stockServices.GetAllStock();
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server error");
            }

        }
        [HttpGet("{productId}")]
        public ActionResult<List<Stock>> GetStockByProductId(string productId)
        {
            try
            {
                return _stockServices.GetStocksByProductId(productId);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server error");
            }
        }
        [HttpGet("{storeId}/{productId}")]
        public ActionResult<Stock> GetStock(string storeId, string productId)
        {
            try
            {
                return _stockServices.GetStock(storeId, productId);
            }
            catch(StockNotFound s)
            {
                return StatusCode(404,s.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server error"); 
            }

        }
        [HttpPost]
        public IActionResult AddStock([FromBody]Stock stock)
        {
            try
            {
                _stockServices.AddStock(stock);
                return StatusCode(201,"Added successfully");
            }
            catch(StockExistException sec)
            {
                return Conflict(sec.Message);
            }
            catch(Exception)
            {
                return StatusCode(500, "Some Server Error Occoured");

            }

        }
        [HttpPut("{storeId}/{productId}")]
        public IActionResult UpdateStock(string storeId, string productId, Stock stock)
        {
            try
            {
                _stockServices.UpdateStock(storeId, productId, stock);
                return StatusCode(202,"Updated successfully");
            }
            catch(StockNotFound s)
            {
                return Conflict(s.Message);
            }
            catch(Exception)
            {
                return StatusCode(500, "Some Server Error Occoured");
            }
        }
        [HttpDelete("{storeId}/{productId}")]
        public IActionResult DeleteStock(string storeId, string productId)
        {
            try
            {
                     _stockServices.DeleteStock(storeId, productId);
                    return StatusCode(200,"Deleted successfully");
            }
            catch (StockNotFound s)
            {
                return Conflict(s.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some Server Error Occoured");
            }
        }
    }
}

