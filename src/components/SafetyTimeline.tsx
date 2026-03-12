import { Clock } from "lucide-react";
import type { TimelineEvent } from "@/types/wallet";

const typeConfig = {
  danger: "border-destructive/40 bg-destructive",
  warning: "border-warning/40 bg-warning",
  info: "border-primary/40 bg-primary",
};

interface SafetyTimelineProps {
  events: TimelineEvent[];
}

export function SafetyTimeline({ events }: SafetyTimelineProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        Safety Timeline
      </h2>
      <div className="glass-card rounded-lg p-4">
        <div className="relative space-y-0">
          {events.map((event, i) => {
            const config = typeConfig[event.type];
            const isLast = i === events.length - 1;
            return (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${config.split(" ")[1]} ring-4 ring-background z-10`} />
                  {!isLast && <div className="w-px flex-1 bg-border min-h-[2rem]" />}
                </div>
                <div className="pb-6">
                  <span className="text-xs text-muted-foreground font-medium">{event.date}</span>
                  <p className="text-sm text-foreground mt-0.5">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
