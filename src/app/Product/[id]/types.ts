export interface ProductPageProps {
  params: {
    id: string
  }
}

export interface ProductFeature {
  icon: string
  title: string
  description: string
  bullets?: string[]
}

export interface ProductBenefit {
  icon: string
  title: string
  description: string
  metric: string
}

export interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular: boolean
}

export interface ProductScreenshot {
  src: string
  alt: string
  title: string
}

export interface ProductData {
  id: string
  name: string
  description: string
  features: ProductFeature[]
  benefits: ProductBenefit[]
  screenshots: ProductScreenshot[]
  pricingPlans: PricingPlan[]
} 