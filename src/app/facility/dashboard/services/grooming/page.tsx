"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PawPrint, Clock, DollarSign, MapPin, Calendar } from "lucide-react";
import { facilities } from "@/data/facilities";

export default function GroomingServicePage() {
  // Static facility ID for now
  const facilityId = 11;
  const facility = facilities.find((f) => f.id === facilityId);
  const locations = facility?.locationsList || [];

  // Mock grooming settings
  const [settings, setSettings] = useState({
    enabled: true,
    basePrice: 35,
    operatingHours: {
      start: "08:00",
      end: "17:00",
    },
    availableLocations: ["Main Location"], // Default to first location
    description:
      "Professional grooming services including baths, haircuts, and nail trims.",
    rules:
      "Pets must be healthy and up to date on flea treatment. Aggressive pets may be declined.",
    sessions: [
      {
        id: "1",
        date: "2024-01-15",
        time: "10:00-12:00",
        staff: ["Facility Staff"],
        pets: ["Buddy"],
      },
      {
        id: "2",
        date: "2024-01-16",
        time: "14:00-16:00",
        staff: ["Facility Staff"],
        pets: ["Bella"],
      },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleEdit = () => {
    setIsEditing(true);
    setTempSettings(settings);
  };

  const handleSave = () => {
    setSettings(tempSettings);
    setIsEditing(false);
    // TODO: Save to backend
  };

  const handleCancel = () => {
    setTempSettings(settings);
    setIsEditing(false);
  };

  const handleLocationChange = (locationName: string, checked: boolean) => {
    const currentLocations = tempSettings.availableLocations;
    if (checked) {
      setTempSettings({
        ...tempSettings,
        availableLocations: [...currentLocations, locationName],
      });
    } else {
      setTempSettings({
        ...tempSettings,
        availableLocations: currentLocations.filter(
          (loc) => loc !== locationName,
        ),
      });
    }
  };

  const currentSettings = isEditing ? tempSettings : settings;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Grooming Service
          </h2>
          <p className="text-muted-foreground">
            Manage your grooming services, pricing, and availability
          </p>
        </div>
        <Badge variant={settings.enabled ? "default" : "secondary"}>
          {settings.enabled ? "Enabled" : "Disabled"}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PawPrint className="h-5 w-5" />
              Service Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enabled">Enable Grooming Service</Label>
              <Switch
                id="enabled"
                checked={currentSettings.enabled}
                onCheckedChange={(checked) =>
                  setTempSettings({ ...tempSettings, enabled: checked })
                }
                disabled={!isEditing}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              When enabled, customers can book grooming appointments for their
              pets.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Base Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={currentSettings.basePrice}
                onChange={(e) =>
                  setTempSettings({
                    ...tempSettings,
                    basePrice: parseFloat(e.target.value) || 0,
                  })
                }
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Operating Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start">Start Time</Label>
                <Select
                  value={currentSettings.operatingHours.start}
                  onValueChange={(value) =>
                    setTempSettings({
                      ...tempSettings,
                      operatingHours: {
                        ...tempSettings.operatingHours,
                        start: value,
                      },
                    })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end">End Time</Label>
                <Select
                  value={currentSettings.operatingHours.end}
                  onValueChange={(value) =>
                    setTempSettings({
                      ...tempSettings,
                      operatingHours: {
                        ...tempSettings.operatingHours,
                        end: value,
                      },
                    })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Available Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {locations.map((location) => (
            <div key={location.name} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location.name}`}
                checked={currentSettings.availableLocations.includes(
                  location.name,
                )}
                onCheckedChange={(checked) =>
                  handleLocationChange(location.name, checked as boolean)
                }
                disabled={!isEditing}
              />
              <Label htmlFor={`location-${location.name}`}>
                {location.name} - {location.address}
              </Label>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Select the locations where this grooming service is available.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Booked Pets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSettings.sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.date}</TableCell>
                  <TableCell>{session.time}</TableCell>
                  <TableCell>{session.staff.join(", ")}</TableCell>
                  <TableCell>{session.pets.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isEditing && (
            <div className="mt-4">
              <Button variant="outline">Manage Sessions</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={currentSettings.description}
              onChange={(e) =>
                setTempSettings({
                  ...tempSettings,
                  description: e.target.value,
                })
              }
              disabled={!isEditing}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rules">Rules & Requirements</Label>
            <Textarea
              id="rules"
              value={currentSettings.rules}
              onChange={(e) =>
                setTempSettings({
                  ...tempSettings,
                  rules: e.target.value,
                })
              }
              disabled={!isEditing}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        {!isEditing ? (
          <Button onClick={handleEdit}>Edit Settings</Button>
        ) : (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </>
        )}
      </div>
    </div>
  );
}
