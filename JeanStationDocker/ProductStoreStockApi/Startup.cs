using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BaseModels;
using Microsoft.EntityFrameworkCore;
using Interfaces.ProductInterfaces;
using Interfaces.StockInterfaces;
using Interfaces.StoreInterfaces;
using BaseRepository;
using Services;
using Interfaces;

namespace ProductStoreStockApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            services.AddControllers();
            services.AddDbContext<IProductStoreStockDbContext< Product,Stock, Store> ,PSSDbContext > (options=>options.UseSqlServer(Configuration.GetConnectionString("ProductStoreStockDbConnectionString")));
            services.AddScoped<IProductRepository<Product>, ProductRepository>();
            services.AddScoped<IProductServices<Product>,ProductServices>();
            services.AddScoped<IStockRepository<Stock>,StockRepository>();
            services.AddScoped<IStockServices<Stock>, StockServices>();
            services.AddScoped<IStoreRepository<Store>,StoreRepository>();
            services.AddScoped<IStoreServices<Store>,StoreServices>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseCors();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
