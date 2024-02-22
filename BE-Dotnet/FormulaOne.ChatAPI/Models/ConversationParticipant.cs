namespace FormulaOne.ChatAPI.Models
{
    public class ConversationParticipant
    {
        public Conversation Conversation { get; set; }
        public int ConversationId{ get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}
