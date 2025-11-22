"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Sparkles, Star, TrendingUp } from "lucide-react";

/**
 * Design System Showcase
 * Import this component to see all design system elements in action
 *
 * @example
 * import { DesignShowcase } from '@/lib/design/showcase';
 *
 * export default function Page() {
 *   return <DesignShowcase />;
 * }
 */
export function DesignShowcase() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-linear-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
          Design System Showcase
        </h1>
        <p className="text-muted-foreground text-lg">
          A visual reference for all available design tokens and components 🎨
        </p>
      </div>

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch
            name="Primary"
            className="bg-primary text-primary-foreground"
          />
          <ColorSwatch
            name="Secondary"
            className="bg-secondary text-secondary-foreground"
          />
          <ColorSwatch
            name="Accent"
            className="bg-accent text-accent-foreground"
          />
          <ColorSwatch
            name="Muted"
            className="bg-muted text-muted-foreground"
          />
          <ColorSwatch
            name="Success"
            className="bg-success text-success-foreground"
          />
          <ColorSwatch
            name="Warning"
            className="bg-warning text-warning-foreground"
          />
          <ColorSwatch name="Info" className="bg-info text-info-foreground" />
          <ColorSwatch
            name="Destructive"
            className="bg-destructive text-destructive-foreground"
          />
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Shadows */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Shadows</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Soft Shadow</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-xs text-muted-foreground">shadow-sm</code>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Playful Shadow</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-xs text-muted-foreground">shadow-md</code>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Elevated Shadow</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-xs text-muted-foreground">shadow-lg</code>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Interactive Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Hover Me!</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Sparkles className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-xs text-muted-foreground mt-1">
                With lift effect
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Success Card</CardTitle>
              <div className="p-2 rounded-lg bg-success/10 text-success group-hover:scale-110 transition-transform">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">+25%</p>
              <p className="text-xs text-muted-foreground mt-1">Growth rate</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Warning Card</CardTitle>
              <div className="p-2 rounded-lg bg-warning/10 text-warning group-hover:scale-110 transition-transform">
                <Star className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">42</p>
              <p className="text-xs text-muted-foreground mt-1">
                Pending items
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Status Indicators */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Status Indicators</h2>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <span className="status-dot status-online" />
            <span className="text-sm">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="status-dot status-busy" />
            <span className="text-sm">Busy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="status-dot status-offline" />
            <span className="text-sm">Offline</span>
          </div>
        </div>
      </section>

      {/* Gradients */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Gradients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-warm rounded-xl p-6 border">
            <p className="font-semibold">Warm Gradient</p>
            <code className="text-xs text-muted-foreground">
              bg-gradient-warm
            </code>
          </div>
          <div className="bg-gradient-primary rounded-xl p-6 text-white">
            <p className="font-semibold">Primary Gradient</p>
            <code className="text-xs opacity-80">bg-gradient-primary</code>
          </div>
          <div className="bg-gradient-success rounded-xl p-6 text-white">
            <p className="font-semibold">Success Gradient</p>
            <code className="text-xs opacity-80">bg-gradient-success</code>
          </div>
        </div>
      </section>

      {/* Text Gradients */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Text Gradients</h2>
        <div className="space-y-2">
          <p className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Primary to Secondary Gradient
          </p>
          <p className="text-3xl font-bold bg-linear-to-r from-success to-info bg-clip-text text-transparent">
            Success to Info Gradient
          </p>
          <p className="text-3xl font-bold bg-linear-to-r from-warning to-destructive bg-clip-text text-transparent">
            Warning to Destructive Gradient
          </p>
        </div>
      </section>

      {/* Glass Morphism */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Glass Morphism</h2>
        <div className="bg-linear-to-br from-primary/20 to-secondary/20 rounded-xl p-8">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This card uses the glass effect with backdrop blur
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Icons & Emojis */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Service & Pet Icons</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <EmojiCard emoji="✂️" label="Grooming" />
          <EmojiCard emoji="🏡" label="Daycare" />
          <EmojiCard emoji="🏨" label="Boarding" />
          <EmojiCard emoji="🦮" label="Walking" />
          <EmojiCard emoji="🐕" label="Dog" />
          <EmojiCard emoji="🐈" label="Cat" />
          <EmojiCard emoji="🐰" label="Rabbit" />
          <EmojiCard emoji="🐾" label="Other Pets" />
        </div>
      </section>

      {/* Animations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Animations</h2>
        <div className="flex gap-4">
          <Card className="animate-in">
            <CardContent className="pt-6">
              <p className="text-sm">Fade In Animation</p>
              <code className="text-xs text-muted-foreground">animate-in</code>
            </CardContent>
          </Card>
          <Card className="animate-bounce-subtle">
            <CardContent className="pt-6">
              <p className="text-sm">Subtle Bounce</p>
              <code className="text-xs text-muted-foreground">
                animate-bounce-subtle
              </code>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function ColorSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className={`rounded-xl p-6 ${className}`}>
      <p className="font-semibold">{name}</p>
    </div>
  );
}

function EmojiCard({ emoji, label }: { emoji: string; label: string }) {
  return (
    <Card className="hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
      <CardContent className="pt-6 text-center">
        <div className="text-4xl mb-2">{emoji}</div>
        <p className="text-sm font-medium">{label}</p>
      </CardContent>
    </Card>
  );
}
