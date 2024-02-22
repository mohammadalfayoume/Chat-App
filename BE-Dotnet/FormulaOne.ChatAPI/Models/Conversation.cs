namespace FormulaOne.ChatAPI.Models
{
    public class Conversation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
