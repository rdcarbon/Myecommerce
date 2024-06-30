using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Middleware;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using API.Services;
using Microsoft.OpenApi.Models;
using Microsoft.CodeAnalysis.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
// Add services to the container.

services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen(
    c =>
    {
        // c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });

        // Define the security scheme for JWT
        var jwtSecurityScheme=new OpenApiSecurityScheme{
            BearerFormat="JWT",
            Name="Authorization",
            In=ParameterLocation.Header,
            Type=SecuritySchemeType.ApiKey,
            Scheme=JwtBearerDefaults.AuthenticationScheme,
            Description="Put Bearer+ your token in the box below",
            Reference = new OpenApiReference{
                        Type = ReferenceType.SecurityScheme,
                        Id = JwtBearerDefaults.AuthenticationScheme
                

        },
        };
//        var securityDefinition=new OpenApiSecurityScheme{Description=}
        c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id,jwtSecurityScheme 
        );
  c.AddSecurityRequirement(new OpenApiSecurityRequirement{
            {
            jwtSecurityScheme, Array.Empty<string>()
            }
        });
        }
        
        );
services.AddDbContext<StoreSqliteContext>(opt => opt.UseSqlite(
                                builder.Configuration
                                .GetConnectionString("UsingSqlite")));
services.AddDbContext<StoreContext>(opt => opt.UseNpgsql(
                builder.Configuration.GetConnectionString("UsingPostgreSql")
                )
                );
services.AddIdentityCore<User>(opt=>
{
    opt.User.RequireUniqueEmail=true;
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<StoreContext>();
services.AddScoped<TokenService>();
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(opt=>
{
    opt.TokenValidationParameters=new TokenValidationParameters{
        ValidateIssuer=false,
        ValidateAudience=false,
        ValidateLifetime=true,
        ValidateIssuerSigningKey=true,
        IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8
        .GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
    };
});
services.AddAuthorization();
services.AddCors();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c=>{c.ConfigObject.AdditionalItems.Add("persistAuthorization","true");});
}

app.UseHttpsRedirection();
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000").AllowCredentials();
});
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var contextsqlite = scope.ServiceProvider.GetRequiredService<StoreSqliteContext>();

var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger2 = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    // context.Database.Migrate();
    await DbInitializer.Initialize(context, userManager);
    // DbSqliteInitializer.Initialize(contextsqlite);
}
catch (Exception ex)
{
    logger2.LogError(ex, "A problem occured during migration");
}
app.Run();
