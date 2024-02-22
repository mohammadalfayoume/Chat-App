using FormulaOne.ChatAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FormulaOne.ChatAPI.Data.Config
{
    public class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder
                .HasOne(x => x.Conversation)
                .WithMany()
                .HasForeignKey(x => x.ConversationId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.Sender)
                .WithOne()
                .HasForeignKey<Message>(x => x.SenderId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
