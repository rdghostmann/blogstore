import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, ShoppingBag, TrendingUp } from 'lucide-react' // Make sure to import these icons

    // Add mock stats data
  const stats = [
    {
      title: "Users",
      value: 1280,
      description: "Total registered users",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Posts",
      value: 342,
      description: "Published blog posts",
      icon: FileText,
      color: "text-green-500",
    },
    {
      title: "Orders",
      value: 87,
      description: "Total store orders",
      icon: ShoppingBag,
      color: "text-purple-500",
    },
    {
      title: "Growth",
      value: "12%",
      description: "Monthly growth",
      icon: TrendingUp,
      color: "text-pink-500",
    },
  ]

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default StatsGrid
