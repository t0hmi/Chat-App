using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    private IChannelRepository _channelRepository;

    public ChatHub(IChannelRepository channelRepository)
    {
        _channelRepository = channelRepository;
    }

    public override async Task OnConnectedAsync() 
    {
        await base.OnConnectedAsync();
    }

    public async Task SendMessage(string channel, string username,string message, int channelId)
    {
        var now = DateTime.Now;
        await _channelRepository.AddMessage(new MessageEntity {Message = message, Email = username, CreationDate = now, ChannelEntityId = channelId});
        await Clients.Group(channel).SendAsync("ReceiveMessage", new {message, username, now});
    }

    public async Task JoinRoom(string channel, string username)
    {
        if(UserHandler.IsGroupExist(channel))
        {
            if(!UserHandler.IsUserInGroup(channel, username))
            {
                UserHandler.UsersByChannels[channel].Add(username);
            }
        }
        else 
        {
            UserHandler.CreateRoom(channel, username);
        }
        await Groups.AddToGroupAsync(Context.ConnectionId, channel);
        await Clients.Group(channel).SendAsync("NewUser", UserHandler.GetGroupUsers(channel)); 
    }

    public async Task LeaveRoom(string channel, string user)
    {
        if(UserHandler.IsGroupExist(channel)) {
            UserHandler.UsersByChannels[channel].Remove(user);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, channel);
            await Clients.Group(channel).SendAsync("RemoveUser", UserHandler.GetGroupUsers(channel)); 
        }
    }

    public void Reload(string username)
    {
        UserHandler.RemoveUser(username);
    }
}

public interface IChatHub 
{
    Task SendMessage(string message);
    Task ReceiveMessage(string user, string message);
    Task OnConnectedAsync();
}

public class UserHandler {
    public static Dictionary<string, IList<string>> UsersByChannels = new  Dictionary<string, IList<string>>();

    public static bool IsGroupExist(string group)
    {
        if(UserHandler.UsersByChannels.TryGetValue(group, out var _))
        {
            return true;
        }else 
        {
            return false;
        }
    }

    public static bool IsUserInGroup(string group, string username)
    {
        if(UserHandler.UsersByChannels.TryGetValue(group, out var users))
        {
            return users.Contains(username);
        }else 
        {
            return false;
        }
    }

    public static void CreateRoom(string room, string username)
    {
        UserHandler.UsersByChannels.Add(room, new List<string>(){ username });
    }

    public static IList<string> GetGroupUsers(string room)
    {
        if(!IsGroupExist(room)) return new List<string>();

        return UserHandler.UsersByChannels[room];
    }

    public static void RemoveUser(string username)
    {
        foreach(KeyValuePair<string, IList<string>> entry in UserHandler.UsersByChannels)
        {
            entry.Value.Remove(username);
        }
    }
}