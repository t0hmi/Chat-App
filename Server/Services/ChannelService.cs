using System.Collections.Immutable;

public class ChannelService : IChannelService
{
    private IChannelRepository _channelRepository;

    public ChannelService(IChannelRepository channelRepository)
    {
        _channelRepository = channelRepository;
    }

    public async Task<IReadOnlyCollection<ChannelDto>> GetAll()
    {
        return (await _channelRepository.GetAll()).Select(channel => ChannelEntity.ConvertToDto(channel)).ToImmutableList();
    }

    public async Task<ChannelDto> Get(int channelId)
    {
        return ChannelEntity.ConvertToDto((await _channelRepository.Get(channelId)));
    }

    public async Task<ChannelDto> Get(string name)
    {
        return ChannelEntity.ConvertToDto((await _channelRepository.Get(name)));
    }

    public async Task<ChannelDto?> Create(ChannelCreationDto channelDto)
    {

        var channel = await this.Get(channelDto.Name);

        // if(channel is not null) 
        // {
        //     return null;
        // }

        var newChannel = await _channelRepository.Insert(new ChannelEntity{Description= channelDto.Description,Name = channelDto.Name });
        return ChannelEntity.ConvertToDto(newChannel);
    }
}

public interface IChannelService 
{
    public  Task<ChannelDto?> Create(ChannelCreationDto channel);
    public Task<ChannelDto> Get(int channelId);
    public Task<ChannelDto> Get(string channelId);
    public Task<IReadOnlyCollection<ChannelDto>> GetAll();
}