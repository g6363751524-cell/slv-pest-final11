import React, { useState, useEffect, useRef } from 'react';
import {
  Folder,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  File,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  RefreshCw,
  FolderPlus,
  Shield,
  HardDrive,
  FileCheck2,
  AlertTriangle,
  ChevronRight,
  LogOut,
  CheckCircle2,
  X,
  FilePlus,
} from 'lucide-react';
import type { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from '../lib/firebaseAuth';
import {
  listDriveFiles,
  uploadFileToDrive,
  createDriveFolder,
  deleteDriveFile,
  saveInspectionReportToDrive,
  getDriveAbout,
  type DriveFile,
  type DriveAbout,
} from '../lib/googleDriveApi';

export const GoogleDrivePortal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aboutInfo, setAboutInfo] = useState<DriveAbout | null>(null);

  // File explorer states
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(undefined);
  const [folderBreadcrumbs, setFolderBreadcrumbs] = useState<Array<{ id?: string; name: string }>>([
    { id: undefined, name: 'My Drive' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mimeTypeFilter, setMimeTypeFilter] = useState<'all' | 'folders' | 'images' | 'documents'>('all');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Modals
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportFormData, setReportFormData] = useState({
    propertyAddress: 'Villa 42, Prestige Green Woods, Hebbal, Bangalore',
    pestTarget: 'Cockroach & Termite Prevention',
    technicianName: 'Suresh Kumar (Certified SLV Technician)',
    treatmentType: 'Odorless Gel Baiting & Anti-Termite Barrier Spray',
    observations: 'Active German cockroach harborage behind modular kitchen sink. Subterranean termite runways identified along skirting perimeter.',
    recommendation: 'Scheduled follow-up inspection in 21 days. Moisture seal applied around drainage pipes.',
  });

  // Destructive Action Modal (MANDATORY per Google Workspace Skill guidelines)
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        if (currentToken) {
          setToken(currentToken);
          setNeedsAuth(false);
        } else {
          // User session exists, but access token was not in memory (page refreshed)
          setNeedsAuth(true);
        }
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );

    return () => unsubscribe();
  }, []);

  // Fetch files when token or folder changes
  useEffect(() => {
    if (token) {
      loadFiles(token, currentFolderId, searchQuery, mimeTypeFilter);
      loadAbout(token);
    }
  }, [token, currentFolderId, mimeTypeFilter]);

  const loadAbout = async (authToken: string) => {
    try {
      const data = await getDriveAbout(authToken);
      setAboutInfo(data);
    } catch {
      // Non-critical, ignore
    }
  };

  const loadFiles = async (
    authToken: string,
    folderId?: string,
    query?: string,
    typeFilter?: string
  ) => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const result = await listDriveFiles(authToken, {
        folderId,
        searchQuery: query,
        mimeTypeFilter: typeFilter === 'all' ? undefined : typeFilter,
        pageSize: 40,
      });
      setFiles(result.files);
    } catch (err: any) {
      console.error('Error fetching files:', err);
      if (err.message && err.message.includes('401')) {
        setStatusMessage({ text: 'Session expired. Please sign in again to refresh Google Drive access.', type: 'error' });
        setNeedsAuth(true);
      } else {
        setStatusMessage({ text: err.message || 'Failed to load files from Google Drive.', type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setStatusMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        setStatusMessage({ text: 'Google Drive connected successfully!', type: 'success' });
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setStatusMessage({ text: err.message || 'Google Sign-in failed. Please try again.', type: 'error' });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setNeedsAuth(true);
    setFiles([]);
    setFolderBreadcrumbs([{ id: undefined, name: 'My Drive' }]);
    setCurrentFolderId(undefined);
    setStatusMessage({ text: 'Signed out from Google Drive.', type: 'info' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      loadFiles(token, currentFolderId, searchQuery, mimeTypeFilter);
    }
  };

  const navigateToFolder = (folder: DriveFile) => {
    setCurrentFolderId(folder.id);
    setFolderBreadcrumbs((prev) => [...prev, { id: folder.id, name: folder.name }]);
  };

  const navigateToBreadcrumb = (index: number) => {
    const target = folderBreadcrumbs[index];
    setFolderBreadcrumbs((prev) => prev.slice(0, index + 1));
    setCurrentFolderId(target.id);
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newFolderName.trim()) return;

    try {
      setLoading(true);
      const created = await createDriveFolder(token, newFolderName.trim(), currentFolderId);
      setIsFolderModalOpen(false);
      setNewFolderName('');
      setStatusMessage({ text: `Folder "${created.name}" created successfully.`, type: 'success' });
      await loadFiles(token, currentFolderId, searchQuery, mimeTypeFilter);
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Failed to create folder.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0 || !token) return;

    const file = uploadedFiles[0];
    try {
      setLoading(true);
      setStatusMessage({ text: `Uploading "${file.name}" to Google Drive...`, type: 'info' });
      const uploaded = await uploadFileToDrive(token, file, currentFolderId);
      setStatusMessage({ text: `File "${uploaded.name}" uploaded successfully to Google Drive!`, type: 'success' });
      await loadFiles(token, currentFolderId, searchQuery, mimeTypeFilter);
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'File upload failed.', type: 'error' });
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const timestamp = new Date().toISOString().slice(0, 10);
    const fileName = `SLV-Inspection-Report-${timestamp}.md`;

    const markdownContent = `# SLV Pest Control Service & Inspection Certificate
**Generated via SLV Pest Control Drive Portal**
**Date:** ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
**Reference ID:** SLV-${Math.floor(100000 + Math.random() * 900000)}

---

## 1. Property & Client Details
- **Service Address:** ${reportFormData.propertyAddress}
- **Assigned Technician:** ${reportFormData.technicianName}
- **Target Pest Category:** ${reportFormData.pestTarget}

---

## 2. Treatment & Inspection Report
- **Treatment Administered:** ${reportFormData.treatmentType}
- **Field Observations:**
${reportFormData.observations}

---

## 3. Preventive Action & Recommendations
${reportFormData.recommendation}

---

## 4. Safety & Compliance Verification
- **Chemical Formulation:** Government Central Insecticides Board (CIB) registered odorless botanical & micro-encapsulated formulations.
- **Safety Standard:** Non-toxic to household members, children, and pets when applied per protocols.
- **Support Hotline:** 91803 97822 | contact@slvpestcontrol.com
- **Headquarters:** 143 Soundarya Layout, Doddabidarakallu, Bangalore 560073
`;

    try {
      setLoading(true);
      const saved = await saveInspectionReportToDrive(token, fileName, markdownContent, currentFolderId);
      setIsReportModalOpen(false);
      setStatusMessage({ text: `Inspection Report "${saved.name}" saved directly to your Google Drive!`, type: 'success' });
      await loadFiles(token, currentFolderId, searchQuery, mimeTypeFilter);
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Failed to save report to Google Drive.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // MANDATORY USER CONFIRMATION for destructive deletion
  const executeDeleteFile = async () => {
    if (!token || !deleteConfirmTarget) return;

    try {
      setIsDeleting(true);
      await deleteDriveFile(token, deleteConfirmTarget.id);
      setStatusMessage({
        text: `"${deleteConfirmTarget.name}" has been permanently removed from Google Drive.`,
        type: 'success',
      });
      setDeleteConfirmTarget(null);
      await loadFiles(token, currentFolderId, searchQuery, mimeTypeFilter);
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Failed to delete file.', type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes?: string) => {
    if (!bytes) return '--';
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return '--';
    if (num < 1024) return `${num} B`;
    if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
    return `${(num / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (file: DriveFile) => {
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      return <Folder className="w-5 h-5 text-[#F6C453]" />;
    }
    if (file.mimeType.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5 text-emerald-400" />;
    }
    if (file.mimeType.includes('pdf')) {
      return <FileText className="w-5 h-5 text-red-400" />;
    }
    if (file.mimeType.includes('sheet') || file.mimeType.includes('spreadsheet')) {
      return <FileSpreadsheet className="w-5 h-5 text-green-400" />;
    }
    return <File className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <div className="w-full">
      {/* Top Banner & Status message */}
      {statusMessage && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center justify-between text-sm ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              : statusMessage.type === 'error'
              ? 'bg-red-950/40 border-red-500/30 text-red-300'
              : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300'
          }`}
        >
          <div className="flex items-center gap-3">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : statusMessage.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 shrink-0" />
            ) : (
              <Shield className="w-5 h-5 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-zinc-400 hover:text-white p-1 rounded-md transition"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* When Needs Authentication or Not Signed In */}
      {(!user || needsAuth || !token) ? (
        <div className="relative rounded-3xl border border-white/[0.08] bg-[#0c0e12]/80 backdrop-blur-xl p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#F6C453]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F6C453]/20 via-[#0c0e12] to-cyan-500/20 border border-[#F6C453]/30 mx-auto flex items-center justify-center shadow-lg">
              <HardDrive className="w-8 h-8 text-[#F6C453]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Connect Google Drive Portal
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Seamlessly store, access, and manage pest control inspection certificates, infestation site photos, treatment audit documents, and AMC warranty agreements directly in your Google Drive.
              </p>
            </div>

            {/* Feature points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <FileCheck2 className="w-4 h-4 text-[#F6C453] mb-2" />
                <h4 className="text-xs font-bold text-white mb-0.5">Audit Certificates</h4>
                <p className="text-[11px] text-zinc-400">Generate verified treatment reports saved directly to Drive.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <ImageIcon className="w-4 h-4 text-cyan-400 mb-2" />
                <h4 className="text-xs font-bold text-white mb-0.5">Infestation Photos</h4>
                <p className="text-[11px] text-zinc-400">Upload before-and-after treatment photos securely.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <Shield className="w-4 h-4 text-emerald-400 mb-2" />
                <h4 className="text-xs font-bold text-white mb-0.5">Full Privacy</h4>
                <p className="text-[11px] text-zinc-400">In-memory tokens only. We never sell or store your files.</p>
              </div>
            </div>

            {/* Official Google Material Sign-In Button */}
            <div className="pt-4 flex flex-col items-center gap-3">
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="gsi-material-button relative inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white text-zinc-800 hover:bg-zinc-100 font-semibold text-sm transition-all shadow-xl hover:shadow-cyan-500/10 cursor-pointer disabled:opacity-50"
              >
                <div className="gsi-material-button-icon">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-5 h-5 block"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </div>
                <span>{isLoggingIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
              </button>
              <p className="text-[11px] text-zinc-500">
                Grants read & write access to Google Drive files with user permission.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated File Explorer */
        <div className="space-y-6">
          {/* User Bar & Storage Quick Stats */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e12]/80 backdrop-blur-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-11 h-11 rounded-full border border-[#F6C453]/40 object-cover"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F6C453] to-amber-600 flex items-center justify-center text-black font-bold text-sm">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-sm sm:text-base">
                    {user.displayName || 'Google Account'}
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Drive Active
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">{user.email}</p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center flex-wrap gap-2.5 w-full md:w-auto">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#F6C453] to-amber-500 hover:from-[#f8d070] hover:to-amber-400 text-black font-bold text-xs shadow-md transition cursor-pointer"
              >
                <FilePlus className="w-3.5 h-3.5" />
                <span>New Inspection Report</span>
              </button>

              <button
                onClick={() => setIsFolderModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-white font-medium text-xs border border-white/10 transition cursor-pointer"
              >
                <FolderPlus className="w-3.5 h-3.5 text-[#F6C453]" />
                <span>New Folder</span>
              </button>

              <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 font-medium text-xs border border-cyan-500/30 transition cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => token && loadFiles(token, currentFolderId, searchQuery, mimeTypeFilter)}
                className="p-2 rounded-xl bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-300 hover:text-white border border-white/10 transition cursor-pointer"
                title="Refresh Drive files"
                aria-label="Refresh files"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#F6C453]' : ''}`} />
              </button>

              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-red-950/20 hover:bg-red-900/30 text-red-400 border border-red-500/20 transition cursor-pointer"
                title="Disconnect Google Drive"
                aria-label="Disconnect Google Drive"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search, Filter & Breadcrumbs */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e12]/80 backdrop-blur-xl p-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Breadcrumb Trail */}
              <div className="flex items-center gap-1 text-xs overflow-x-auto py-1 text-zinc-400">
                {folderBreadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={crumb.id || 'root'}>
                    {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />}
                    <button
                      onClick={() => navigateToBreadcrumb(idx)}
                      className={`hover:text-white transition whitespace-nowrap ${
                        idx === folderBreadcrumbs.length - 1
                          ? 'font-bold text-[#F6C453]'
                          : 'text-zinc-400'
                      }`}
                    >
                      {crumb.name}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                {(['all', 'folders', 'images', 'documents'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setMimeTypeFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg font-medium capitalize transition cursor-pointer ${
                      mimeTypeFilter === filter
                        ? 'bg-[#F6C453] text-black font-bold shadow-sm'
                        : 'bg-zinc-800/60 text-zinc-400 hover:text-white hover:bg-zinc-700/60'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search files or reports in Google Drive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 border border-white/10 rounded-xl pl-10 pr-24 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F6C453] transition"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#F6C453] text-black font-bold text-xs rounded-lg hover:bg-[#f8d070] transition cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Files Grid / List */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e12]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
            {loading && files.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-[#F6C453] animate-spin mx-auto" />
                <p className="text-zinc-400 text-sm">Accessing files from Google Drive...</p>
              </div>
            ) : files.length === 0 ? (
              <div className="py-20 text-center space-y-4 px-4">
                <Folder className="w-12 h-12 text-zinc-600 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-white font-bold text-base">No files found</h4>
                  <p className="text-zinc-500 text-xs max-w-sm mx-auto">
                    This folder is empty or no files matched your search. Upload infestation photos or generate an SLV inspection report above!
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#F6C453] text-black text-xs font-bold hover:bg-[#f8d070] transition"
                  >
                    Generate Report
                  </button>
                  <label className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-xs font-medium hover:bg-zinc-700 transition cursor-pointer">
                    Upload Photos
                    <input type="file" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.05]">
                {/* Header row */}
                <div className="grid grid-cols-12 gap-3 px-5 py-3 text-[11px] font-semibold text-zinc-400 bg-white/[0.02]">
                  <div className="col-span-6 sm:col-span-5">Name</div>
                  <div className="col-span-3 sm:col-span-3 hidden sm:block">Modified</div>
                  <div className="col-span-3 sm:col-span-2 text-right sm:text-left">Size</div>
                  <div className="col-span-3 sm:col-span-2 text-right">Actions</div>
                </div>

                {/* File rows */}
                {files.map((file) => {
                  const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                  return (
                    <div
                      key={file.id}
                      className="grid grid-cols-12 gap-3 px-5 py-3.5 items-center hover:bg-white/[0.03] transition text-xs group"
                    >
                      {/* Name & Icon */}
                      <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0">
                        <div className="shrink-0 p-1.5 rounded-lg bg-white/[0.04]">
                          {getFileIcon(file)}
                        </div>
                        <div className="truncate">
                          {isFolder ? (
                            <button
                              onClick={() => navigateToFolder(file)}
                              className="text-white hover:text-[#F6C453] font-medium truncate text-left block w-full transition cursor-pointer"
                            >
                              {file.name}
                            </button>
                          ) : (
                            <a
                              href={file.webViewLink || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-cyan-400 font-medium truncate block transition"
                            >
                              {file.name}
                            </a>
                          )}
                          <span className="text-[10px] text-zinc-500 block truncate">
                            {file.mimeType}
                          </span>
                        </div>
                      </div>

                      {/* Modified Date */}
                      <div className="col-span-3 sm:col-span-3 text-zinc-400 hidden sm:block font-mono text-[11px]">
                        {file.modifiedTime
                          ? new Date(file.modifiedTime).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '--'}
                      </div>

                      {/* Size */}
                      <div className="col-span-3 sm:col-span-2 text-right sm:text-left text-zinc-400 font-mono text-[11px]">
                        {isFolder ? 'Folder' : formatFileSize(file.size)}
                      </div>

                      {/* Actions */}
                      <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-1.5">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-zinc-800/60 hover:bg-cyan-900/40 text-zinc-400 hover:text-cyan-300 transition"
                            title="Open in Google Drive"
                            aria-label="Open in Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {/* Destructive Delete Button - Triggers Confirmation Dialog */}
                        <button
                          onClick={() => setDeleteConfirmTarget(file)}
                          className="p-1.5 rounded-lg bg-zinc-800/60 hover:bg-red-950/60 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                          title="Delete from Google Drive"
                          aria-label={`Delete ${file.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* NEW FOLDER MODAL */}
      {isFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0e1015] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-[#F6C453]" />
                Create New Folder
              </h3>
              <button
                onClick={() => setIsFolderModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Folder Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SLV Inspection Reports 2026"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F6C453]"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFolderModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F6C453] text-black hover:bg-[#f8d070] transition disabled:opacity-50"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW INSPECTION REPORT GENERATOR MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0e1015] p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#F6C453]" />
                <h3 className="text-base font-bold text-white">
                  Save Inspection Certificate to Google Drive
                </h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGenerateReport} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Property Address
                </label>
                <input
                  type="text"
                  required
                  value={reportFormData.propertyAddress}
                  onChange={(e) =>
                    setReportFormData({ ...reportFormData, propertyAddress: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Target Pest
                  </label>
                  <input
                    type="text"
                    required
                    value={reportFormData.pestTarget}
                    onChange={(e) =>
                      setReportFormData({ ...reportFormData, pestTarget: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Technician
                  </label>
                  <input
                    type="text"
                    required
                    value={reportFormData.technicianName}
                    onChange={(e) =>
                      setReportFormData({ ...reportFormData, technicianName: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Treatment Administered
                </label>
                <input
                  type="text"
                  required
                  value={reportFormData.treatmentType}
                  onChange={(e) =>
                    setReportFormData({ ...reportFormData, treatmentType: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Field Observations
                </label>
                <textarea
                  rows={2}
                  value={reportFormData.observations}
                  onChange={(e) =>
                    setReportFormData({ ...reportFormData, observations: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Post-Treatment Recommendations
                </label>
                <textarea
                  rows={2}
                  value={reportFormData.recommendation}
                  onChange={(e) =>
                    setReportFormData({ ...reportFormData, recommendation: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#F6C453] text-black hover:bg-[#f8d070] transition shadow-lg cursor-pointer"
                >
                  Save Certificate to Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANDATORY EXPLICIT USER CONFIRMATION DIALOG FOR DELETION */}
      {deleteConfirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl border border-red-500/30 bg-[#120a0d] p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4 text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-white mb-2">
              Confirm Permanent Deletion
            </h3>

            <p className="text-zinc-300 text-xs leading-relaxed mb-4">
              Are you sure you want to permanently delete{' '}
              <strong className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded">
                {deleteConfirmTarget.name}
              </strong>{' '}
              from your Google Drive? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDeleteFile}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition shadow-lg cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete from Drive'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
