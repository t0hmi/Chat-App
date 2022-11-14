using chat_app_server.Databases;
using Microsoft.EntityFrameworkCore;

public class ChannelRepository : IChannelRepository
{
    private readonly ChatDbContext _chatDbContext;

    public ChannelRepository(ChatDbContext context) 
    {
        _chatDbContext = context;
    }

    public Task<List<ChannelEntity>> GetAll()
    {
        return _chatDbContext.Channels.ToListAsync();
    }

    public Task<ChannelEntity> Get(int channelId) 
    {
        return _chatDbContext.Channels.Where(channel => channel.Id == channelId).Include(p => p.Messages.OrderBy(m => m.Id)).FirstAsync();
    }

    public Task<ChannelEntity?> Get(string name) 
    {
        return _chatDbContext.Channels.Where(channel => channel.Name == name).Include(p => p.Messages.OrderBy(m => m.Id)).FirstOrDefaultAsync();
    }

    public async Task<ChannelEntity> Insert(ChannelEntity channel)
    {
        _chatDbContext.Channels.Add(channel);
        await _chatDbContext.SaveChangesAsync();
        return channel;
    }

    public async Task AddMessage(MessageEntity message)
    {
        var channel = await _chatDbContext.Channels.Where(c => c.Id == message.ChannelEntityId).FirstOrDefaultAsync();
        channel.Messages.Add(message);
        await _chatDbContext.SaveChangesAsync();
    }
}

public interface IChannelRepository 
{
    public Task<ChannelEntity> Insert(ChannelEntity channel);
    public Task<ChannelEntity> Get(int channelId);
    public Task<ChannelEntity?> Get(string name);
    public Task<List<ChannelEntity>> GetAll();

    public Task AddMessage(MessageEntity message);
}