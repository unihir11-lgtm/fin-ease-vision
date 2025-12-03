import { kycStatus } from "@/data/mockData";
import { CheckCircle, Clock, FileText, Shield, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardKYC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary font-['Raleway']">KYC Status</h1>
        <p className="text-muted">View and manage your KYC verification</p>
      </div>

      {/* Overall Status */}
      <div className={`rounded-xl p-6 ${kycStatus.status === "Approved" ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}>
        <div className="flex items-center gap-4">
          {kycStatus.status === "Approved" ? (
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
          )}
          <div>
            <h2 className={`text-xl font-bold ${kycStatus.status === "Approved" ? "text-green-700" : "text-yellow-700"}`}>
              KYC {kycStatus.status}
            </h2>
            <p className={`${kycStatus.status === "Approved" ? "text-green-600" : "text-yellow-600"}`}>
              {kycStatus.status === "Approved"
                ? "Your identity has been verified. You can now invest in all products."
                : "Please complete your KYC verification to start investing."}
            </p>
          </div>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-bold text-secondary">Verification Details</h3>
        </div>
        <div className="divide-y divide-border">
          {/* PAN */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${kycStatus.panVerified ? "bg-green-100" : "bg-gray-100"}`}>
                <FileText className={`w-6 h-6 ${kycStatus.panVerified ? "text-green-600" : "text-muted"}`} />
              </div>
              <div>
                <p className="font-medium text-secondary">PAN Verification</p>
                <p className="text-sm text-muted">Permanent Account Number</p>
              </div>
            </div>
            {kycStatus.panVerified ? (
              <span className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4" />
                Verified
              </span>
            ) : (
              <Button size="sm">Verify Now</Button>
            )}
          </div>

          {/* Aadhaar */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${kycStatus.aadhaarVerified ? "bg-green-100" : "bg-gray-100"}`}>
                <Shield className={`w-6 h-6 ${kycStatus.aadhaarVerified ? "text-green-600" : "text-muted"}`} />
              </div>
              <div>
                <p className="font-medium text-secondary">Aadhaar Verification</p>
                <p className="text-sm text-muted">UIDAI Identity Verification</p>
              </div>
            </div>
            {kycStatus.aadhaarVerified ? (
              <span className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4" />
                Verified
              </span>
            ) : (
              <Button size="sm">Verify Now</Button>
            )}
          </div>

          {/* Bank */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${kycStatus.bankVerified ? "bg-green-100" : "bg-gray-100"}`}>
                <Upload className={`w-6 h-6 ${kycStatus.bankVerified ? "text-green-600" : "text-muted"}`} />
              </div>
              <div>
                <p className="font-medium text-secondary">Bank Account Verification</p>
                <p className="text-sm text-muted">Bank account linked for transactions</p>
              </div>
            </div>
            {kycStatus.bankVerified ? (
              <span className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4" />
                Verified
              </span>
            ) : (
              <Button size="sm">Verify Now</Button>
            )}
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl p-5 border border-border">
        <h3 className="font-bold text-secondary mb-4">Uploaded Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-secondary mb-1">PAN Card</p>
            <p className="text-xs text-muted mb-2">Uploaded on 15 Jan 2024</p>
            <Button variant="outline" size="sm" className="w-full">View</Button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-secondary mb-1">Aadhaar Card</p>
            <p className="text-xs text-muted mb-2">Uploaded on 15 Jan 2024</p>
            <Button variant="outline" size="sm" className="w-full">View</Button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-secondary mb-1">Bank Statement</p>
            <p className="text-xs text-muted mb-2">Uploaded on 16 Jan 2024</p>
            <Button variant="outline" size="sm" className="w-full">View</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardKYC;
