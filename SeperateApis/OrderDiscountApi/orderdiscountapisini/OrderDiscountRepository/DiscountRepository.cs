using OrderDiscountModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OrderDiscountInterfaces;
namespace OrderDiscountRepository
{
    public class DiscountRepository : IDiscountRepository<Discount>
    {
        IOrderDiscountDbContext<Discount> _context;
        public DiscountRepository(IOrderDiscountDbContext<Discount> context)
        {
            _context = context;
        }
        public List<Discount> GetAllDiscount()
        {
            try
            {
                return _context.Discounts.ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Discount GetDiscountByAmount(decimal amount)
        {
            try
            {
                return _context.Discounts.Where(d => d.MinimumOrderAmount == amount).FirstOrDefault();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool AddDiscount(Discount discount)
        {
            try
            {
                _context.Discounts.Add(discount);
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool UpdateDiscountByAmount(decimal amount, Discount discount)
        {
            try
            {
                var data = _context.Discounts.Where(d => d.MinimumOrderAmount == amount).FirstOrDefault();
                data.MinimumPastOrder = discount.MinimumPastOrder;
                data.DiscountPercent = discount.DiscountPercent;
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool DeleteDiscountByAmount(decimal amount)
        {
            try
            {
                var data = _context.Discounts.Where(d => d.MinimumOrderAmount == amount).FirstOrDefault();
                _context.Discounts.Remove(data);
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }


    }
}
