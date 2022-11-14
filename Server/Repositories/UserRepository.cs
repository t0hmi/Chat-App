using chat_app_server.Databases;
using Microsoft.EntityFrameworkCore;

namespace chat_app_server.Repositories;

public class UserRepository : IUserRepository {

    private readonly ChatDbContext _chatDbContext;

    public UserRepository(ChatDbContext context)
    {
        _chatDbContext = context;
    }

    public Task<List<UserEntity>> GetAll() 
    {
        return _chatDbContext.Users.ToListAsync();
    }

    public Task<UserEntity> Get(int userId) 
    {
        return _chatDbContext.Users.Where(user => user.Id == userId).FirstAsync();
    }

      public Task<UserEntity> Get(string email) 
    {
        return _chatDbContext.Users.Where(user => user.Email == email).FirstAsync();
    }

    public async Task<UserEntity> Insert(UserEntity user) 
    {
        _chatDbContext.Users.Add(user);
        await _chatDbContext.SaveChangesAsync();
        return user;
    }

    public void Delete(int userId) 
    {
        UserEntity user = _chatDbContext.Users.Where(user => user.Id == userId).First();
        _chatDbContext.Users.Remove(user);
        _chatDbContext.SaveChangesAsync();
    }

}


public interface IUserRepository {
    Task<List<UserEntity>> GetAll();
    Task<UserEntity> Get(int userId);
    Task<UserEntity> Get(string email);

    void Delete(int usedId);
    Task<UserEntity> Insert(UserEntity user);
}