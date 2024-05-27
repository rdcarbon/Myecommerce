using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class EFStoreRepositoryPostgres:IEFStoreRepository
    {
        private StoreContext context;
        private Basket basket;
        public EFStoreRepositoryPostgres(StoreContext ctx)
        {
            context=ctx;

        }
        public async Task<IEnumerable<Product>>GetProducts() {return  await context.Products.ToListAsync();}

        public async Task<IEnumerable<Basket>>GetBaskets() {return  await context.Baskets.ToListAsync();}
        public async Task<Basket>GetBasketByIdAsync(string buyerId){
                 return await context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }
/*         public async Task<BasketItem>GetBasketItemAsync(int ,int productId){
            return await co
        } */
        
    }
}