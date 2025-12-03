import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const faqs = [
  {
    question: "How do I invest in bonds?",
    answer: "Navigate to the Bonds section from the sidebar, browse available bonds, select one you're interested in, and click 'Invest Now'. Complete the payment process to make your investment.",
  },
  {
    question: "What is the minimum investment amount?",
    answer: "Minimum investment varies by product. Bonds typically start at ₹10,000, Fixed Deposits from ₹5,000, and IPO investments depend on lot size. Check individual product pages for exact amounts.",
  },
  {
    question: "How do I track my investments?",
    answer: "Go to 'My Portfolio' from the dashboard sidebar. You'll see all your investments, current values, returns, and upcoming maturities in one place.",
  },
  {
    question: "When will I receive coupon/interest payments?",
    answer: "Coupon payments for bonds are credited as per the payment frequency (monthly/quarterly/annually). Check 'Transactions' for payment history and 'Portfolio' for upcoming payment dates.",
  },
  {
    question: "How do I complete KYC verification?",
    answer: "Go to 'KYC Status' from the sidebar. Upload your PAN card, Aadhaar, and bank statement. Verification typically completes within 24-48 hours.",
  },
  {
    question: "Can I withdraw my investment before maturity?",
    answer: "For FDs, premature withdrawal is possible with reduced interest rates. Bonds can be sold in the secondary market (feature coming soon). NPS has lock-in rules until retirement.",
  },
  {
    question: "How are my investments taxed?",
    answer: "Interest income is taxed as per your income tax slab. Capital gains on bonds held >3 years get indexation benefits. Download tax reports from the 'Reports' section.",
  },
  {
    question: "Is my investment safe?",
    answer: "All investments are held with registered custodians. We partner with SEBI-registered entities. However, investments are subject to market risks - please read all documents carefully.",
  },
];

const supportTickets = [
  { id: "TKT001", subject: "Investment query", status: "resolved", date: "2024-01-10" },
  { id: "TKT002", subject: "KYC verification delay", status: "in-progress", date: "2024-01-14" },
];

const DashboardHelp = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  const filteredFaqs = faqs.filter(
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Help & Support</h1>
        <p className="text-muted">Find answers or reach out to our support team</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="finease-card hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-secondary">Call Us</h3>
            <p className="text-sm text-muted mt-1">Mon-Sat, 9AM-6PM</p>
            <p className="text-primary font-medium mt-2">1800-123-4567</p>
          </CardContent>
        </Card>

        <Card className="finease-card hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-secondary">WhatsApp</h3>
            <p className="text-sm text-muted mt-1">Quick responses</p>
            <p className="text-green-600 font-medium mt-2">+91 98765 43210</p>
          </CardContent>
        </Card>

        <Card className="finease-card hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-3">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-secondary">Email</h3>
            <p className="text-sm text-muted mt-1">24-48 hour response</p>
            <p className="text-blue-600 font-medium mt-2">support@finease.com</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQs */}
        <Card className="finease-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-sm">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Raise Ticket */}
        <div className="space-y-6">
          <Card className="finease-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Raise a Support Ticket
              </CardTitle>
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

          {/* Previous Tickets */}
          <Card className="finease-card">
            <CardHeader>
              <CardTitle className="text-base">Your Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {supportTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-secondary text-sm">{ticket.subject}</p>
                      <p className="text-xs text-muted">
                        {ticket.id} • {new Date(ticket.date).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {ticket.status === "resolved" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-500" />
                      )}
                      <span
                        className={`text-xs ${
                          ticket.status === "resolved" ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {ticket.status === "resolved" ? "Resolved" : "In Progress"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Links */}
      <Card className="finease-card">
        <CardHeader>
          <CardTitle>Useful Links</CardTitle>
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
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                {link.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHelp;
