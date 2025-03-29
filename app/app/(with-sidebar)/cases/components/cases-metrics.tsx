"use client";

import { MetricCard } from "@/components/metric-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function CasesMetrics() {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <MetricCard.Root>
        <MetricCard.Header>
          <MetricCard.Title title="Total cases" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-zinc-700/50 text-xs font-semibold py-1.5 rounded-[9999px] outline-none hover:bg-zinc-700/50 h-fit">
                Last 7 days
                <ChevronDown className="text-zinc-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 14 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </MetricCard.Header>
        <MetricCard.Body>
          <MetricCard.ValueSection>
            <MetricCard.Value value={940} />
            <MetricCard.PerfomanceIndicator value={1} />
          </MetricCard.ValueSection>
        </MetricCard.Body>
        <MetricCard.Footer></MetricCard.Footer>
      </MetricCard.Root>

      <MetricCard.Root>
        <MetricCard.Header>
          <MetricCard.Title title="New cases" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-zinc-700/50 text-xs font-semibold py-1.5 rounded-[9999px] outline-none hover:bg-zinc-700/50 h-fit">
                Last 7 days
                <ChevronDown className="text-zinc-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 14 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </MetricCard.Header>
        <MetricCard.Body>
          <MetricCard.ValueSection>
            <MetricCard.Value value={485} />
            <MetricCard.PerfomanceIndicator value={2.95} />
          </MetricCard.ValueSection>
        </MetricCard.Body>
        <MetricCard.Footer></MetricCard.Footer>
      </MetricCard.Root>

      <MetricCard.Root>
        <MetricCard.Header>
          <MetricCard.Title title="Tasks" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-zinc-700/50 text-xs font-semibold py-1.5 rounded-[9999px] outline-none hover:bg-zinc-700/50 h-fit">
                Last 7 days
                <ChevronDown className="text-zinc-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 14 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </MetricCard.Header>
        <MetricCard.Body>
          <MetricCard.ValueSection>
            <MetricCard.Value value={75} displayFormat="percentage" />
            <MetricCard.PerfomanceIndicator value={-12} />
          </MetricCard.ValueSection>
        </MetricCard.Body>
        <MetricCard.Footer></MetricCard.Footer>
      </MetricCard.Root>

      <MetricCard.Root>
        <MetricCard.Header>
          <MetricCard.Title title="Billing Amount" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-zinc-700/50 text-xs font-semibold py-1.5 rounded-[9999px] outline-none hover:bg-zinc-700/50 h-fit">
                Last 7 days
                <ChevronDown className="text-zinc-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 14 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </MetricCard.Header>
        <MetricCard.Body>
          <MetricCard.ValueSection>
            <MetricCard.Value value={2400} displayFormat="monetary" />
            <MetricCard.PerfomanceIndicator value={4.8} />
          </MetricCard.ValueSection>
        </MetricCard.Body>
        <MetricCard.Footer></MetricCard.Footer>
      </MetricCard.Root>
    </div>
  );
}
