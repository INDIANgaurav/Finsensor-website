import React from 'react'
import { 
  BarChart3, 
  FileText, 
  Download, 
  Shield, 
  Zap, 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  Target, 
  Award,
  Database,
  BookOpen,
  Calculator,
  RefreshCw
} from 'lucide-react'

const iconMap: { [key: string]: React.ComponentType<any> } = {
  BarChart3,
  FileText,
  Download,
  Shield,
  Zap,
  CheckCircle,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Target,
  Award,
  Database,
  BookOpen,
  Calculator,
  RefreshCw
}

export const getIcon = (iconName: string, className: string = "h-8 w-8") => {
  const IconComponent = iconMap[iconName]
  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found`)
    return null
  }
  return <IconComponent className={className} />
}

export default iconMap 