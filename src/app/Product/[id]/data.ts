import { ProductData } from './types'

const finsoEasy360Data: ProductData = {
  id: 'finsoeasy360',
  name: 'FinSoEasy360',
  description: 'Advanced financial reporting software for automated balance sheets and profit & loss statements',
  features: [
    {
      icon: "BarChart3",
      title: "Real-Time Consolidation",
      description:
        "Automatically consolidates financial data across units, subsidiaries, joint ventures and associates providing accurate and up-to-date consolidated financial statements.",
    },
    {
      icon: "FileText",
      title: "Customizable Reporting Templates",
      description:
        "Create and adjust financial reports to meet statutory requirements and accounting standards with fully customizable templates.",
    },
    {
      icon: "Zap",
      title: "Segment-Wise Reporting",
      description:
        "Generate detailed, segment-wise financial reports with a single click for easy financial analysis across multiple divisions.",
    },
    {
      icon: "Database",
      title: "Centralized Data Management",
      description:
        "Access and manage all financial data from one central location, ensuring data integrity and preventing unauthorized changes.",
    },
    {
      icon: "Shield",
      title: "Cloud-Based Data Security",
      description:
        "Powered by AWS, offering robust security features to safeguard sensitive financial information from unauthorized access.",
    },
    {
      icon: "Users",
      title: "Collaborative Workflows",
      description:
        "Enable finance teams to collaborate efficiently with role-based access, audit trails, and real-time comment tracking for streamlined reporting.",
    },
  ],
  benefits: [
    {
      icon: 'TrendingUp',
      title: "Increased Efficiency",
      description: "Reduce manual data entry by 80% and generate reports in minutes instead of hours.",
      metric: "80% faster"
    },
    {
      icon: 'Clock',
      title: "Time Savings",
      description: "Automate repetitive tasks and focus on strategic financial analysis and decision-making.",
      metric: "Save 20+ hours/week"
    },
    {
      icon: 'DollarSign',
      title: "Cost Reduction",
      description: "Lower operational costs by reducing manual errors and improving resource allocation.",
      metric: "30% cost savings"
    },
    {
      icon: 'Users',
      title: "Team Collaboration",
      description: "Enable multiple team members to work simultaneously on financial reports and analysis.",
      metric: "Unlimited users"
    },
    {
      icon: 'Target',
      title: "Accuracy Improvement",
      description: "Eliminate human errors with automated calculations and built-in validation checks.",
      metric: "99.9% accuracy"
    },
    {
      icon: 'Award',
      title: "Compliance Ready",
      description: "Meet regulatory requirements with standardized reporting formats and audit trails.",
      metric: "100% compliant"
    }
  ],
  screenshots: [
    { src: '/Report1.png', alt: "Dashboard Overview", title: "Dashboard Overview" },
    { src: '/Report2.png', alt: "Financial Reports", title: "Financial Reports" },
    { src: '/Report3.png', alt: "Data Analysis", title: "Data Analysis" },
    { src: '/Report4.png', alt: "Export Options", title: "Export Options" }
  ],
  pricingPlans: [
    {
      name: "Starter",
      price: "$99",
      period: "per month",
      description: "Perfect for small businesses getting started with financial reporting",
      features: ["Up to 5 users", "Basic financial reports", "Excel export", "Email support", "Standard security"],
      popular: false
    },
    {
      name: "Professional",
      price: "$199",
      period: "per month",
      description: "Ideal for growing companies with advanced reporting needs",
      features: ["Up to 25 users", "Advanced financial reports", "Real-time consolidation", "Priority support", "Enhanced security", "Custom templates", "API access"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Tailored solution for large organizations with complex requirements",
      features: ["Unlimited users", "Custom integrations", "Dedicated support", "Advanced analytics", "White-label options", "On-premise deployment", "Custom training"],
      popular: false
    }
  ]
}

const lamsoEasy360Data: ProductData = {
  id: 'lease-tool',
  name: 'LAMsoEasy360',
  description: 'Lease Assets Management Software — fully automated lease accounting and reporting compliant with Ind AS 116',
  features: [
    {
      icon: "BookOpen",
      title: "Leasemaster Data Management",
      description:
        "Capture of key terms: start/end dates, rent, escalations, options (renewal/termination), variable payments, etc. for enabling the disclosure in the financial statements.",
    },
    {
      icon: "Calculator",
      title: "Automated ROU Asset & Lease Liability Calculations",
      description:
        "Does automatic computation of lease liability and ROU asset. Built-in logic for extensions, terminations, and remeasurements.",
    },
    {
      icon: "TrendingUp",
      title: "Interest and Amortisation Engine",
      description: "",
      bullets: [
        "Periodic interest on the lease liability using the discounting rate.",
        "Depreciation on the ROU asset.",
        "Unwinding of interest calculation on security deposits.",
      ],
    },
    {
      icon: "Zap",
      title: "Journal Entries and ERP Integration",
      description: "",
      bullets: [
        "Generate journal entries to post lease entries in the financial reporting software (FinSoEasy360) or any other ERP.",
      ],
    },
    {
      icon: "FileText",
      title: "Disclosure and Reporting Suite",
      description: "",
      bullets: [
        "Pre-built Ind AS 116 disclosures: ROU asset and lease liability balances, depreciation, interest.",
        "Maturity schedules and cash-flow-based disclosures.",
        "Downloadable reports (Excel) for financial statement annexures and board/debt-covenant packages.",
        "Customisable management dashboards on total lease cost, interest cost, discount rate trend, year-wise depreciation, debt-like position, and upcoming renewals, etc.",
      ],
    },
    {
      icon: "RefreshCw",
      title: "Lease Lifecycle Tracking",
      description: "",
      bullets: [
        "Lifecycle view: identification → initial recognition → renewals / modifications → terminations / disposals.",
        "Full handling of modifications.",
      ],
    },
  ],
  benefits: [
    {
      icon: 'TrendingUp',
      title: "Increased Efficiency",
      description: "Reduce manual data entry by 90% and generate reports in minutes instead of hours.",
      metric: "90% faster"
    },
    {
      icon: 'Clock',
      title: "Time Savings",
      description: "Automate repetitive tasks and focus on strategic financial analysis and decision-making.",
      metric: "Upto 90%"
    },
    {
      icon: 'DollarSign',
      title: "Cost Reduction",
      description: "Lower operational costs by reducing manual errors and improving resource allocation.",
      metric: ""
    },
    {
      icon: 'Target',
      title: "Accuracy Improvement",
      description: "Eliminate human errors with automated calculations and built-in validation checks.",
      metric: ""
    },
    {
      icon: 'Award',
      title: "Compliance Ready",
      description: "Meet regulatory requirements with standardized reporting formats.",
      metric: ""
    }
  ],
  screenshots: [],
  pricingPlans: []
}

export const allProductData: Record<string, ProductData> = {
  'finsoeasy360': finsoEasy360Data,
  'lease-tool': lamsoEasy360Data,
}

// Keep backward compat for components still using productData directly
export const productData = finsoEasy360Data

export function getProductData(productId: string): ProductData | undefined {
  return allProductData[productId]
}
