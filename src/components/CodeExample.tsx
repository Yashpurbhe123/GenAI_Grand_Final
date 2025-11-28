import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function CodeExample() {
  const [copied, setCopied] = useState(false);

  const codeExample = `const response = await fetch("https://api.realitycheck.ai/analyze-text", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "API-Key": "YOUR_API_KEY"
  },
  body: JSON.stringify({
    text: "Breaking: Scientists discover cure for all diseases",
    ImageURL: "https://example.com/image.jpg",
    
  })
});

const result = await response.json();
console.log(result);

// Response:
// {
//   "verdict": "FALSE",
//   "confidence": 0.94,
//   "explanation": "No credible scientific sources support this claim...",
//   "sources": [
//     { "url": "...", "title": "...", "credibility": 0.89 }
//   ]
// }`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get Started in Seconds
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Simple, intuitive API that works with any programming language
          </p>
        </div>

        <div className="bg-gray-950 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
          <div className="flex items-center justify-between bg-gray-800 px-6 py-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-400 font-mono">example.js</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg transition-all">
            <div className="text-3xl font-bold text-blue-400 mb-2">1</div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Get API Key</h4>
            <p className="text-gray-600 dark:text-gray-400">Sign up and grab your key instantly</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg transition-all">
            <div className="text-3xl font-bold text-purple-400 mb-2">2</div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Make Request</h4>
            <p className="text-gray-600 dark:text-gray-400">Call our endpoints with simple JSON</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg transition-all">
            <div className="text-3xl font-bold text-green-400 mb-2">3</div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Get Results</h4>
            <p className="text-gray-600 dark:text-gray-400">Receive detailed analysis instantly</p>
          </div>
        </div>
      </div>
    </section>
  );
}
