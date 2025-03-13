export function sanitizeConversations(
  conversations: { userMessage: string; aiMessage: string | React.ReactNode }[]
) {
  return conversations.map((conversation) => {
    // If aiMessage is a React component, replace it with a string
    const aiMessage =
      typeof conversation.aiMessage === "string"
        ? conversation.aiMessage
        : "[React Component]";

    return {
      userMessage: conversation.userMessage,
      aiMessage,
    };
  });
}
