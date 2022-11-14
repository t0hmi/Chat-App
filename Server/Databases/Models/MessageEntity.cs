using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Message")]
public class MessageEntity
{
    [Key]
    public int Id {get; set;}
    
    public DateTime CreationDate {get ;set;}
    
    public string Email {get; set;} = "";
    
    public string Message {get; set;} = "";

    public int ChannelEntityId {get;set;}

    [NotMapped]
    [ForeignKey(nameof(ChannelEntityId))]
    public ChannelEntity? Channel;
}