using ItemInventory.Models;
using Microsoft.EntityFrameworkCore;

namespace ItemInventory
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //test commit
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options => options.AddPolicy(name: "ItemOrigins",
    policy =>
    {
        policy.WithOrigins("https://localhost:44401").AllowAnyMethod().AllowAnyHeader();
    }));

            builder.Services.AddDbContext<ItemDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("ItemDbContext")));

            //

            builder.Services.AddDbContext<UserDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("UserDbContext")));


            var app = builder.Build();


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("ItemOrigins");

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

           
            app.Run();

           
        }

       
    }
}