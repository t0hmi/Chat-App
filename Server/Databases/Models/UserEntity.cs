using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("User")]
public class UserEntity {
    [Key]
    public int Id {get; set;}
    public string Email {get; set;} = "";
    public string Password {get; set;} = "";

    public static UserDto convertToDto(UserEntity user) {
        return new UserDto {
            Email = user.Email,
            Id = user.Id,
            Password = user.Password
        };
    }
} 
