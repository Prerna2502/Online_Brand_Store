using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using BaseModels;
using Interfaces.ProductInterfaces;
using Interfaces;

namespace BaseRepository
{
    public class ProductRepository : IProductRepository<Product>
    {
        IProductStoreStockDbContext<Product, Stock, Store> _context;
        public ProductRepository(IProductStoreStockDbContext<Product, Stock, Store> context)
        {
            _context = context;
        }
        public List<Product> GetProducts()
        {
            try
            {
                return _context.Products.ToList();
            }
            catch(Exception e)
            {
                throw e; 
            }
        }
        public List<Product> GetProductByCategory(string category)
        {
            try
            {
                return _context.Products.Where(e => e.ProductType.Contains(category)).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<Product> GetProductByName(string product_name)
        {
            try
            {
                return _context.Products.Where(e => e.ProductName.Contains(product_name)).ToList();
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        public List<Product> GetProductsByTag(string tags)
        {
            try
            {
                List<Product> matchingProducts = new List<Product>();
                string[] tag_list = tags.Split(' ');
                foreach (string tag in tag_list)
                {
                    List<Product> temp_match = _context.Products.Where(e => e.FilterTag.Contains(tag)).ToList();
                    if (temp_match.Capacity > 0)
                        matchingProducts.AddRange(temp_match);
                }
                return matchingProducts;
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        public Product GetProducts(string ProductId)
        {
            try
            {
                return _context.Products.Find(ProductId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool AddProducts(Product product)
        {
            _context.Products.Add(product);
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (Exception d)
            {
                throw d;
            }
            
        }
        public Product UpdateProduct(string productId,Product product)
        {
            try
            {
                Product data = _context.Products.Find(productId);
                data.ProductName = product.ProductName;
                data.ProductPrice = product.ProductPrice;
                data.ProductType = product.ProductType;
                data.ProductImage = product.ProductImage;
                data.Description = product.Description;
                data.FilterTag = product.FilterTag;
                data.Gender=product.Gender;
                _context.SaveChanges();
                return product;
            }
            catch (Exception d)
            {
                throw d;
            }
           
        }
        public bool DeleteProducts(string ProductId)
        {
            try
            {
                Product product = _context.Products.Find(ProductId);
                _context.Products.Remove(product);
                _context.SaveChanges();
                return true;
            }
            catch (Exception d)
            {
                throw d;
            }
            
        }
    }
}

