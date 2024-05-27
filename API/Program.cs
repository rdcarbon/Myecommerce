using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Middleware;
var builder = WebApplication.CreateBuilder(args);
var services=builder.Services;
// Add services to the container.

services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddDbContext<StoreSqliteContext>(opt =>opt.UseSqlite(builder.Configuration.GetConnectionString("UsingSqlite")));
services.AddDbContext<StoreContext>(opt =>opt.UseNpgsql(builder.Configuration.GetConnectionString("UsingPostgreSql")));
services.AddCors();
var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(opt=> {
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000").AllowCredentials();
});
app.UseAuthorization();

app.MapControllers();
var scope= app.Services.CreateScope();
var context=scope.ServiceProvider.GetRequiredService<StoreContext>();
var contextsqlite=scope.ServiceProvider.GetRequiredService<StoreSqliteContext>();
var logger2=scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
/* try
{
   // context.Database.Migrate();
    DbInitializer.Initialize(context);
    DbSqliteInitializer.Initialize(contextsqlite);
}
catch (Exception ex)
{
    logger2.LogError(ex, "A problem occured during migration");
} */
app.Run();
