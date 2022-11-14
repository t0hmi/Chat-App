public class MessageService : IMessageService
{
    private IMessageRepository _messageRepository;

    public MessageService(IMessageRepository messageRepository)
    {
        _messageRepository = messageRepository;
    }

    public async Task Create(MessageCreationDto messageCreationDto)
    {
        var message = new MessageEntity {ChannelEntityId = messageCreationDto.ChannelId, Email = messageCreationDto.Email, CreationDate = DateTime.Now, Message = messageCreationDto.Message};
        await _messageRepository.Insert(message);
    }
}

public interface IMessageService 
{
     Task Create(MessageCreationDto messageCreationDto);
}