"use client";

import { useState, useRef, useCallback } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Eye } from "lucide-react";
import { VariableInsertDropdown } from "@/components/shared/VariableInsertDropdown";
import { TemplatePreviewPanel } from "@/components/shared/TemplatePreviewPanel";
import { useInsertAtCursor } from "@/hooks/use-insert-at-cursor";

interface EmailTemplate {
  name?: string;
  type?: string;
  subject?: string;
  body?: string;
  variables?: string[];
  category?: string;
}

interface EmailTemplateModalProps {
  template?: EmailTemplate;
  onClose: () => void;
}

export function EmailTemplateModal({
  template,
  onClose,
}: EmailTemplateModalProps) {
  const [formData, setFormData] = useState({
    name: template?.name || "",
    subject: template?.subject || "",
    body: template?.body || "",
    category: template?.category || "promotional",
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [activeField, setActiveField] = useState<"subject" | "body">("body");
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    console.log("Saving template:", formData);
    onClose();
  };

  const activeRef = activeField === "subject" ? subjectRef : bodyRef;
  const activeValue = formData[activeField];
  const setActiveValue = useCallback(
    (newValue: string) => {
      setFormData((prev) => ({ ...prev, [activeField]: newValue }));
    },
    [activeField],
  );
  const insertVariable = useInsertAtCursor(activeRef, activeValue, setActiveValue);

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {template ? "Edit Email Template" : "Create Email Template"}
        </DialogTitle>
        <DialogDescription>
          Create reusable email templates with dynamic variables
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        {!previewMode ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Template Name *</Label>
              <Input
                id="name"
                aria-required="true"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Welcome New Client"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger aria-required="true">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promotional">Promotional</SelectItem>
                  <SelectItem value="transactional">Transactional</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="subject">Subject Line *</Label>
                <VariableInsertDropdown
                  context="marketing"
                  onInsert={insertVariable}
                />
              </div>
              <Input
                id="subject"
                ref={subjectRef}
                aria-required="true"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                onFocus={() => setActiveField("subject")}
                placeholder="e.g., Welcome to {{facility_name}}!"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Email Body *</Label>
              <Textarea
                id="body"
                ref={bodyRef}
                aria-required="true"
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                onFocus={() => setActiveField("body")}
                placeholder="Enter your email content here..."
                rows={10}
              />
            </div>
          </>
        ) : (
          <TemplatePreviewPanel
            template={formData.body}
            subject={formData.subject}
          />
        )}
      </div>

      <DialogFooter>
        <div className="flex items-center justify-between w-full">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.name || !formData.subject || !formData.body}
            >
              <Mail className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </div>
        </div>
      </DialogFooter>
    </>
  );
}
