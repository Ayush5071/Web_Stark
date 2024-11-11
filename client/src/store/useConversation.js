import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

    messages: [],
    setMessages: (newMessages) =>
        set((state) => ({
            messages: typeof newMessages === "function" ? newMessages(state.messages) : newMessages,
        })),
}));

export default useConversation;
