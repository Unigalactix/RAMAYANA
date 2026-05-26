import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const SUGGESTED_QUESTIONS = [
  'Who is Rama?',
  'What are the seven Kandas?',
  'Why did Hanuman burn Lanka?',
  'What is the significance of Sita in the Ramayana?',
];

const AskValmikiChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Namaste 🙏 I am your guide to the Valmiki Ramayana. Ask me anything about the characters, Kandas, places, or teachings of this sacred epic.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAsk = async (question?: string) => {
    const q = (question ?? input).trim();
    if (!q || loading) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInput('');
    setLoading(true);

    try {
      const apiKey = (process.env.API_KEY || process.env.GEMINI_API_KEY || '').trim();
      if (!apiKey) {
        throw new Error('no_key');
      }
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a knowledgeable guide on the Valmiki Ramayana. Answer only questions related to the Ramayana — its characters, events, teachings, and places. Keep answers concise (3-5 sentences). If the question is unrelated to the Ramayana, politely redirect the user.\n\nQuestion: ${q}`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        'I could not find an answer. Please try rephrasing your question.';
      setMessages(prev => [...prev, { role: 'assistant', text }]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: 'To explore the Valmiki Ramayana in depth, please visit the sacred resource at **[valmikiramayan.net](https://www.valmikiramayan.net/index.html)** — a comprehensive translation of the original Sanskrit text.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderText = (text: string) =>
    text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-[#005B96] dark:text-[#63B3ED]">$1</a>'
    );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Chat window */}
      <div className="rounded-2xl border-2 border-[#4A2E2C] dark:border-[#a39483] bg-[#FBF5E8] dark:bg-[#2a1a19] shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#4A2E2C] dark:bg-[#3b2a29] px-6 py-4 flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">🪔</span>
          <div>
            <p className="font-anton text-lg text-[#FFD700] uppercase tracking-wider">Ask Valmiki</p>
            <p className="text-xs text-[#FBF5E8] opacity-70">Your guide to the Valmiki Ramayana</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto px-4 py-4 flex flex-col gap-4 scroll-smooth" role="log" aria-live="polite">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <span className="text-lg mr-2 flex-shrink-0 mt-1" aria-hidden="true">🙏</span>
              )}
              <div
                className={`rounded-2xl px-4 py-3 max-w-[80%] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#FF9933] text-[#4A2E2C] font-semibold'
                    : 'bg-white dark:bg-[#3b2a29] border border-[#e0d0b8] dark:border-[#5a4030] text-[#4A2E2C] dark:text-[#FBF5E8]'
                }`}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: renderText(msg.text) }}
              />
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <span className="text-lg mr-2 flex-shrink-0" aria-hidden="true">🙏</span>
              <div className="rounded-2xl px-4 py-3 bg-white dark:bg-[#3b2a29] border border-[#e0d0b8] dark:border-[#5a4030] text-[#4A2E2C] dark:text-[#FBF5E8] text-sm italic animate-pulse">
                Consulting the sacred texts…
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested questions */}
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleAsk(q)}
              disabled={loading}
              className="text-xs px-3 py-1.5 rounded-full border border-[#FFD700] text-[#4A2E2C] dark:text-[#FFD700] hover:bg-[#FFD700] hover:text-[#4A2E2C] dark:hover:bg-[#FFD700] transition-colors duration-200 disabled:opacity-40"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 pb-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
            placeholder="Ask about the Ramayana…"
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-full border-2 border-[#4A2E2C] dark:border-[#a39483] bg-white dark:bg-[#3b2a29] text-[#4A2E2C] dark:text-[#FBF5E8] text-sm focus:outline-none focus:border-[#FF9933] dark:focus:border-[#FF9933] placeholder-[#9a8070] dark:placeholder-[#7a6a60] disabled:opacity-50 transition-colors"
            aria-label="Ask a question about the Ramayana"
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading || !input.trim()}
            className="px-5 py-2.5 rounded-full bg-[#FF9933] text-[#4A2E2C] font-bold text-sm hover:bg-[#e8880a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md"
            aria-label="Send question"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskValmikiChatBox;
