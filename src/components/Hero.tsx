import { CheckCircle, TrendingDown, Users, Shield, BookOpen } from 'lucide-react';

export default function Hero() {
  const impacts = [
    {
      icon: TrendingDown,
      stat: "60-70%",
      title: "Reduces Fake News Spread",
      description: "Proven track record in decreasing misinformation propagation across platforms"
    },
    {
      icon: Shield,
      stat: "Real-time",
      title: "Strengthens Trust",
      description: "Rebuilding confidence in online information through transparent verification"
    },
    {
      icon: BookOpen,
      stat: "Global",
      title: "Supports Digital Literacy",
      description: "Educating users on media literacy and critical thinking skills"
    },
    {
      icon: Users,
      stat: "Coming Soon",
      title: "Expanding Reach",
      description: "Building infrastructure for future deployment and global impact"
    }
  ];

  return (
    <section className="relative pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <CheckCircle className="w-4 h-4" />
          <span>Powered by Generative AI</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          RealityCheck AI
        </h1>

        <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-4 font-medium">
          Real-time AI Misinformation Detection for a Safer Digital World
        </p>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
          Analyze posts, images, and news with instant AI-powered fact-checking
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button 
            onClick={async () => {
              const howItWorksSection = document.getElementById('how-it-works');
              if (howItWorksSection) {
                howItWorksSection.scrollIntoView({ behavior: 'smooth' });
              }
              try {
                const response = await fetch('/api/welcome');
                const data = await response.json();
                console.log(data.message); 
              } catch (error) {
                console.error('Error fetching welcome message:', error);
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            How it Works
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <impact.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{impact.stat}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{impact.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{impact.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
