import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Search,
  ExternalLink,
  Send,
  Clock,
  CheckCircle,
  Headphones,
  Book,
  Video,
  ChevronRight,
  ArrowUpRight,
  Ticket,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I invest in bonds?",
        answer: "Navigate to the Bonds section from the sidebar, browse available bonds, select one you're interested in, and click 'Invest Now'. Complete the payment process to make your investment.",
      },
      {
        question: "What is the minimum investment amount?",
        answer: "Minimum investment varies by product. Bonds typically start at ₹10,000, Fixed Deposits from ₹5,000, and IPO investments depend on lot size. Check individual product pages for exact amounts.",
      },
    ]
  },
  {
    category: "Investments",
    questions: [
      {
        question: "How do I track my investments?",
        answer: "Go to 'My Portfolio' from the dashboard sidebar. You'll see all your investments, current values, returns, and upcoming maturities in one place.",
      },
      {
        question: "When will I receive coupon/interest payments?",
        answer: "Coupon payments for bonds are credited as per the payment frequency (monthly/quarterly/annually). Check 'Transactions' for payment history and 'Portfolio' for upcoming payment dates.",
      },
      {
        question: "Can I withdraw my investment before maturity?",
        answer: "For FDs, premature withdrawal is possible with reduced interest rates. Bonds can be sold in the secondary market (feature coming soon). NPS has lock-in rules until retirement.",
      },
    ]
  },
  {
    category: "KYC & Account",
    questions: [
      {
        question: "How do I complete KYC verification?",
        answer: "Go to 'KYC Status' from the sidebar. Upload your PAN card, Aadhaar, and bank statement. Verification typically completes within 24-48 hours.",
      },
      {
        question: "How are my investments taxed?",
        answer: "Interest income is taxed as per your income tax slab. Capital gains on bonds held >3 years get indexation benefits. Download tax reports from the 'Reports' section.",
      },
      {
        question: "Is my investment safe?",
        answer: "All investments are held with registered custodians. We partner with SEBI-registered entities. However, investments are subject to market risks - please read all documents carefully.",
      },
    ]
  },
];

const supportTickets = [
  { id: "TKT-2024-001", subject: "Investment query regarding bond maturity", status: "resolved", date: "2024-01-10", priority: "medium" },
  { id: "TKT-2024-002", subject: "KYC verification delay", status: "in-progress", date: "2024-01-14", priority: "high" },
  { id: "TKT-2024-003", subject: "Portfolio value not updating", status: "open", date: "2024-01-15", priority: "low" },
];

const resources = [
  { icon: Book, title: "User Guide", desc: "Complete platform walkthrough", link: "#" },
  { icon: Video, title: "Video Tutorials", desc: "Step-by-step video guides", link: "#" },
  { icon: FileText, title: "Investment Glossary", desc: "Financial terms explained", link: "#" },
  { icon: HelpCircle, title: "FAQs", desc: "Common questions answered", link: "#" },
];

const DashboardHelp = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketPriority, setTicketPriority] = useState("medium");

  const allFaqs = faqs.flatMap(cat => cat.questions);
  const filteredFaqs = allFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = () => {
    if (!ticketSubject || !ticketMessage) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Ticket Submitted",
      description: "We'll get back to you within 24 hours.",
    });
    setTicketSubject("");
    setTicketMessage("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary via-secondary/95 to-primary/80 p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Help & Support</h1>
            </div>
            <p className="text-white/80">Find answers to your questions or reach out to our support team</p>
          </div>
          
          <div className="flex gap-3">
            <Button className="bg-white text-secondary hover:bg-white/90 shadow-lg">
              <MessageSquare className="w-4 h-4 mr-2" />
              Live Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover-lift border-0 shadow-sm group cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-secondary">Call Us</h3>
                <p className="text-sm text-muted-foreground">Mon-Sat, 9AM-6PM</p>
                <p className="text-primary font-bold mt-1">1800-123-4567</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-0 shadow-sm group cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-green-100 group-hover:bg-green-200 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-secondary">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">Quick responses</p>
                <p className="text-green-600 font-bold mt-1">+91 98765 43210</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-0 shadow-sm group cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-secondary">Email</h3>
                <p className="text-sm text-muted-foreground">24-48 hour response</p>
                <p className="text-blue-600 font-bold mt-1">support@finease.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="faq" className="data-[state=active]:bg-white gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="tickets" className="data-[state=active]:bg-white gap-2">
            <Ticket className="w-4 h-4" />
            My Tickets
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-white gap-2">
            <Book className="w-4 h-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Search */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search frequently asked questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 text-base border-0 bg-muted/50"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* FAQs by Category */}
              {searchQuery ? (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Search Results</CardTitle>
                    <CardDescription>{filteredFaqs.length} results found</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFaqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                          <AccordionTrigger className="text-left hover:no-underline py-4 text-secondary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ) : (
                faqs.map((category, catIndex) => (
                  <Card key={catIndex} className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${catIndex}-${index}`} className="border-b last:border-0">
                            <AccordionTrigger className="text-left hover:no-underline py-4 text-secondary text-sm">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-sm pb-4">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Raise Ticket Form */}
            <div className="space-y-6">
              <Card className="border-0 shadow-sm sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Raise a Ticket
                  </CardTitle>
                  <CardDescription>Can't find what you're looking for?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input
                      placeholder="Brief description of your issue"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <div className="flex gap-2">
                      {["low", "medium", "high"].map((p) => (
                        <button
                          key={p}
                          onClick={() => setTicketPriority(p)}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${
                            ticketPriority === p
                              ? p === "high" ? "bg-red-100 text-red-700" :
                                p === "medium" ? "bg-amber-100 text-amber-700" :
                                "bg-green-100 text-green-700"
                              : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea
                      placeholder="Describe your issue in detail..."
                      rows={4}
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                    />
                  </div>
                  <Button className="finease-btn w-full" onClick={handleSubmitTicket}>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tickets Tab */}
        <TabsContent value="tickets" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-primary" />
                    Your Support Tickets
                  </CardTitle>
                  <CardDescription>Track your support requests</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        ticket.status === "resolved" ? "bg-green-100" :
                        ticket.status === "in-progress" ? "bg-amber-100" :
                        "bg-blue-100"
                      }`}>
                        {ticket.status === "resolved" ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : ticket.status === "in-progress" ? (
                          <Clock className="w-5 h-5 text-amber-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{ticket.subject}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">{ticket.id}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(ticket.date).toLocaleDateString("en-IN", { 
                              day: "numeric", 
                              month: "short", 
                              year: "numeric" 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`text-xs ${
                        ticket.priority === "high" ? "border-red-200 text-red-600" :
                        ticket.priority === "medium" ? "border-amber-200 text-amber-600" :
                        "border-green-200 text-green-600"
                      }`}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={`${
                        ticket.status === "resolved" ? "bg-green-100 text-green-700" :
                        ticket.status === "in-progress" ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {ticket.status === "in-progress" ? "In Progress" : 
                         ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource, i) => (
              <Card key={i} className="hover-lift border-0 shadow-sm cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mx-auto mb-4 transition-colors">
                    <resource.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="font-bold text-secondary mb-1">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{resource.desc}</p>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Learn More <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Links */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Useful Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Terms of Service", href: "#" },
                  { label: "Privacy Policy", href: "#" },
                  { label: "Risk Disclosure", href: "#" },
                  { label: "Grievance Redressal", href: "#" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group"
                  >
                    <span className="text-sm text-secondary font-medium">{link.label}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardHelp;