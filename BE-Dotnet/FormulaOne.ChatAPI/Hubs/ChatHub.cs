using FormulaOne.ChatAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace FormulaOne.ChatAPI.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message, Context.ConnectionId);
        }

        public async Task SendToUser(string user, string receiverConnectionId, string message)
        {
            await Clients.Client(receiverConnectionId).SendAsync("ReceiveMessage", user, message, Context.ConnectionId);
        }
        public string GetConnectionId() => Context.ConnectionId;
        
    }
}
