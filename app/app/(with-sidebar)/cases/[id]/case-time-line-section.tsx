"use client";

import { TimelineEvent } from "@/components/timeline-event";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, MessageSquareText, Upload } from "lucide-react";

export default function CaseTimeLineSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimas atividades</CardTitle>
        <CardDescription>
          Acompanhe os principais acontecimentos e atualizações deste caso em
          uma linha do tempo organizada e detalhada.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="pl-4">
          <TimelineEvent.Root>
            <TimelineEvent.Header>
              <TimelineEvent.Icon icon={MessageSquareText} />
              <TimelineEvent.Title
                actor="Carter Bator"
                action="Upload 3 file in"
                target="Mobile Flow Design"
              />

              <TimelineEvent.CreatedAt createdAt="1hr Ago" />
            </TimelineEvent.Header>
            <TimelineEvent.Content></TimelineEvent.Content>
          </TimelineEvent.Root>
          <TimelineEvent.Root>
            <TimelineEvent.Header>
              <TimelineEvent.Icon icon={MessageSquareText} />
              <TimelineEvent.Title
                actor="Carter Bator"
                action="Upload 3 file in"
                target="Mobile Flow Design"
              />

              <TimelineEvent.CreatedAt createdAt="1hr Ago" />
            </TimelineEvent.Header>
            <TimelineEvent.Content></TimelineEvent.Content>
          </TimelineEvent.Root>
          <TimelineEvent.Root>
            <TimelineEvent.Header>
              <TimelineEvent.Icon icon={MessageSquareText} />
              <TimelineEvent.Title
                actor="Carter Bator"
                action="Upload 3 file in"
                target="Mobile Flow Design"
              />

              <TimelineEvent.CreatedAt createdAt="1hr Ago" />
            </TimelineEvent.Header>
            <TimelineEvent.Content></TimelineEvent.Content>
          </TimelineEvent.Root>
          <TimelineEvent.Root>
            <TimelineEvent.Header>
              <TimelineEvent.Icon icon={MessageSquareText} />
              <TimelineEvent.Title
                actor="Carter Bator"
                action="Upload 3 file in"
                target="Mobile Flow Design"
              />

              <TimelineEvent.CreatedAt createdAt="1hr Ago" />
            </TimelineEvent.Header>
            <TimelineEvent.Content></TimelineEvent.Content>
          </TimelineEvent.Root>
        </div>
      </CardContent>
    </Card>
  );
}
