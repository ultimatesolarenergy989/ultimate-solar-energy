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
  BarChart3,
  Eye,
  Send,
  Loader2,
  ShoppingCart,
  Package,
} from "lucide-react";

interface Quotation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state?: string;
  postCode: string;
  lookingFor: string;
  categories: string[];
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

// Helper function to format lookingFor value for display
function formatLookingFor(value: string): string {
  const formatMap: { [key: string]: string } = {
    "solar-panels": "Solar Panels",
    "solar-battery": "Solar Battery",
    "ev-charger": "EV Charger",
    "heat-pump": "Heat Pump",
    "air-conditioning": "Air Conditioning",
    "other": "Other",
  };
  return formatMap[value] || value;
}

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quotationToDelete, setQuotationToDelete] = useState<Quotation | null>(null);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    contacted: 0,
    completed: 0,
    thisWeek: 0,
    thisMonth: 0,
  });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [quotationToEmail, setQuotationToEmail] = useState<Quotation | null>(null);
  const [emailSubject, setEmailSubject] = useState("Your Solar Energy Quote");
  const [emailMessage, setEmailMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailResponse, setEmailResponse] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const response = await fetch("/api/quotations");
      const data = await response.json();

      if (response.ok) {
        setQuotations(data);
        calculateStats(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quotations:", error);
      setLoading(false);
    }
  };

  const calculateStats = (quotationData: Quotation[]) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const newStats: Stats = {
      total: quotationData.length,
      new: quotationData.filter((q) => q.status === "new").length,
      contacted: quotationData.filter((q) => q.status === "contacted").length,
      completed: quotationData.filter((q) => q.status === "completed").length,
      thisWeek: quotationData.filter(
        (q) => new Date(q.createdAt) >= oneWeekAgo
      ).length,
      thisMonth: quotationData.filter(
        (q) => new Date(q.createdAt) >= oneMonthAgo
      ).length,
    };

    setStats(newStats);
  };

  const filteredQuotations = quotations.filter((quotation) => {
    const matchesSearch =
      quotation.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.phone.includes(searchTerm) ||
      formatLookingFor(quotation.lookingFor).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || quotation.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const openDeleteModal = (quotation: Quotation) => {
    setQuotationToDelete(quotation);
    setShowDeleteModal(true);
  };

  const openEmailModal = (quotation: Quotation) => {
    setQuotationToEmail(quotation);
    setEmailSubject(`Your ${formatLookingFor(quotation.lookingFor)} Quote`);
    setEmailMessage("");
    setEmailResponse(null);
    setShowEmailModal(true);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    setQuotationToEmail(null);
    setEmailMessage("");
  };

  const deleteQuotation = async () => {
    if (!quotationToDelete) return;

    try {
      const response = await fetch(`/api/quotations/${quotationToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setQuotations(
          quotations.filter((q) => q.id !== quotationToDelete.id)
        );
        setShowDeleteModal(false);
        setQuotationToDelete(null);
        // Recalculate stats
        calculateStats(quotations.filter((q) => q.id !== quotationToDelete.id));
      }
    } catch (error) {
      console.error("Error deleting quotation:", error);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/quotations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setQuotations(
          quotations.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
        );
        // Recalculate stats
        calculateStats(
          quotations.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
        );
        // Update selected quotation if it's open
        if (selectedQuotation && selectedQuotation.id === id) {
          setSelectedQuotation({ ...selectedQuotation, status: newStatus });
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const sendEmailToQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quotationToEmail) return;

    try {
      setSendingEmail(true);
      setEmailResponse(null);
      const response = await fetch("/api/quotations/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quotationId: quotationToEmail.id,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "contacted":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#002866] mb-2">Quote Requests</h1>
        <p className="text-gray-600">Manage and respond to customer quote requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#002866]">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-[#002866]" size={28} />
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-[#002866]">{stats.total}</p>
          <p className="text-gray-600 text-sm font-medium">Total Requests</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <Mail className="text-blue-500" size={28} />
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
              NEW
            </span>
          </div>
          <p className="text-3xl font-bold text-[#002866]">{stats.new}</p>
          <p className="text-gray-600 text-sm font-medium">New Requests</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FFD700]">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-[#FFD700]" size={28} />
            <Calendar className="text-gray-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-[#002866]">{stats.thisWeek}</p>
          <p className="text-gray-600 text-sm font-medium">This Week</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="text-green-500" size={28} />
            <BarChart3 className="text-gray-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-[#002866]">{stats.completed}</p>
          <p className="text-gray-600 text-sm font-medium">Completed</p>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-[#002866] to-[#003580] rounded-lg p-6 mb-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-white/80 text-sm mb-1">This Month</p>
            <p className="text-3xl font-bold text-white">{stats.thisMonth}</p>
          </div>
          <div className="text-center border-x-0 md:border-x border-white/20">
            <p className="text-white/80 text-sm mb-1">In Progress</p>
            <p className="text-3xl font-bold text-[#FFD700]">{stats.contacted}</p>
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm mb-1">Success Rate</p>
            <p className="text-3xl font-bold text-white">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, phone, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] bg-white"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002866]"></div>
          </div>
        ) : filteredQuotations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-[#002866] to-[#003580]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuotations.map((quotation) => (
                  <tr key={quotation.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {quotation.firstName} {quotation.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{quotation.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-gray-900">{quotation.phone}</p>
                        <p className="text-sm text-gray-500">
                          {quotation.state ? `${quotation.state}, ${quotation.postCode}` : quotation.postCode}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Package className="text-[#002866]" size={16} />
                        <span className="text-sm font-medium text-gray-900">
                          {formatLookingFor(quotation.lookingFor)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {quotation.categories.join(", ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={quotation.status}
                        onChange={(e) => updateStatus(quotation.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          quotation.status
                        )} cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#002866]`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(quotation.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEmailModal(quotation)}
                          className="p-2.5 bg-[#FDB714]/20 text-[#C68A00] hover:bg-[#FDB714] hover:text-[#002866] rounded-lg transition-all duration-200 border border-[#FDB714]/50"
                          title="Send Email"
                        >
                          <Send size={18} />
                        </button>
                        <button
                          onClick={() => setSelectedQuotation(quotation)}
                          className="p-2.5 bg-[#002866] text-white hover:bg-[#FFD700] hover:text-[#002866] rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(quotation)}
                          className="p-2.5 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
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
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No quote requests found</h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter"
                : "Quote requests will appear here when customers submit them"}
            </p>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedQuotation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full animate-fadeIn overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#002866] to-[#003580] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#FFD700]">
              <div>
                <h3 className="text-2xl font-bold">Quote Request Details</h3>
                <p className="text-white/80 text-sm">
                  Request ID: {selectedQuotation.id.substring(0, 8)}...
                </p>
              </div>
              <button
                onClick={() => setSelectedQuotation(null)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h4 className="text-lg font-bold text-[#002866] mb-4 flex items-center gap-2">
                  <Users size={20} />
                  Customer Information
                </h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p className="font-semibold text-gray-900">
                      {selectedQuotation.firstName} {selectedQuotation.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a
                      href={`mailto:${selectedQuotation.email}`}
                      className="font-semibold text-[#002866] hover:underline flex items-center gap-2"
                    >
                      <Mail size={16} />
                      {selectedQuotation.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <a
                      href={`tel:${selectedQuotation.phone}`}
                      className="font-semibold text-[#002866] hover:underline flex items-center gap-2"
                    >
                      <Phone size={16} />
                      {selectedQuotation.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin size={16} />
                      {selectedQuotation.state
                        ? `${selectedQuotation.state}, ${selectedQuotation.postCode}`
                        : selectedQuotation.postCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote Information */}
              <div>
                <h4 className="text-lg font-bold text-[#002866] mb-4 flex items-center gap-2">
                  <Package size={20} />
                  Quote Information
                </h4>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#FDB714]/10 border-l-4 border-[#FFD700] p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Looking For</p>
                    <p className="font-bold text-[#002866] text-lg">
                      {formatLookingFor(selectedQuotation.lookingFor)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Category</p>
                    <div className="flex gap-2">
                      {selectedQuotation.categories.map((category) => (
                        <span
                          key={category}
                          className="px-3 py-1 bg-[#002866] text-white rounded-full text-sm font-semibold"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Date */}
              <div>
                <h4 className="text-lg font-bold text-[#002866] mb-4 flex items-center gap-2">
                  <BarChart3 size={20} />
                  Status & Timeline
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-2">Current Status</p>
                    <select
                      value={selectedQuotation.status}
                      onChange={(e) => {
                        updateStatus(selectedQuotation.id, e.target.value);
                        setSelectedQuotation({
                          ...selectedQuotation,
                          status: e.target.value,
                        });
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(
                        selectedQuotation.status
                      )} cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#002866]`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-2">Submitted On</p>
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(selectedQuotation.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3 border-t border-gray-100 pt-4">
                <button
                  onClick={() => {
                    openEmailModal(selectedQuotation);
                    setSelectedQuotation(null);
                  }}
                  className="flex-1 px-4 py-3 bg-[#002866] text-white rounded-lg hover:bg-[#003580] transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Email
                </button>
                <button
                  onClick={() => setSelectedQuotation(null)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && quotationToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fadeIn overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-5">
              <div className="flex items-center gap-3">
                <AlertTriangle size={28} />
                <h3 className="text-2xl font-bold">Confirm Deletion</h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete the quote request from{" "}
                <strong className="text-[#002866]">
                  {quotationToDelete.firstName} {quotationToDelete.lastName}
                </strong>
                ? This action cannot be undone.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
                <p className="text-red-700 text-sm font-semibold">
                  ⚠️ This will permanently remove all quote data and cannot be recovered.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setQuotationToDelete(null);
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteQuotation}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && quotationToEmail && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-fadeIn overflow-hidden">
            <div className="bg-gradient-to-r from-[#002866] to-[#003580] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#FFD700]">
              <div>
                <h3 className="text-2xl font-bold">Send Email</h3>
                <p className="text-white/80 text-sm">
                  To: {quotationToEmail.firstName} {quotationToEmail.lastName} ({quotationToEmail.email})
                </p>
              </div>
              <button
                onClick={closeEmailModal}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={sendEmailToQuotation} className="p-6 space-y-5">
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

