using Microsoft.EntityFrameworkCore;

namespace chat_app_server.Databases;

public class ChatDbContext : DbContext {

    public DbSet<UserEntity> Users {get;set;} = null!;

    public DbSet<ChannelEntity> Channels {get; set;} = null!;
    
    public DbSet<MessageEntity> Messages {get; set;} = null!;

    public ChatDbContext(DbContextOptions<ChatDbContext> options) : base(options){}
}