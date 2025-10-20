const fetch = require('node-fetch');

class AutoReply {
    constructor(config = {}) {
        this.conversations = new Map();
        this.config = {
            model: config.model || 'gpt-3.5-turbo',
            maxTokens: config.maxTokens || 150,
            temperature: config.temperature || 0.7,
            maxHistoryLength: config.maxHistoryLength || 10,
            systemPrompt: config.systemPrompt || `You are VAMPARINA, a friendly and helpful Discord bot. 
            Keep responses concise, engaging, and natural. Be helpful while maintaining a casual tone.`
        };
        
        this.OPENAI_API_KEY = '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';
    }

    // Initialize or get user conversation
    getUserContext(userId) {
        if (!this.conversations.has(userId)) {
            this.conversations.set(userId, {
                messages: [],
                lastInteraction: Date.now()
            });
        }
        return this.conversations.get(userId);
    }

    // Add message to conversation history
    addToHistory(userId, role, content) {
        const context = this.getUserContext(userId);
        context.messages.push({ role, content });
        
        // Trim history if it exceeds maxHistoryLength
        if (context.messages.length > this.config.maxHistoryLength) {
            context.messages = context.messages.slice(-this.config.maxHistoryLength);
        }
        
        context.lastInteraction = Date.now();
    }

    // Clean up old conversations (call this periodically)
    cleanupOldConversations(maxAge = 3600000) { // Default 1 hour
        const now = Date.now();
        for (const [userId, context] of this.conversations.entries()) {
            if (now - context.lastInteraction > maxAge) {
                this.conversations.delete(userId);
            }
        }
    }

    async generateResponse(userId, userMessage) {
        if (!userMessage.trim()) {
            throw new Error('Message cannot be empty');
        }

        const context = this.getUserContext(userId);
        
        // Prepare messages array for API
        const messages = [
            { role: 'system', content: this.config.systemPrompt },
            ...context.messages,
            { role: 'user', content: userMessage }
        ];

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.config.model,
                    messages: messages,
                    max_tokens: this.config.maxTokens,
                    temperature: this.config.temperature,
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`API Error: ${error.error?.message || response.statusText}`);
            }

            const data = await response.json();
            const aiResponse = data.choices[0]?.message?.content?.trim();

            if (!aiResponse) {
                throw new Error('No response generated');
            }

            // Add both user message and AI response to history
            this.addToHistory(userId, 'user', userMessage);
            this.addToHistory(userId, 'assistant', aiResponse);

            return aiResponse;

        } catch (error) {
            console.error('Error generating response:', error);
            throw new Error(`Failed to generate response: ${error.message}`);
        }
    }

    // Reset conversation history for a user
    resetConversation(userId) {
        this.conversations.delete(userId);
    }

    // Get conversation history for a user
    getConversationHistory(userId) {
        return this.getUserContext(userId).messages;
    }
}

module.exports = AutoReply;
