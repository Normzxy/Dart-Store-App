using API.Middleware;
using Core.Interfaces;
using Infrastructure;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Register StoreContext as a service in Dependency Injection.
builder.Services.AddDbContext<StoreContext>(opt =>
{
  // Set SQL Server as a data source for StoreContext.
  // Retrieve the database connection string from appsettings.Development.json. 
  opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// AddScoped means that one service instance is bound to specific HTTP request.
// AddTransient creates service instance everytime it needs to be injected (less efficient).
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
// To control which domains methods and headers are allowed during requests.
builder.Services.AddCors();
// Active during lifetime of an application.
builder.Services.AddSingleton<IConnectionMultiplexer>(config => {
  var connectionString = builder.Configuration.GetConnectionString("Redis")
      ?? throw new Exception("Cannot get Redis connection string");
  var configuration = ConfigurationOptions.Parse(connectionString, true);
  return ConnectionMultiplexer.Connect(configuration);
});
// Also has to be Singleton, because it uses Redis.
builder.Services.AddSingleton<ICartService, CartService>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Browser security feature.
// Responses from API server allowed, as long as they come from this origin (Angular app).
// Prevents malicious websites from making unauthorized requests.
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
  .WithOrigins("http://localhost:4200", "https://localhost:4200"));

// Configure the HTTP request pipeline.
app.MapControllers();

try
{
    // To dispose any service after executing.
    // Same action happens in Controllers (DI container),
    // but it has to be done manually here.
    using var scope = app.Services.CreateScope();

    // To get acces to DI mechanism.
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<StoreContext>();
    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context);
}
catch (Exception ex)
{
  Console.Write(ex);
  throw;
}

app.Run();