using System.Security.Authentication;
using System.Security.Claims;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ClaimsPrincipleExtensions
{
    public static async Task<AppUser> GetUserByEmail(
        this UserManager<AppUser> userManager, ClaimsPrincipal principal)
    {
        var user = await userManager.Users.FirstOrDefaultAsync(
            x => x.Email == principal.GetEmail());
        
        return user ?? throw new AuthenticationException("User not found.");
    }
    
    public static async Task<AppUser> GetUserByEmailWithAddress(
        this UserManager<AppUser> userManager, ClaimsPrincipal principal)
    {
        var user = await userManager.Users
            .Include(x => x.Address)
            .FirstOrDefaultAsync(
            x => x.Email == principal.GetEmail());
        
        return user ?? throw new AuthenticationException("User not found.");
    }
    
    public static string GetEmail(this ClaimsPrincipal principal)
    {
        var email = principal.FindFirstValue(ClaimTypes.Email)
                    ?? throw new AuthenticationException("Email claim does not exist");
        return email;
    }
}