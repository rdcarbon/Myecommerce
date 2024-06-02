using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
namespace API.Controllers
{
    // [ApiController]
    // [Route("api/[controller]")]
    public class BasketController : BaseAPIController
    {

        private readonly StoreContext _context;
        private ILogger<BasketController> _logger;
        public BasketController(StoreContext context, ILogger<BasketController> logger)
        {
            _context = context;
            _logger = logger;
        }
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            _logger.LogInformation("BasketRetrieved");
            return Ok(new BasketDto(basket));
        }

        [HttpPost]
        public async Task<ActionResult> AddBasketItem(int productId, int quantity)
        {

            //get or create basket
            // get product
            // add item or create basketitem
            //savechanges
            _logger.LogInformation($"Adding product {productId} to basket.\n Quantity: {quantity} ");
            var basket = await RetrieveBasket() ?? await CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails{Title="Product not found in database."});
            basket.addItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", new BasketDto(basket));
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }


        [HttpPut]
        public async Task<ActionResult> UpdateBasketItem(int productId, int quantity)
        {
            // 1. add;
            // 2. remove;

            if (quantity<=0) return BadRequest();
            var basket = await RetrieveBasket();
            if (basket == null)
            {
                _logger.LogError("Basket Item update failed basket not found");
                return NotFound();

            }
            var item=basket.Items.FirstOrDefault(item=>item.ProductId==productId);
            if (item==null ) {
               var product=await _context.Products.FindAsync(productId);
               if (product==null) return BadRequest(new ProblemDetails{Title="Product not found in database."});
               basket.addItem(product,quantity);
            }
            else
            basket.updateItem(productId,quantity);
            var result= await _context.SaveChangesAsync()>0;
            if (result) return Ok(new BasketDto(basket)) ;
            return BadRequest(new ProblemDetails{Title = "Problem updating basket"});


        }
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null)
            {
                _logger.LogError("basket id not found");
                return NotFound();
            }

            basket.removeItem(productId, quantity);
            var result = await _context.SaveChangesAsync()>0;

            if (result)  return NoContent();
            return BadRequest(new ProblemDetails{Title ="Removing Basketitem to Database Failed"});
        }
        // Utilities         
        //=======================================================
        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        private async Task<Basket> CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            await _context.AddAsync<Basket>(basket);
            return basket;

        }

    }

}