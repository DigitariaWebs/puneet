"use client";

import { useState } from "react";
import { Module, modules, getModulesByCategory } from "@/data/modules";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Users,
  UserCircle,
  DollarSign,
  MessageSquare,
  GraduationCap,
  Scissors,
  Package,
  Check,
  Edit,
  Plus,
  Lock,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  Users,
  UserCircle,
  DollarSign,
  MessageSquare,
  GraduationCap,
  Scissors,
  Package,
};

interface ModuleCardProps {
  module: Module;
  onEdit: (module: Module) => void;
  onToggle: (module: Module) => void;
}

function ModuleCard({ module, onEdit, onToggle }: ModuleCardProps) {
  const Icon = iconMap[module.icon] || Package;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "core":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "advanced":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "premium":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "addon":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "beginner":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "pro":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      case "enterprise":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg">{module.name}</CardTitle>
              <CardDescription className="text-sm">
                {module.description}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Category & Status */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="outline"
            className={`capitalize ${getCategoryColor(module.category)}`}
          >
            {module.category}
          </Badge>
          <Badge
            variant="outline"
            className={`capitalize ${getTierBadgeColor(module.requiredTier)}`}
          >
            {module.requiredTier === "all"
              ? "All Tiers"
              : `${module.requiredTier}+`}
          </Badge>
          {module.isStandalone && (
            <Badge variant="secondary">Standalone</Badge>
          )}
          {!module.isActive && <Badge variant="destructive">Inactive</Badge>}
        </div>

        {/* Pricing */}
        {module.pricing.monthly > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">
              Add-on Pricing
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-muted rounded-lg">
                <p className="text-lg font-bold">${module.pricing.monthly}</p>
                <p className="text-xs text-muted-foreground">/mo</p>
              </div>
              <div className="text-center p-2 bg-muted rounded-lg">
                <p className="text-lg font-bold">${module.pricing.quarterly}</p>
                <p className="text-xs text-muted-foreground">/qtr</p>
              </div>
              <div className="text-center p-2 bg-muted rounded-lg">
                <p className="text-lg font-bold">${module.pricing.yearly}</p>
                <p className="text-xs text-muted-foreground">/yr</p>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-muted-foreground">
            Features ({module.features.length})
          </h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {module.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <p className="text-sm">{feature}</p>
              </div>
            ))}
            {module.features.length > 4 && (
              <p className="text-xs text-muted-foreground pl-6">
                + {module.features.length - 4} more features
              </p>
            )}
          </div>
        </div>

        {/* Dependencies */}
        {module.dependencies.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Dependencies
            </h4>
            <div className="flex flex-wrap gap-1">
              {module.dependencies.map((depId) => (
                <Badge key={depId} variant="outline" className="text-xs">
                  {modules.find((m) => m.id === depId)?.name || depId}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(module)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant={module.isActive ? "outline" : "default"}
          size="sm"
          onClick={() => onToggle(module)}
        >
          {module.isActive ? "Disable" : "Enable"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ModulesManagement() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleEdit = (module: Module) => {
    console.log("Edit module:", module);
    // TODO: Open edit modal
  };

  const handleToggle = (module: Module) => {
    console.log("Toggle module:", module);
    // TODO: Implement toggle logic
  };

  const handleCreate = () => {
    console.log("Create new module");
    // TODO: Open create modal
  };

  const coreModules = getModulesByCategory("core");
  const advancedModules = getModulesByCategory("advanced");
  const premiumModules = getModulesByCategory("premium");
  const addonModules = getModulesByCategory("addon");

  const allModules = modules;

  const getModulesToDisplay = () => {
    switch (selectedCategory) {
      case "core":
        return coreModules;
      case "advanced":
        return advancedModules;
      case "premium":
        return premiumModules;
      case "addon":
        return addonModules;
      default:
        return allModules;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Module Management</h2>
          <p className="text-muted-foreground">
            Configure available modules for facilities
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Create Module
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all">
            All Modules ({allModules.length})
          </TabsTrigger>
          <TabsTrigger value="core">
            Core ({coreModules.length})
          </TabsTrigger>
          <TabsTrigger value="advanced">
            Advanced ({advancedModules.length})
          </TabsTrigger>
          <TabsTrigger value="premium">
            Premium ({premiumModules.length})
          </TabsTrigger>
          {addonModules.length > 0 && (
            <TabsTrigger value="addon">
              Add-ons ({addonModules.length})
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getModulesToDisplay().map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onEdit={handleEdit}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
