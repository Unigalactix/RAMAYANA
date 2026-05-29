import React, { useState, useRef, useEffect } from 'react';

interface Message { role: 'user' | 'assistant'; text: string; }

const SUGGESTED = [
  'Who is Rama?',
  'Why did Hanuman burn Lanka?',
  'What are the seven Kandas?',
  'What is the meaning of Ramarajya?',
];

const AskValmikiChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Namaste 🙏 I am your guide to the Valmiki Ramayana. Ask anything about its characters, Kandas, places, or teachings.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const handleAsk = async (q?: string) => {
    const text = (q ?? input).trim();
    if (!text || loading) return;
    setMessages(p => [...p, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const apiKey = (process.env.API_KEY || process.env.GEMINI_API_KEY || '').trim();
      if (!apiKey) throw new Error('no_key');
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are a knowledgeable guide on the Valmiki Ramayana. Answer only questions related to the Ramayana — its characters, events, teachings, and places. Keep answers concise (3-5 sentences). If the question is unrelated, politely redirect.\n\nQuestion: ${text}` }] }],
          }),
        }
      );
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'I could not find an answer. Please try rephrasing your question.';
      setMessages(p => [...p, { role: 'assistant', text: reply }]);
    } catch {
      setMessages(p => [...p, { role: 'assistant', text: 'For a deeper study, visit the sacred resource at https://www.valmikiramayan.net — a full translation of the original Sanskrit.' }]);
    } finally {
      setLoading(false);
    }
  };

  const renderText = (txt: string): React.ReactNode[] => {
    const parts = txt.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g);
    return parts.map((p, i) => {
      const b = p.match(/^\*\*([^*]+)\*\*$/);
      if (b) return <strong key={i} className="text-goldlight">{b[1]}</strong>;
      if (/^https?:\/\//.test(p)) {
        try {
          const u = new URL(p);
          if (u.protocol === 'https:' || u.protocol === 'http:') {
            return <a key={i} href={u.toString()} target="_blank" rel="noopener noreferrer" className="text-goldlight underline decoration-gold/40 underline-offset-4">{p}</a>;
          }
        } catch { /* ignore */ }
      }
      return <span key={i}>{p}</span>;
    });
  };

  return (
    <div className="glass p-4 md:p-6">
      <div className="chat-window space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`bubble ${m.role === 'user' ? 'bubble-user' : 'bubble-assistant'}`}>
              {renderText(m.text)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start"><div className="bubble bubble-assistant"><span className="opacity-60">Valmiki is reflecting…</span></div></div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {SUGGESTED.map(s => (
          <button key={s} className="chip" onClick={() => handleAsk(s)}>{s}</button>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); handleAsk(); }}
        className="mt-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Rama, Hanuman, Lanka…"
          className="flex-1 bg-white/5 border border-gold/20 rounded-full px-5 py-3 text-[#ece2c8] placeholder-[#a99875] focus:outline-none focus:border-gold/60 font-serif"
          aria-label="Your question"
        />
        <button type="submit" className="btn-gold" disabled={loading || !input.trim()}>Ask</button>
      </form>
    </div>
  );
};

export default AskValmikiChatBox;
