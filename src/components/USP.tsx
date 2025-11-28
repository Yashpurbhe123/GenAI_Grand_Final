import { Sparkles, Layers, BookOpen, Globe, Gauge, Rocket } from 'lucide-react';

export default function USP() {
  const usps = [
    {
      icon: Sparkles,
      title: "Context-Aware Intelligence",
      description: "Goes beyond simple keyword matching to understand meaning, intent, and cultural nuances"
    },
    {
      icon: Layers,
      title: "Seamless In-App Integration",
      description: "Works directly within social platforms without disrupting user experience"
    },
    {
      icon: BookOpen,
      title: "Educational & Preventive Approach",
      description: "Empowers users with knowledge and critical thinking skills, not just fact-checks"
    },
    {
      icon: Globe,
      title: "Multilingual & Culturally Adaptive",
      description: "Understands regional contexts and works across multiple languages effectively"
    },
    {
      icon: Gauge,
      title: "Scalable & Performance-Optimized",
      description: "Built to handle millions of requests with caching and efficient architecture"
    },
    {
      icon: Rocket,
      title: "Future-Ready Multi-Modal",
      description: "Constantly evolving to detect new forms of misinformation across all media types"
    }
  ];

  return (
    <section id="unique" className="py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why RealityCheck AI is Unique
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Not just another fact-checker. We're building the future of digital trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl border-2 border-blue-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all"
            >
              <div className="absolute top-4 right-4 w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                {index + 1}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <usp.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {usp.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
