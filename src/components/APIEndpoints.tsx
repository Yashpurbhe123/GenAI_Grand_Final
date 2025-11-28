import { FileText, Image } from 'lucide-react';

export default function APIEndpoints() {
  const endpoints = [
    {
      icon: FileText,
      method: "POST",
      path: "/analyze-text",
      title: "Text Analysis",
      description: "Analyze text content for misinformation",
      input: "{ text: string }",
      output: "{ verdict, explanation, sources }"
    },
    {
      icon: Image,
      method: "POST",
      path: "/analyze-image",
      title: "Image Analysis",
      description: "OCR + visual analysis for images",
      input: "{ image: file }",
      output: "{ verdict, ocr_text, visual_analysis }"
    }
  ];

  return (
    <section className="py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            API Endpoints
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive suite of endpoints for all your verification needs
          </p>
        </div>

        <div className="space-y-6">
          {endpoints.map((endpoint, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex items-center gap-4 lg:w-1/3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <endpoint.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded">
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-gray-700 dark:text-gray-300">{endpoint.path}</code>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{endpoint.title}</h3>
                  </div>
                </div>

                <div className="lg:w-2/3 lg:border-l-2 lg:border-gray-300 dark:lg:border-gray-600 lg:pl-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{endpoint.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">INPUT</div>
                      <code className="text-sm text-gray-800 dark:text-gray-200">{endpoint.input}</code>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">OUTPUT</div>
                      <code className="text-sm text-gray-800 dark:text-gray-200">{endpoint.output}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
