"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable, ColumnDef, FilterDef } from "@/components/DataTable";
import { supportTickets, SupportTicket } from "@/data/support-tickets";
import { chatConversations, ChatConversation } from "@/data/chats";
import { knowledgeBaseArticles } from "@/data/knowledge-base";
import { announcements } from "@/data/announcements";
import {
  MessageSquare,
  Ticket,
  BookOpen,
  Megaphone,
  Plus,
  Eye,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";

type NewAnnouncement = {
  title: string;
  content: string;
  target: "All Facilities" | "Specific Facilities";
  priority: "Low" | "Normal" | "High";
};

export default function SupportPage() {
  const t = useTranslations("support");
  const [ticketsState] = useState(supportTickets);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null,
  );
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatConversation | null>(
    null,
  );
  const [newAnnouncement, setNewAnnouncement] = useState<NewAnnouncement>({
    title: "",
    content: "",
    target: "All Facilities",
    priority: "Normal",
  });
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] =
    useState(false);
  const [newMessage, setNewMessage] = useState("");

  const ticketColumns: ColumnDef<SupportTicket>[] = [
    {
      key: "id",
      label: "Ticket ID",
      icon: Ticket,
      defaultVisible: true,
    },
    {
      key: "title",
      label: "Title",
      icon: MessageSquare,
      defaultVisible: true,
    },
    {
      key: "status",
      label: "Status",
      icon: CheckCircle,
      defaultVisible: true,
      render: (ticket) => (
        <Badge
          variant={
            ticket.status === "Resolved" || ticket.status === "Closed"
              ? "default"
              : ticket.status === "In Progress"
                ? "secondary"
                : "outline"
          }
        >
          {ticket.status}
        </Badge>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      icon: AlertCircle,
      defaultVisible: true,
      render: (ticket) => (
        <Badge
          variant={
            ticket.priority === "Urgent"
              ? "destructive"
              : ticket.priority === "High"
                ? "destructive"
                : ticket.priority === "Medium"
                  ? "secondary"
                  : "outline"
          }
        >
          {ticket.priority}
        </Badge>
      ),
    },
    {
      key: "requester",
      label: "Requester",
      icon: Users,
      defaultVisible: true,
    },
    {
      key: "facility",
      label: "Facility",
      icon: MessageSquare,
      defaultVisible: true,
    },
    {
      key: "createdAt",
      label: "Created",
      icon: Clock,
      defaultVisible: true,
      render: (ticket) => new Date(ticket.createdAt).toLocaleDateString(),
    },
  ];

  const ticketFilters: FilterDef[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "all", label: "All Status" },
        { value: "Open", label: "Open" },
        { value: "In Progress", label: "In Progress" },
        { value: "Resolved", label: "Resolved" },
        { value: "Closed", label: "Closed" },
      ],
    },
    {
      key: "priority",
      label: "Priority",
      options: [
        { value: "all", label: "All Priorities" },
        { value: "Low", label: "Low" },
        { value: "Medium", label: "Medium" },
        { value: "High", label: "High" },
        { value: "Urgent", label: "Urgent" },
      ],
    },
  ];

  const handleCreateAnnouncement = () => {
    // Mock create announcement
    setNewAnnouncement({
      title: "",
      content: "",
      target: "All Facilities",
      priority: "Normal",
    });
    setIsAnnouncementDialogOpen(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Mock send message
      setNewMessage("");
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 pt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tickets" className="gap-2">
            <Ticket className="h-4 w-4" />
            Tickets ({ticketsState.length})
          </TabsTrigger>
          <TabsTrigger value="chat" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat ({chatConversations.length})
          </TabsTrigger>
          <TabsTrigger value="knowledge-base" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Knowledge Base ({knowledgeBaseArticles.length})
          </TabsTrigger>
          <TabsTrigger value="announcements" className="gap-2">
            <Megaphone className="h-4 w-4" />
            Announcements ({announcements.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="mt-4">
          <DataTable
            data={ticketsState}
            columns={ticketColumns}
            filters={ticketFilters}
            searchKey="title"
            searchPlaceholder="Search tickets..."
            itemsPerPage={10}
            actions={(ticket) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedTicket(ticket);
                  setIsTicketModalOpen(true);
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
          />
        </TabsContent>

        <TabsContent value="chat" className="mt-4">
          <div className="space-y-4">
            {chatConversations.map((chat) => (
              <Card key={chat.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {chat.participants.join(", ")}
                    </CardTitle>
                    <Badge
                      variant={
                        chat.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {chat.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {chat.facility} •{" "}
                    {new Date(chat.updatedAt).toLocaleString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">
                    Last message:{" "}
                    {chat.messages[chat.messages.length - 1]?.message}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedChat(chat)}
                  >
                    View Conversation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="knowledge-base" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {knowledgeBaseArticles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <Badge variant="outline">{article.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {article.content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.views} views</span>
                    <span>{article.helpful}% helpful</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Announcements</h3>
            <Dialog
              open={isAnnouncementDialogOpen}
              onOpenChange={setIsAnnouncementDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Announcement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Announcement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newAnnouncement.title}
                      onChange={(e) =>
                        setNewAnnouncement((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newAnnouncement.content}
                      onChange={(e) =>
                        setNewAnnouncement((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="target">Target</Label>
                      <Select
                        value={newAnnouncement.target}
                        onValueChange={(
                          value: "All Facilities" | "Specific Facilities",
                        ) =>
                          setNewAnnouncement((prev) => ({
                            ...prev,
                            target: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Facilities">
                            All Facilities
                          </SelectItem>
                          <SelectItem value="Specific Facilities">
                            Specific Facilities
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newAnnouncement.priority}
                        onValueChange={(value: "Low" | "Normal" | "High") =>
                          setNewAnnouncement((prev) => ({
                            ...prev,
                            priority: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleCreateAnnouncement} className="w-full">
                    Create Announcement
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {announcement.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          announcement.priority === "High"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {announcement.priority}
                      </Badge>
                      <Badge
                        variant={
                          announcement.status === "Published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {announcement.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {announcement.target} •{" "}
                    {new Date(announcement.createdAt).toLocaleString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Ticket Detail Modal */}
      <Dialog open={isTicketModalOpen} onOpenChange={setIsTicketModalOpen}>
        <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
          <div className="p-6 flex-1 overflow-y-auto">
            <DialogHeader className="mb-0">
              <DialogTitle className="sr-only">
                {selectedTicket?.title} - Ticket Details
              </DialogTitle>
            </DialogHeader>
            {selectedTicket && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedTicket.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTicket.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    Status:{" "}
                    <Badge
                      variant={
                        selectedTicket.status === "Resolved"
                          ? "default"
                          : "outline"
                      }
                    >
                      {selectedTicket.status}
                    </Badge>
                  </div>
                  <div>
                    Priority:{" "}
                    <Badge
                      variant={
                        selectedTicket.priority === "Urgent"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                  <div>Requester: {selectedTicket.requester}</div>
                  <div>Facility: {selectedTicket.facility}</div>
                  <div>
                    Created:{" "}
                    {new Date(selectedTicket.createdAt).toLocaleString()}
                  </div>
                  <div>
                    Assigned: {selectedTicket.assignedTo || "Unassigned"}
                  </div>
                </div>
                {selectedTicket.messages &&
                  selectedTicket.messages.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Messages</h4>
                      <div className="space-y-2">
                        {selectedTicket.messages.map((msg) => (
                          <Card key={msg.id}>
                            <CardContent className="pt-4">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium">
                                  {msg.sender}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(msg.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm">{msg.message}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Detail Modal */}
      <Dialog open={!!selectedChat} onOpenChange={() => setSelectedChat(null)}>
        <DialogContent className="min-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Chat Conversation</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Participants: {selectedChat?.participants.join(", ")}
            </p>
          </DialogHeader>
          {selectedChat && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-md">
                {selectedChat.messages.map((msg) => {
                  const isSupport =
                    msg.sender.includes("Support") ||
                    msg.sender.includes("Agent");
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isSupport ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isSupport
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-900 border"
                        }`}
                      >
                        {!isSupport && (
                          <div className="text-xs font-medium text-gray-500 mb-1">
                            {msg.sender}
                          </div>
                        )}
                        <p className="text-sm">{msg.message}</p>
                        <div
                          className={`text-xs mt-1 ${
                            isSupport ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center space-x-2 p-4 border-t">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
