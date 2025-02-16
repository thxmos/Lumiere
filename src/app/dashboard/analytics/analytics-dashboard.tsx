"use client";

import { useState } from "react";
import { Click, ProfileView, QRScan } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/shared/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/shared/components/ui/table";

import { tableData, chartData } from "./mocks";

export default function AnalyticsDashboard({
  scans,
  clicks,
  views,
}: {
  scans: QRScan[];
  clicks: Click[];
  views: ProfileView[];
}) {
  const [selectedLink, setSelectedLink] = useState("all");

  const filteredData =
    selectedLink === "all"
      ? tableData
      : tableData.filter((item) =>
          item.link.toLowerCase().includes(selectedLink),
        );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Monthly Overview</h2>
        <Select value={selectedLink} onValueChange={setSelectedLink}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select link" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Links</SelectItem>
            <SelectItem value="spotify">Spotify</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="qr">QR Codes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clicks.length}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scans.length}</div>
            <p className="text-xs text-muted-foreground">
              +15.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{views.length}</div>
            <p className="text-xs text-muted-foreground">
              +12.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Engagement Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 13s</div>
            <p className="text-xs text-muted-foreground">
              +7.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary">
        <CardHeader>
          <CardTitle>Interactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--foreground))"
                tick={{ fill: "hsl(var(--foreground))" }}
              />
              <YAxis
                stroke="hsl(var(--foreground))"
                tick={{ fill: "hsl(var(--foreground))" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="clicks"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.5}
              />
              <Area
                type="monotone"
                dataKey="scans"
                stackId="1"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.5}
              />
              <Area
                type="monotone"
                dataKey="views"
                stackId="1"
                stroke="hsl(var(--chart-3))"
                fill="hsl(var(--chart-3))"
                fillOpacity={0.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-primary">
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Link/QR</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>OS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.link}</TableCell>
                  <TableCell>{row.browser}</TableCell>
                  <TableCell>{row.os}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card text-card-foreground p-3 border rounded-lg shadow-sm">
        <p className="font-bold">{label}</p>
        <p className="text-sm flex items-center gap-2">
          <span className="font-bold">Clicks:</span>
          <span
            className="font-medium"
            style={{ color: "hsl(var(--chart-1))" }}
          >
            {payload[0].value}
          </span>
        </p>
        <p className="text-sm flex items-center gap-2">
          <span className="font-bold">Scans:</span>
          <span
            className="font-medium"
            style={{ color: "hsl(var(--chart-2))" }}
          >
            {payload[1].value}
          </span>
        </p>
        <p className="text-sm flex items-center gap-2">
          <span className="font-bold">Views:</span>
          <span
            className="font-medium"
            style={{ color: "hsl(var(--chart-3))" }}
          >
            {payload[2].value}
          </span>
        </p>
      </div>
    );
  }

  return null;
};
