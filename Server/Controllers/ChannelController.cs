
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("channels")]
public class ChannelController : ControllerBase
{
    private IChannelService _channelService;

    public ChannelController(IChannelService channelService) 
    {
        _channelService = channelService;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            return Ok(await _channelService.GetAll());
        }
        catch (Exception e)
        {
            return StatusCode((int)HttpStatusCode.NotFound, e.Message);            
        }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            return Ok(await _channelService.Get(id));
        }
        catch (Exception e)
        {
            return StatusCode((int) HttpStatusCode.NotFound, e.Message);            
        }
    }

    [HttpGet("{name}")]
    public async Task<IActionResult> Get([FromQuery] string name)
    {
        try
        {
            return Ok(await _channelService.Get(name));
        }
        catch (Exception e)
        {
            return StatusCode((int) HttpStatusCode.NotFound, e.Message);
        }
    }

    public async Task<IActionResult> Create([FromBody] ChannelCreationDto channel) 
    {
        try
        {
            return Ok(await _channelService.Create(channel));
        }
        catch (Exception e)
        {
            return StatusCode((int) HttpStatusCode.NotFound, e.Message);
        }
    }

}
