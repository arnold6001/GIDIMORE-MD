
const fetch = require('node-fetch');

async function getAIResponse(userMessage, userContext) {
  const openaiApiKey = 'YOUR_OPENAI_API_KEY';
  const prompt = `
You are Knight Bot chatting casually.

Previous messages:
${userContext.messages.join('\n')}

User info: ${JSON.stringify(userContext.userInfo)}

Current message: ${userMessage}

Reply shortly and naturally.
  `;

  const body = {
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 100,
    temperature: 0.8
  };

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error(`OpenAI API error: ${res.statusText}`);

    const data = await res.json();
    return data.choices.message.content.trim();

  } catch (error) {
    console.error('OpenAI API error:', error);
    return null;
  }
}