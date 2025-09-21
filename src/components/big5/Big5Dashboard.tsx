import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Save, RefreshCw } from "lucide-react";

interface Big5Item {
  id: number;
  title: string;
  description?: string;
}

const STORAGE_KEY = "big5_items_v1";

export const Big5Dashboard: React.FC = () => {
  const [items, setItems] = useState<Big5Item[]>([
    { id: 1, title: "", description: "" },
    { id: 2, title: "", description: "" },
    { id: 3, title: "", description: "" },
    { id: 4, title: "", description: "" },
    { id: 5, title: "", description: "" },
  ]);

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === 5) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load Big 5 from storage", e);
    }
  }, []);

  const filledCount = useMemo(() => items.filter(i => i.title?.trim()).length, [items]);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const reset = () => {
    const cleared: Big5Item[] = items.map(i => ({ ...i, title: "", description: "" }));
    setItems(cleared);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleared));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Big 5</h1>
          <p className="text-sm text-muted-foreground">Capture the five most important responsibilities or outcomes you own right now.</p>
        </div>
        <Badge variant="secondary">{filledCount}/5 filled</Badge>
      </div>

      {/* Display grid similar to the image */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Example of Your Big 5</CardTitle>
          <CardDescription>Keep it short and action oriented. You can edit anytime.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-lg border bg-card p-4">
                <div className="text-sm font-medium mb-2">{item.id}. {item.title?.trim() || "Add a title"}</div>
                <div className="text-xs text-muted-foreground whitespace-pre-wrap">
                  {item.description?.trim() || "Optional description"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Edit your Big 5</CardTitle>
          <CardDescription>Write what you own and will focus on. These are your primary outcomes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {items.map((item, idx) => (
            <div key={item.id} className="space-y-2">
              <div className="text-sm font-semibold">{item.id}. Title</div>
              <Input
                placeholder="e.g. Create and publish content & be the face of the business"
                value={item.title}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, title: e.target.value };
                  setItems(next);
                }}
              />
              <div className="text-xs text-muted-foreground">Optional note</div>
              <Textarea
                placeholder="Add details if helpful (e.g., frequency, scope, ownership)"
                value={item.description}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, description: e.target.value };
                  setItems(next);
                }}
              />
              {idx < items.length - 1 && <Separator className="my-4" />}
            </div>
          ))}

          <div className="flex flex-wrap gap-2">
            <Button onClick={save} className="gap-2">
              <Save className="w-4 h-4" /> Save Big 5
            </Button>
            <Button variant="outline" onClick={reset} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Big5Dashboard;
