namespace FormulaOne.ChatAPI.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Conversation Conversation { get; set; }
        public int ConversationId { get; set; }
        public User Sender { get; set; }
        public int SenderId { get; set; }

    }
}
