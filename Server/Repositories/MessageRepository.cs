using chat_app_server.Databases;

public class MessageRepository : IMessageRepository 
{
    
    private readonly ChatDbContext _chatDbContext;

    public MessageRepository(ChatDbContext context)
    {
        _chatDbContext = context;
    }

    public async Task<MessageEntity> Insert(MessageEntity message)    
    {
        _chatDbContext.Add(message);
        await _chatDbContext.SaveChangesAsync();
        return message;
    }

}

public interface IMessageRepository {
    Task<MessageEntity> Insert(MessageEntity message);
}