using Microsoft.AspNetCore.Mvc;
using ItemInventory.Models;
using SneakerInventory.Models;

namespace SneakerInventory.Controllers
{
    public class UserController : Controller
    {
        private readonly UserDbContext _userDbContext;

        public UserController(UserDbContext userDbContext)
        {
            _userDbContext = userDbContext;
        }

        [HttpPost]
        [Route("api/login")]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            // Use UserDbContext to query User model and verify user credentials
            var user = _userDbContext.Users.FirstOrDefault(u => u.UserName == userLogin.UserName && u.Password == userLogin.Password);

            if (user == null)
            {
                // Return error response if user is not found
                return BadRequest("Invalid username or password");
            }

            // Return success response with user details
            return Json (new { message = "Successful Login" });
        }
    }
}
