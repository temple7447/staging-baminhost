import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Save, RefreshCw, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface BigItem {
  id: string;
  title: string;
  description?: string;
}

const STORAGE_KEY = "big5_items_v2";

const createItem = (): BigItem => ({
  id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
  title: "",
  description: "",
});

export const Big5Dashboard: React.FC = () => {
  const [items, setItems] = useState<BigItem[]>([
    createItem(),
    createItem(),
    createItem(),
    createItem(),
    createItem(),
  ]);

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load Big 5 from storage", e);
    }
  }, []);

  const itemsCount = items.length;
  const filledCount = useMemo(() => items.filter(i => i.title?.trim()).length, [items]);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const reset = () => {
    setItems([]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  };

  const addItem = () => setItems(prev => [...prev, createItem()]);
  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const moveItem = (index: number, dir: -1 | 1) => {
    setItems(prev => {
      const next = [...prev];
      const newIndex = index + dir;
      if (newIndex < 0 || newIndex >= next.length) return prev;
      const [spliced] = next.splice(index, 1);
      next.splice(newIndex, 0, spliced);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Big 5+</h1>
          <p className="text-sm text-muted-foreground">Capture and prioritize the outcomes you own. Start with five and add more as needed.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{filledCount}/{itemsCount} filled</Badge>
          <Button size="sm" onClick={addItem} className="gap-2">
            <Plus className="w-4 h-4" /> Add item
          </Button>
        </div>
      </div>

      {/* Display grid similar to the image */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Big Items</CardTitle>
          <CardDescription>Keep each item crisp and action-oriented.</CardDescription>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-sm text-muted-foreground">No items yet. Click "Add item" to get started.</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <div key={item.id} className="rounded-lg border bg-card p-4">
                  <div className="text-sm font-medium mb-2">{i + 1}. {item.title?.trim() || "Add a title"}</div>
                  <div className="text-xs text-muted-foreground whitespace-pre-wrap">
                    {item.description?.trim() || "Optional description"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Edit your list</CardTitle>
          <CardDescription>Write what you own and will focus on. Add, remove, and reorder freely.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {items.length === 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Your list is empty.
              <Button size="sm" variant="outline" onClick={addItem} className="gap-2">
                <Plus className="w-4 h-4" /> Add first item
              </Button>
            </div>
          )}

          {items.map((item, idx) => (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{idx + 1}. Title</div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => moveItem(idx, -1)} disabled={idx === 0} title="Move up">
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => moveItem(idx, 1)} disabled={idx === items.length - 1} title="Move down">
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} title="Remove">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
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
              <Save className="w-4 h-4" /> Save
            </Button>
            <Button variant="outline" onClick={reset} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Clear all
            </Button>
            <Button variant="outline" onClick={addItem} className="gap-2">
              <Plus className="w-4 h-4" /> Add another
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Big5Dashboard;
