import React, { useState } from 'react';

const exampleQuestions = [
  'Who is Rama?',
  'What is the significance of Sita in Ramayana?',
  'Where did the battle with Ravana take place?',
  'What are the seven Kandas?',
];

const AskValmikiChatBox: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulate answer (in real app, fetch from valmikiramayan.net or show link)
  const handleAsk = () => {
    setLoading(true);
    setTimeout(() => {
      setAnswer(
        `Valmiki says: Please visit ` +
        `[valmikiramayan.net](https://www.valmikiramayan.net/index.html) ` +
        `and use the search or browse the Kandas for detailed answers to your question.`
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="valmiki-question" className="block font-semibold mb-2 text-[#4A2E2C] dark:text-[#FFD700]">Ask a question:</label>
        <input
          id="valmiki-question"
          type="text"
          className="w-full px-4 py-2 rounded border border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700] bg-[#fff9f0] dark:bg-[#3b2a29] text-[#4A2E2C] dark:text-[#FFD700]"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder={exampleQuestions[Math.floor(Math.random() * exampleQuestions.length)]}
        />
      </div>
      <button
        className="bg-[#FFD700] text-[#4A2E2C] font-bold px-6 py-2 rounded shadow hover:bg-[#FF9933] transition"
        onClick={handleAsk}
        disabled={loading || !question.trim()}
      >
        {loading ? 'Thinking...' : 'Ask Valmiki'}
      </button>
      {answer && (
        <div className="mt-6 p-4 bg-[#fff9f0] dark:bg-[#3b2a29] rounded border border-[#FFD700] text-[#4A2E2C] dark:text-[#FFD700]">
          <span dangerouslySetInnerHTML={{ __html: answer.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-[#005B96]">$1</a>') }} />
        </div>
      )}
    </div>
  );
};

export default AskValmikiChatBox;
