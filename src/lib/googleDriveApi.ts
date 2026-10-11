/**
 * Google Drive REST API Client for SLV Pest Control
 * Interacts directly with Google Drive v3 API using client-side OAuth Bearer token
 */

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
  parents?: string[];
  trashed?: boolean;
}

export interface DriveAbout {
  user: {
    displayName: string;
    emailAddress: string;
    photoLink?: string;
  };
  storageQuota?: {
    limit?: string;
    usage?: string;
    usageInDrive?: string;
  };
}

const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3';

/**
 * Fetch files and folders from Google Drive
 */
export async function listDriveFiles(
  accessToken: string,
  options: {
    folderId?: string;
    searchQuery?: string;
    mimeTypeFilter?: string;
    pageSize?: number;
    pageToken?: string;
  } = {}
): Promise<{ files: DriveFile[]; nextPageToken?: string }> {
  const { folderId, searchQuery, mimeTypeFilter, pageSize = 30, pageToken } = options;

  const queryParts: string[] = ['trashed = false'];

  if (folderId) {
    queryParts.push(`'${folderId}' in parents`);
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    const sanitized = searchQuery.trim().replace(/'/g, "\\'");
    queryParts.push(`(name contains '${sanitized}' or fullText contains '${sanitized}')`);
  }

  if (mimeTypeFilter === 'folders') {
    queryParts.push("mimeType = 'application/vnd.google-apps.folder'");
  } else if (mimeTypeFilter === 'images') {
    queryParts.push("mimeType contains 'image/'");
  } else if (mimeTypeFilter === 'documents') {
    queryParts.push(
      "(mimeType contains 'pdf' or mimeType contains 'document' or mimeType contains 'sheet' or mimeType contains 'text')"
    );
  }

  const q = queryParts.join(' and ');
  const params = new URLSearchParams({
    q,
    pageSize: String(pageSize),
    fields:
      'nextPageToken, files(id, name, mimeType, size, modifiedTime, webViewLink, webContentLink, thumbnailLink, iconLink, parents, trashed)',
    orderBy: 'folder,modifiedTime desc',
  });

  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  const response = await fetch(`${DRIVE_API_URL}/files?${params.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Google Drive API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  return {
    files: data.files || [],
    nextPageToken: data.nextPageToken,
  };
}

/**
 * Get user information and Drive storage quota
 */
export async function getDriveAbout(accessToken: string): Promise<DriveAbout> {
  const params = new URLSearchParams({
    fields: 'user(displayName, emailAddress, photoLink), storageQuota(limit, usage, usageInDrive)',
  });

  const response = await fetch(`${DRIVE_API_URL}/about?${params.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to load Drive account info: ${err}`);
  }

  return response.json();
}

/**
 * Create a new folder in Google Drive
 */
export async function createDriveFolder(
  accessToken: string,
  folderName: string,
  parentFolderId?: string
): Promise<DriveFile> {
  const metadata: Record<string, any> = {
    name: folderName.trim(),
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const response = await fetch(`${DRIVE_API_URL}/files?fields=id,name,mimeType,modifiedTime,webViewLink`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to create folder in Google Drive: ${err}`);
  }

  return response.json();
}

/**
 * Upload a file (Photo, PDF, Inspection Doc) to Google Drive via multipart upload
 */
export async function uploadFileToDrive(
  accessToken: string,
  file: File,
  parentFolderId?: string
): Promise<DriveFile> {
  const boundary = `-------SLV_DRIVE_BOUNDARY_${Date.now()}`;
  const metadata: Record<string, any> = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadataPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(
    metadata
  )}`;
  const fileHeaderPart = `\r\n--${boundary}\r\nContent-Type: ${
    file.type || 'application/octet-stream'
  }\r\n\r\n`;

  const multipartRequestBody = new Blob([metadataPart, fileHeaderPart, file, closeDelimiter], {
    type: `multipart/related; boundary=${boundary}`,
  });

  const response = await fetch(
    `${DRIVE_UPLOAD_URL}/files?uploadType=multipart&fields=id,name,mimeType,size,modifiedTime,webViewLink`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to upload file to Google Drive: ${err}`);
  }

  return response.json();
}

/**
 * Save an SLV Pest Control Inspection / Audit Report text document directly to Google Drive
 */
export async function saveInspectionReportToDrive(
  accessToken: string,
  fileName: string,
  reportMarkdownContent: string,
  parentFolderId?: string
): Promise<DriveFile> {
  const fileBlob = new Blob([reportMarkdownContent], { type: 'text/markdown;charset=utf-8' });
  const file = new File([fileBlob], fileName, { type: 'text/markdown' });
  return uploadFileToDrive(accessToken, file, parentFolderId);
}

/**
 * Delete a file or folder from Google Drive
 * (Must be called ONLY after explicit user confirmation dialog in UI!)
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<void> {
  const response = await fetch(`${DRIVE_API_URL}/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const err = await response.text();
    throw new Error(`Failed to delete file from Google Drive: ${err}`);
  }
}
