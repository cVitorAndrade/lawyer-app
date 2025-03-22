"use client";

import { Button } from "@/components/ui/button";
import CasesTable from "./cases-table";
import { columns } from "./cases-table-columns";
import { ChevronDown, Plus } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddNewCase from "./add-new-case";
import { useEffect, useState } from "react";
import { CaseService } from "@/service/case.service";
import { ICase } from "@/interfaces/ICase";
import CasesMetrics from "./[id]/cases-metrics";

export default function Cases() {
  const [lawyerCases, setLawyerCases] = useState<ICase[]>([]);

  useEffect(() => {
    const onGetLawyerCases = async () => {
      try {
        const cases = await CaseService.getAllLawyerCases();
        setLawyerCases(cases);
      } catch (error) {
        console.log("Cases - onGetLawyerCases: ", error);
      }
    };

    onGetLawyerCases();
  }, []);
  return (
    <div>
      {/* <div className="grid gap-4">
        <div className="grid grid-cols-4 gap-4">
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
      </div> */}

      <CasesMetrics />

      <div className="flex items-center justify-between gap-4 border-b py-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold">Your Cases</h2>
          <p className="text-sm text-neutral-600">
            Keep track of the cases you are involved in. Find detailed
            information and updates on each process in a practical and organized
            way
          </p>
        </div>

        <AddNewCase>
          <Button variant="default">
            <Plus />
            Add new case
          </Button>
        </AddNewCase>
      </div>

      <div>
        <CasesTable data={lawyerCases} columns={columns} />
      </div>
    </div>
  );
}
