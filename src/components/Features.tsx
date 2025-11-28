import { Clock, Brain, Image, GraduationCap, Smartphone } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Clock,
      title: "Real-Time Fact Checking",
      description: "Instant verification of content as you browse, with results delivered in milliseconds"
    },
    {
      icon: Brain,
      title: "Context-Aware AI Analysis",
      description: "Gemini-powered intelligence that understands nuance, satire, and cultural context"
    },

    {
      icon: Image,
      title: "Deepfake Detection",
      description: "Advanced computer vision to identify manipulated images"
    },
    {
      icon: GraduationCap,
      title: "Educational Awareness Module",
      description: "Learn why content is flagged with detailed explanations and media literacy tips"
    },
    {
      icon: Smartphone,
      title: "In-Feed Integration",
      description: "Zero friction experience with seamless integration into social media platforms"
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Key Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Enterprise-grade misinformation detection with cutting-edge AI technology
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.33rem)] bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                <feature.icon className="w-7 h-7 text-white" />
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
