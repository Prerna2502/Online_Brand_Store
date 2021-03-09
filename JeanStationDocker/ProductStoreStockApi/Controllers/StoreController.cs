using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Services;
using BaseModels;
using BaseExceptions.StoreException;
using Interfaces.StoreInterfaces;

namespace ProductStoreStockApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        IStoreServices<Store> _storeServices;
        public StoreController(IStoreServices<Store> storeServices)
        {
            _storeServices = storeServices;
        }
        [HttpGet]
        public ActionResult<List<Store>> GetStores()
        {
            try
            {
                return _storeServices.GetStores();
            }
            catch(Exception)
            {
                return StatusCode(500, "Server error");
            }
        }
        [HttpGet("{storeId}")]
        public ActionResult<Store> GetStore(string storeId)
        {
            try
            {
                return _storeServices.GetStore(storeId);
            }
            catch(StoreNotFoundException s)
            {
                return Conflict(s.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server error");
            }
        }
        [HttpPost]
        public IActionResult AddStore([FromBody]Store store)
        {
            try
            {
                _storeServices.AddStore(store);
                return StatusCode(202,"Store Added Successfully");
            }
            catch(StoreExistException s)
            {
                return Conflict(s.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server error");
            }
        }
        [HttpPut("{storeId}")]
        public IActionResult UpdateStore(string storeId,[FromBody]Store store)
        {
            try
            {
                    _storeServices.UpdateStore(storeId, store);
                    return StatusCode(202,"Updated successfully");
            }
            catch(StoreNotFoundException s)
            {
                return Conflict(s.Message);
            }
            catch(WrongStoreIdException w)
            {
                return Conflict(w.Message);
            }
            catch(Exception)
            {
                return StatusCode(500, "Server error");
            }
        }
        [HttpDelete("{storeId}")]
        public IActionResult DeleteStore(string storeId)
        {
            try
            {
                _storeServices.DeleteStore(storeId);
                return StatusCode(200,"Deleted successfully");
            }
            catch(StoreNotFoundException s)
            {
                return Conflict(s.Message);
            }
            catch(Exception)
            {
                return StatusCode(500, "Server error");
            }
        }
    }
}
