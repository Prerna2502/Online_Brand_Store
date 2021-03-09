using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OrderDiscountException;
using OrderDiscountModels;
using OrderDiscountInterfaces;
namespace OrderDiscountService
{
    public class DiscountService : IDiscountService<Discount>
    {
        IDiscountRepository<Discount> _repository;
        public DiscountService(IDiscountRepository<Discount> repository)
        {
            _repository = repository;
        }
        public List<Discount> GetAllDiscount()
        {
            return _repository.GetAllDiscount();
        }
        public Discount GetDiscountByAmount(decimal amount)
        {
            var dataExist = _repository.GetDiscountByAmount(amount);
            if (dataExist != null)
            {
                return dataExist;
            }
            throw new DiscountNotFound("Discount Not found");
        }
        public Discount GetDiscountBasedOnAmount(decimal amount)
        {
            List<Discount> allDiscount = _repository.GetAllDiscount();
            var data = allDiscount.Where(d => d.MinimumOrderAmount <= amount).DefaultIfEmpty().Max(m => m == null ? 0 : m.MinimumOrderAmount);
            var dataExist = _repository.GetDiscountByAmount(data);
            if (dataExist != null)
            {
                return dataExist;
            }
            return new Discount() { DiscountPercent = 0, MinimumOrderAmount = 0, MinimumPastOrder = 0 };

            //throw new DiscountNotFound("Discount Not Applicable");
        }
        public bool AddDiscount(Discount discount)
        {
            var dataExist = _repository.GetDiscountByAmount(discount.MinimumOrderAmount);
            if (dataExist == null)
            {
                _repository.AddDiscount(discount);
                return true;
            }
            throw new DiscountExist("Discount Exist");
        }
        public bool UpdateDiscountByAmount(decimal amount, Discount discount)
        {
            var dataExist = _repository.GetDiscountByAmount(amount);
            if (dataExist != null)
            {
                _repository.UpdateDiscountByAmount(amount, discount);
                return true;
            }
            throw new DiscountNotFound("Discount Not Found");
        }
        public bool DeleteDiscountByAmount(decimal amount)
        {
            var dataExist = _repository.GetDiscountByAmount(amount);
            if (dataExist != null)
            {
                _repository.DeleteDiscountByAmount(amount);
                return true;
            }
            throw new DiscountNotFound("Discount Not Found");
        }
    }
}
