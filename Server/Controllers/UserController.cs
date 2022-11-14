using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using chat_app_server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames;
// using JwtRegisteredClaimNames = System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames;

namespace chat_app_server.Controllers;

[ApiController]
[Route("users")]
[Authorize]
public class UserController : ControllerBase
{

    private IUserService _userService;
    protected readonly IConfiguration Configuration;


    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger, IUserService userService, IConfiguration configuration)
    {
        _logger = logger;
        _userService = userService;
        Configuration = configuration;
    }


    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
    {
        try
        {
            UserDto? user = await _userService.Login(userLoginDto);

            if(user != null) 
            {
                var jwtTokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new []
                    {
                        new Claim(JwtRegisteredClaimNames.Aud, Configuration["Jwt:Audience"]),
                        new Claim(JwtRegisteredClaimNames.Iss, Configuration["Jwt:Issuer"]),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(6),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:key"])), SecurityAlgorithms.HmacSha512Signature)
                };

                var token = jwtTokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = jwtTokenHandler.WriteToken(token);

                return Ok(new {token = jwtToken, user = user});
            }
            return Unauthorized();
        }
        catch (Exception e)
        {
            return StatusCode((int)HttpStatusCode.NotFound, e.Message);
        }
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] UserRegisterDto userRegisterDto)
    {
        try
        {
            return Ok(await _userService.Register(userRegisterDto));
        }
        catch (Exception e)
        {
            return StatusCode((int)HttpStatusCode.NotFound, e.Message);
        }
    }

    [HttpGet("")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            return Ok(await _userService.GetAll());
        }
        catch (Exception e)
        {
            return StatusCode((int) HttpStatusCode.NotFound, e.Message);            
        }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            return Ok(await _userService.Get(id));
        }
        catch (Exception e)
        {
            return StatusCode((int) HttpStatusCode.NotFound, e.Message);            
        }
    }


    [HttpGet("token/{token}")]
    [Authorize]
    public async Task<IActionResult> GetTokenData(string token) 
    {
        try
        {
            var key = Encoding.ASCII.GetBytes(Configuration["Jwt:Key"]);
            var handler = new  JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = Configuration["Jwt:Issuer"],
                ValidAudience = Configuration["Jwt:Audience"]
            };
            SecurityToken securityToken;
            var principal = handler.ValidateToken(token, validations, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            
            if (jwtSecurityToken == null)
            {
                throw new SecurityTokenException("Invalid Token");
            }

            string? email = principal.Claims.Where(c => c.Type == ClaimTypes.Email).Select(c => c.Value).FirstOrDefault();

            return email is null ? throw new Exception("User not found") : Ok(await _userService.Get(email));
        }
        catch (Exception e)
        {
            return StatusCode((int)HttpStatusCode.NotFound, e.Message);
        }
    }

}
