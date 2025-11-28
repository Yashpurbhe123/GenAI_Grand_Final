import { Code, Zap, Shield, CheckCircle } from 'lucide-react';

export default function APIOverview() {
  return (
    <section id="api" className="py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800">
            <Code className="w-4 h-4" />
            <span>Developer Platform</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            RealityCheck AI API
          </h2>
          <p className="text-2xl text-blue-600 dark:text-blue-400 mb-4">
            Build Trust Into Your Platform
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powerful AI endpoints for real-time misinformation detection, verification,
            and content classification. Integrate fact-checking into your applications
            with just a few lines of code.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all">
            <Zap className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-400">Sub-second response times with global CDN distribution</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all">
            <Shield className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Enterprise Security</h3>
            <p className="text-gray-600 dark:text-gray-400">SOC 2 compliant with end-to-end encryption</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all">
            <CheckCircle className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">99.9% Uptime</h3>
            <p className="text-gray-600 dark:text-gray-400">Reliable infrastructure with automatic failover</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-12 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">API Use Cases</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Social media platforms with real-time moderation",
              "News verification systems for journalists",
              "Banking & financial scam detection",
              "Government misinformation monitoring",
              "EdTech digital literacy platforms",
              "Content moderation at scale"
            ].map((useCase, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg text-gray-700 dark:text-gray-300">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
