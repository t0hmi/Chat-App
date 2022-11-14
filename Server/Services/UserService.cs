using System.Collections.Immutable;
using chat_app_server.Repositories;
using Microsoft.EntityFrameworkCore;

namespace chat_app_server.Services;

public class UserService : IUserService {
    private IUserRepository _userRepository;

    public UserService(IUserRepository userRepository) 
    {
        _userRepository = userRepository;
    }

    public async Task<IReadOnlyCollection<UserDto>> GetAll() {
        return (await _userRepository.GetAll()).Select(user => UserEntity.convertToDto(user)).ToImmutableList();
    }

    public async Task<UserDto> Get(int userId) {
        return UserEntity.convertToDto((await _userRepository.Get(userId)));
    }

    public async Task<UserDto> Get(string email) {
        return UserEntity.convertToDto((await _userRepository.Get(email)));
    }

    public void Delete(int usedId) 
    {
        _userRepository.Delete(usedId);
    }

    public async Task<UserDto> Register(UserRegisterDto userDto)
    {
        var password = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
        var user = await _userRepository.Insert(new UserEntity {Email = userDto.Email, Password = password});
        return UserEntity.convertToDto(user);
    }

    public async Task<UserDto?> Login(UserLoginDto userDto)
    {
        var user = await _userRepository.Get(userDto.Email);

        bool isValidPassword = BCrypt.Net.BCrypt.Verify(userDto.Password ,user.Password);

        if(isValidPassword)
        {
            return UserEntity.convertToDto(user);
        }

        return null;
    }

}

public interface IUserService {
    Task<UserDto> Get(int userId);

    Task<UserDto> Get(string email);

    Task<IReadOnlyCollection<UserDto>> GetAll();

    Task<UserDto> Register(UserRegisterDto dto);
    
    Task<UserDto?> Login(UserLoginDto dto);
}