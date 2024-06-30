using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace API.Controllers
{
    
    public class AccountController:BaseAPIController
    {
        private readonly StoreContext _context;
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
    public AccountController(UserManager<User> userManager,TokenService tokenService,StoreContext context)
    {
        _userManager=userManager;
        _tokenService=tokenService;
        _context=context;
    }
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
        var user=await _userManager.FindByNameAsync(loginDto.Username);
        
        if (user==null || !await _userManager.CheckPasswordAsync(user,loginDto.Password))
        return Unauthorized();
        var token=await _tokenService.GenerateToken(user);
        var userBasket= await RetrieveBasket(loginDto.Username);

        var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

        if (anonBasket != null)
        {
            if (userBasket != null) _context.Baskets.Remove(userBasket);
            anonBasket.BuyerId = user.UserName;
            Response.Cookies.Delete("buyerId");
            await _context.SaveChangesAsync();
        }

        return new UserDto
        {
            Email = user.Email,
            Token =token,
            Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBasket?.MapBasketToDto()
        };

    }
     private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            var basket=await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
            return basket;
        }

        [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto){
        var user=new User{ UserName=registerDto.UserName,Email=registerDto.Email,};
        
        var result=await _userManager.CreateAsync(user,registerDto.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                    ModelState.AddModelError(error.Code,error.Description);
            }
                    return ValidationProblem();

        }
        await _userManager.AddToRoleAsync(user,"Member");
        
        return Created();

    }
    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>>GetCurrentUser(){
        var user= await _userManager.FindByNameAsync(User.Identity.Name);
        var token=await _tokenService.GenerateToken(user);
        var userBasket= await RetrieveBasket(User.Identity.Name);
       
            return new UserDto
        {
            UserName=user.UserName,
            Email = user.Email,
            Token = token,
            Basket = userBasket?.MapBasketToDto()
        };
       
            
    }
    }

}