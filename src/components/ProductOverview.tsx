import { Brain, Zap, Shield, Eye, Globe } from 'lucide-react';

export default function ProductOverview() {
  const features = [
    {
      icon: Brain,
      title: "Generative AI–Powered Detection",
      description: "Advanced machine learning models trained to identify misinformation patterns"
    },
    {
      icon: Zap,
      title: "Works Inside Social Media",
      description: "Seamlessly integrated into your favorite platforms for zero-friction checking"
    },
    {
      icon: Shield,
      title: "Instant Verdict System",
      description: "Get clear True / False / Misleading classifications in real-time"
    },
    {
      icon: Eye,
      title: "Multi-Modal Detection",
      description: "Analyze text, images, and detect deepfakes"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Works across languages and adapts to cultural contexts"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How RealityCheck AI Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A generative AI-powered misinformation detector that provides instant fact-checking
            with explanations and educational notes. Our system analyzes content through multiple
            verification layers to ensure accuracy and context awareness.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.33rem)] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
