import { Check, Zap, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Pricing() {
  const [currency, setCurrency] = useState('USD');

  const exchangeRates: { [key: string]: { rate: number; symbol: string; name: string } } = {
    USD: { rate: 1, symbol: '$', name: 'United States' },
    INR: { rate: 83.5, symbol: '₹', name: 'India' },
    EUR: { rate: 0.92, symbol: '€', name: 'Eurozone' },
    GBP: { rate: 0.79, symbol: '£', name: 'United Kingdom' },
    JPY: { rate: 150.5, symbol: '¥', name: 'Japan' },
    AUD: { rate: 1.52, symbol: 'A$', name: 'Australia' },
    CAD: { rate: 1.36, symbol: 'C$', name: 'Canada' },
    CHF: { rate: 0.90, symbol: 'Fr', name: 'Switzerland' },
    CNY: { rate: 7.23, symbol: '¥', name: 'China' },
    SEK: { rate: 10.65, symbol: 'kr', name: 'Sweden' },
    NZD: { rate: 1.65, symbol: 'NZ$', name: 'New Zealand' },
    SGD: { rate: 1.35, symbol: 'S$', name: 'Singapore' },
    HKD: { rate: 7.83, symbol: 'HK$', name: 'Hong Kong' },
    KRW: { rate: 1350, symbol: '₩', name: 'South Korea' },
    MXN: { rate: 16.7, symbol: 'Mex$', name: 'Mexico' },
    BRL: { rate: 5.15, symbol: 'R$', name: 'Brazil' },
    ZAR: { rate: 18.5, symbol: 'R', name: 'South Africa' },
    TRY: { rate: 32.1, symbol: '₺', name: 'Turkey' },
    RUB: { rate: 92.5, symbol: '₽', name: 'Russia' },
    IDR: { rate: 15800, symbol: 'Rp', name: 'Indonesia' },
    SAR: { rate: 3.75, symbol: '﷼', name: 'Saudi Arabia' },
    AED: { rate: 3.67, symbol: 'د.إ', name: 'UAE' },
    THB: { rate: 36.5, symbol: '฿', name: 'Thailand' },
    MYR: { rate: 4.75, symbol: 'RM', name: 'Malaysia' },
    PHP: { rate: 56.8, symbol: '₱', name: 'Philippines' },
    VND: { rate: 25400, symbol: '₫', name: 'Vietnam' },
    PLN: { rate: 3.95, symbol: 'zł', name: 'Poland' },
  };

  const handleSubscribe = async (planName: string) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: planName }),
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message); 
        // Navigation removed as requested
      } else {
        alert('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleContact = async (planName: string) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: planName }),
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
      } else {
        alert('Contact request failed. Please try again.');
      }
    } catch (error) {
      console.error('Error sending contact request:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const convertPrice = (usdPrice: number) => {
    const { rate, symbol } = exchangeRates[currency];
    const converted = usdPrice * rate;
    
    // Format logic: small numbers need more precision
    let formatted = '';
    if (converted < 0.01) {
       formatted = converted.toFixed(4);
    } else if (converted < 1) {
       formatted = converted.toFixed(3);
    } else {
       formatted = converted.toFixed(2);
    }

    return `${symbol}${formatted}`;
  };

  const plans = [
    {
      name: "BASIC PLAN",
      usdPrice: 0.0022,
      period: "/ API Call",
      description: "Essential verification for small scale needs",
      features: [
        "Text Verification Engine",
        "Fake news detection",
        "Credibility scoring",
        "Linguistic pattern checks",
        "24-Hour Activity Logs",
        "99% Uptime Monitoring"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "PRO PLAN",
      usdPrice: 0.0038,
      period: "/ API Call",
      description: "Advanced verification for growing apps",
      features: [
        "Text Verification Engine",
        "Image Verification Engine",
        "Image forensics & metadata check",
        "Manipulation detection",
        "48-Hour Activity Logs",
        "Standard Support"
      ],
      cta: "Upgrade to Pro",
      highlighted: true
    },
    {
      name: "BUSINESS PLAN",
      usdPrice: 0.0051,
      period: "/ API Call",
      description: "Complete solution for businesses",
      features: [
        "Text & Image Verification",
        "AI Chatbot Integration",
        "Smart Caching System",
        "Reduced repeated-query cost",
        "7-Day Activity Logs",
        "99.5% SLA Uptime",
        "Email + Chat Support"
      ],
      cta: "Contact Sales",
      highlighted: false
    },
    {
      name: "ENTERPRISE PLAN",
      usdPrice: 0.0119,
      period: "/ API Call",
      description: "Maximum power and security",
      features: [
        "All Verification Engines",
        "Advanced Analysis Suite",
        "Deep risk scoring",
        "Advanced Security & SSO",
        "30-Day Logs & Insights",
        "Custom SLA (up to 99.9%)",
        "Dedicated Account Manager",
        "Enterprise Integration Support"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. Scale up or down anytime.
          </p>
          
          {/* Currency Selector */}
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
            <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Currency:</span>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-sm font-semibold text-blue-600 dark:text-blue-400 focus:outline-none cursor-pointer"
            >
              {Object.keys(exchangeRates).map(curr => (
                <option key={curr} value={curr}>{exchangeRates[curr].name} ({curr})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl transform scale-105'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                  <Zap className="w-3 h-3" />
                  <span>Most Popular</span>
                </div>
              )}

              <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {plan.name}
              </h3>

              <div className="mb-4">
                <span className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {convertPrice(plan.usdPrice)}
                </span>
                <span className={`text-xs ml-1 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                  {plan.period}
                </span>
              </div>

              <p className={`mb-6 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                {plan.description}
              </p>

              <button
                onClick={() => {
                  if (plan.cta === "Contact Sales") {
                    handleContact(plan.name);
                  } else {
                    handleSubscribe(plan.name);
                  }
                }}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all mb-8 ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-blue-600'}`} />
                    <span className={`text-xs font-bold ${plan.highlighted ? 'text-blue-100' : 'text-gray-700 dark:text-gray-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            All plans include SSL, automatic backups, and GDPR compliance.
            <a href="#" className="text-blue-600 hover:underline ml-1">View detailed comparison</a>
          </p>
        </div>
      </div>
    </section>
  );
}
