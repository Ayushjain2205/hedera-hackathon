import { Activity, Users, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    name: "Total Agents",
    value: "1,234",
    change: "+12.3%",
    changeType: "increase",
    icon: Users,
  },
  {
    name: "Active Tasks",
    value: "2,621.87",
    change: "(16.8 TPS)",
    changeType: "neutral",
    icon: Activity,
  },
  {
    name: "Verification Rate",
    value: "98.5%",
    change: "+2.1%",
    changeType: "increase",
    icon: CheckCircle,
  },
  {
    name: "Avg Response Time",
    value: "1.93s",
    change: "-0.3s",
    changeType: "decrease",
    icon: Clock,
  },
];

export function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-gray-500" />
                  <h3 className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </h3>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-sm ${
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : stat.changeType === "decrease"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
