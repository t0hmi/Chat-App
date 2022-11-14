using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Channel")]
public class ChannelEntity 
{
    [Key]
    public int Id {get; set;}

    public string Name {get; set;} = "";

    public string Description {get; set;} = "";

    public virtual List<MessageEntity> Messages {get; set;} = new ();

    public static ChannelDto ConvertToDto(ChannelEntity channel)
    {
        return new ChannelDto
        {
            Description = channel.Description,
            Id = channel.Id,
            Name = channel.Name,
            Messages = channel.Messages
        };
    }

}
