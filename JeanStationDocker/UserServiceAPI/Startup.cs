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
using UserModels;
using UserInterface;
using Repository;
using Service;
using Microsoft.EntityFrameworkCore;
namespace UserServiceAPI
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
            services.AddDbContext<IJeanStation_UserServiceContext<DbSet<Cart>,DbSet<Customer>,DbSet<Order>>,JeanStation_UserServiceContext>(
                options=> options.UseSqlServer(Configuration.GetConnectionString("JeanStationUserServiceString")));
            
            services.AddScoped<ICartRepository<Cart>, CartRepository>();
            services.AddScoped<IOrderRepository<Order>, OrderRepository>();
            services.AddScoped<ICustomerRepository<Customer>, CustomerRepository>();

            services.AddScoped<IOrdersService<Order>, OrdersService>();
            services.AddScoped<ICartServices<Cart>, CartServices>();
            services.AddScoped<ICustomerService<Customer>, CustomerService>();
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
