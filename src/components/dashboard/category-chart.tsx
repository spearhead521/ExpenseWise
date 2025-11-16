'use client';

import { TrendingUp } from 'lucide-react';
import {
  DonutChart,
  type DonutChartProps,
} from '@tremor/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { MOCK_TRANSACTIONS, MOCK_CATEGORIES } from '@/lib/data';

const chartData = MOCK_CATEGORIES.map((category) => {
  const total = MOCK_TRANSACTIONS.filter(
    (t) => t.type === 'expense' && t.category === category.name
  ).reduce((acc, t) => acc + t.amount, 0);
  return {
    name: category.name,
    value: total,
    fill: category.color,
  };
}).filter(item => item.value > 0);


const chartConfig = {
  value: {
    label: 'Value',
  },
  ...Object.fromEntries(chartData.map(d => [d.name, {label: d.name, color: d.fill}]))
};

export default function CategoryChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Spending</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <DonutChart
            data={chartData}
            category="value"
            index="name"
            variant='pie'
          />
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <ChartContainer config={chartConfig} className='w-full'>
          <ChartLegend content={<ChartLegendContent nameKey="name" />} className="flex-wrap" />
        </ChartContainer>
      </CardFooter>
    </Card>
  );
}
