using  Microsoft.EntityFrameworkCore;
using API.Entities;
namespace API.Data
{
    public class StoreSqliteContext:DbContext
    {
        public StoreSqliteContext(DbContextOptions<StoreSqliteContext> options):base(options){}
        public DbSet<Product> Products{get;set;}
       public DbSet<Basket> Baskets{get;set;}

    }
}