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
using Microsoft.Extensions.Options;
using AuthInterfaces;
using AuthInterfaces.RepositoryInterfaces;
using AuthInterfaces.ServicesInterfaces;
using AuthModels;
using AuthServices;
using AuthRepositories;

namespace Auth_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Configuration.GetSection("BaseAdmin").Bind(BaseAdmin.Instance);
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

            services.AddScoped<ICustomerServices<Customer>, CustomerServices>();
            services.AddScoped<IEmployeeServices<Employee>, EmployeeServices>();
            services.AddScoped<IAdminServices<Admin>, AdminServices>();

            services.AddScoped<BaseAuthDbContext<Customer,Employee,Admin>, AuthDbContext>();

            services.AddScoped<ICustomerRepository<Customer>, CustomerRepository>();
            services.AddScoped<IEmployeeRepository<Employee>, EmployeeRepository>();
            services.AddScoped<IAdminRepository<Admin>, AdminRepository>();

            services.Configure<AuthDbSettings>(
                Configuration.GetSection(nameof(AuthDbSettings))
                );
            services.AddSingleton<IAuthDbSettings>(sp => sp.GetRequiredService<IOptions<AuthDbSettings>>().Value);
            services.AddControllers();
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
