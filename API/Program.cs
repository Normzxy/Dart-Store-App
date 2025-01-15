using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Register StoreContext as a service in Dependency Injection.
builder.Services.AddDbContext<StoreContext>(opt =>
{
  // Set SQL Server as a data source for StoreContext.
  // Retrieve the database connection string. 
  opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapControllers();

app.Run();