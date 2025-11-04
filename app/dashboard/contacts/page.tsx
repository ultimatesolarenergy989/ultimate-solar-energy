"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Search, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Filter, 
  X, 
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  MessageSquare,
  BarChart3,
  Eye,
  Send,
  Loader2,
} from "lucide-react";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  postCode: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  completed: number;
  thisWeek: number;
  thisMonth: number;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    contacted: 0,
    completed: 0,
    thisWeek: 0,
    thisMonth: 0,
  });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [contactToEmail, setContactToEmail] = useState<Contact | null>(null);
  const [emailSubject, setEmailSubject] = useState("Thank you for contacting Ultimate Solar Energy");
  const [emailMessage, setEmailMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailResponse, setEmailResponse] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts");
      const data = await response.json();

      if (response.ok) {
        setContacts(data);
        calculateStats(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false);
    }
  };

  const calculateStats = (contactData: Contact[]) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const newStats: Stats = {
      total: contactData.length,
      new: contactData.filter((c) => c.status === "new").length,
      contacted: contactData.filter((c) => c.status === "contacted").length,
      completed: contactData.filter((c) => c.status === "completed").length,
      thisWeek: contactData.filter(
        (c) => new Date(c.createdAt) >= oneWeekAgo
      ).length,
      thisMonth: contactData.filter(
        (c) => new Date(c.createdAt) >= oneMonthAgo
      ).length,
    };

    setStats(newStats);
  };

  const openDeleteModal = (contact: Contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  const openEmailModal = (contact: Contact) => {
    setContactToEmail(contact);
    setEmailSubject(`Regarding your inquiry`);
    setEmailMessage("");
    setEmailResponse(null);
    setShowEmailModal(true);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    setContactToEmail(null);
    setEmailMessage("");
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  const confirmDelete = async () => {
    if (!contactToDelete) return;

    try {
      const response = await fetch(`/api/contacts/${contactToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Contact deleted successfully!");
        fetchContacts();
        closeDeleteModal();
      } else {
        alert("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact");
    }
  };

  const sendEmailToContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactToEmail) return;

    try {
      setSendingEmail(true);
      setEmailResponse(null);
      const response = await fetch("/api/contacts/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId: contactToEmail.id,
          subject: emailSubject,
          message: emailMessage,
        }),
      });

      if (response.ok) {
        setEmailResponse({ success: true, message: "Email sent successfully." });
        setEmailMessage("");
      } else {
        const data = await response.json();
        setEmailResponse({ success: false, message: data.error || "Failed to send email." });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailResponse({ success: false, message: "An unexpected error occurred." });
    } finally {
      setSendingEmail(false);
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error("Error updating contact status:", error);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || contact.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-[#002866]">Contact Management</h1>
          <p className="text-gray-600 text-lg">
            Manage customer inquiries, track responses, and monitor engagement
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Contacts */}
        <div className="bg-gradient-to-br from-[#002866] to-[#003580] rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-[#FFD700]">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Users className="w-8 h-8" />
            </div>
            <TrendingUp className="w-6 h-6 text-[#FFD700]" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.total}</h3>
          <p className="text-white/80 text-sm uppercase tracking-wide">Total Inquiries</p>
        </div>

        {/* New Contacts */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <span className="text-2xl">🆕</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.new}</h3>
          <p className="text-gray-600 text-sm uppercase tracking-wide">New Inquiries</p>
        </div>

        {/* This Week */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#FFD700]">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <Clock className="w-8 h-8 text-[#FFD700]" />
            </div>
            <span className="text-2xl">📅</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.thisWeek}</h3>
          <p className="text-gray-600 text-sm uppercase tracking-wide">This Week</p>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.completed}</h3>
          <p className="text-gray-600 text-sm uppercase tracking-wide">Completed</p>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-[#FFD700] to-[#FDB714] rounded-xl p-6 mb-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-[#002866]" />
              <h4 className="font-bold text-[#002866] uppercase text-sm">This Month</h4>
            </div>
            <p className="text-3xl font-bold text-[#002866]">{stats.thisMonth}</p>
          </div>
          <div className="text-center border-x border-[#002866]/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Phone className="w-5 h-5 text-[#002866]" />
              <h4 className="font-bold text-[#002866] uppercase text-sm">In Progress</h4>
            </div>
            <p className="text-3xl font-bold text-[#002866]">{stats.contacted}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-[#002866]" />
              <h4 className="font-bold text-[#002866] uppercase text-sm">Success Rate</h4>
            </div>
            <p className="text-3xl font-bold text-[#002866]">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-t-4 border-[#002866]">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-[#002866]" />
          <h3 className="text-lg font-bold text-[#002866]">Search & Filter</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-[#FFD700]">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002866]"></div>
          </div>
        ) : filteredContacts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#002866] to-[#003580]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContacts.map((contact, index) => (
                  <tr 
                    key={contact.id} 
                    className="hover:bg-[#FFD700]/5 transition-all duration-200 cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs mt-1">
                          {contact.message.substring(0, 50)}...
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} className="text-gray-400" />
                          <a
                            href={`mailto:${contact.email}`}
                            className="hover:text-[#002866]"
                          >
                            {contact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} className="text-gray-400" />
                          <a href={`tel:${contact.phone}`} className="hover:text-[#002866]">
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-gray-400" />
                        <span>
                          {contact.state}, {contact.postCode}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer border-2 transition-all duration-200 ${
                          contact.status === "new"
                            ? "bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100"
                            : contact.status === "contacted"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                            : "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
                        }`}
                      >
                        <option value="new">🆕 New</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="completed">✅ Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(contact.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEmailModal(contact)}
                          className="p-2.5 bg-[#FDB714]/20 text-[#C68A00] hover:bg-[#FDB714] hover:text-[#002866] rounded-lg transition-all duration-200 border border-[#FDB714]/50"
                          title="Send Email"
                        >
                          <Send size={18} />
                        </button>
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="p-2.5 bg-[#002866] text-white hover:bg-[#FFD700] hover:text-[#002866] rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(contact)}
                          className="p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200 border border-red-200"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="text-gray-400" size={40} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter"
                : "No customer inquiries yet"}
            </p>
          </div>
        )}
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#002866] to-[#003580] text-white p-8 rounded-t-2xl border-b-4 border-[#FFD700]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-[#002866]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Contact Details</h3>
                    <p className="text-white/80 text-sm">
                      Received: {new Date(selectedContact.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-white hover:bg-white/20 rounded-full p-3 transition-all duration-200 hover:rotate-90"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Customer Name Section */}
              <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#FDB714]/10 rounded-xl p-6 border-l-4 border-[#FFD700]">
                <h4 className="text-sm font-bold text-[#002866] uppercase mb-3 flex items-center gap-2">
                  <Users size={16} />
                  Customer Information
                </h4>
                <p className="text-3xl font-bold text-[#002866]">
                  {selectedContact.firstName} {selectedContact.lastName}
                </p>
              </div>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-[#002866] transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-[#002866] p-2 rounded-lg">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                  </div>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-[#002866] hover:text-[#FFD700] font-semibold transition-colors text-lg"
                  >
                    {selectedContact.email}
                  </a>
                </div>

                <div className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-[#002866] transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-[#002866] p-2 rounded-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                  </div>
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="text-[#002866] hover:text-[#FFD700] font-semibold transition-colors text-lg"
                  >
                    {selectedContact.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white border-2 border-gray-100 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#002866] p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Location</label>
                </div>
                <p className="text-gray-900 font-semibold text-lg">
                  {selectedContact.state}, {selectedContact.postCode}
                </p>
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#002866] p-2 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <label className="text-sm font-bold text-[#002866] uppercase">Customer Message</label>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-[#FFD700]">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Current Status</label>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                    selectedContact.status === "new"
                      ? "bg-blue-100 text-blue-700"
                      : selectedContact.status === "contacted"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {selectedContact.status === "new" && "🆕 New Inquiry"}
                    {selectedContact.status === "contacted" && "📞 Contacted"}
                    {selectedContact.status === "completed" && "✅ Completed"}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="px-6 py-3 bg-[#002866] text-white font-bold rounded-lg hover:bg-[#FFD700] hover:text-[#002866] transition-all duration-300 shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && contactToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fadeIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="text-red-600" size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Delete Contact?</h3>
                  <p className="text-red-100 text-sm">This action is permanent</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-4 text-lg">
                Are you sure you want to permanently delete this contact inquiry?
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-lg">
                <p className="font-bold text-red-900 mb-2 text-sm uppercase">Contact Details:</p>
                <p className="text-gray-900 font-semibold text-lg">
                  {contactToDelete.firstName} {contactToDelete.lastName}
                </p>
                <p className="text-gray-600 mt-1">{contactToDelete.email}</p>
                <p className="text-gray-600">{contactToDelete.phone}</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-4">
                <p className="text-sm text-yellow-800 flex items-start gap-2">
                  <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Warning:</strong> All data including the message will be permanently deleted from the database.
                  </span>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex gap-3">
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && contactToEmail && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-fadeIn overflow-hidden">
            <div className="bg-gradient-to-r from-[#002866] to-[#003580] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#FFD700]">
              <div>
                <h3 className="text-2xl font-bold">Send Email</h3>
                <p className="text-white/80 text-sm">
                  To: {contactToEmail.firstName} {contactToEmail.lastName} ({contactToEmail.email})
                </p>
              </div>
              <button
                onClick={closeEmailModal}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={sendEmailToContact} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#002866] mb-2">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#002866] mb-2">Message</label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] resize-none"
                  placeholder="Write your email here..."
                ></textarea>
              </div>

              {emailResponse && (
                <div
                  className={`p-4 rounded-lg text-sm font-semibold ${
                    emailResponse.success
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {emailResponse.message}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={closeEmailModal}
                  className="px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingEmail}
                  className="px-6 py-3 bg-[#002866] text-white rounded-lg hover:bg-[#003580] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-60"
                >
                  {sendingEmail ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Email
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

