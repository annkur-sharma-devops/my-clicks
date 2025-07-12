'use client';

import { useState } from 'react';

type Props = {
  onUploadComplete?: () => void;
};

export default function UploadForm({ onUploadComplete }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(null);
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setStatus(`✅ Uploaded: ${result.filename}`);
        onUploadComplete?.(); // ✅ Notify parent (auto-reload)
      } else {
        setStatus(`❌ Error: ${result.error || 'Upload failed'}`);
      }
    } catch (error) {
      setStatus('❌ Network error');
    }
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}
