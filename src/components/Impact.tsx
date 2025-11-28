import { TrendingDown, Users, Shield, BookOpen } from 'lucide-react';

export default function Impact() {
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
    <section id="impact" className="py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Real-World Impact
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Making the digital world safer, one fact-check at a time
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
