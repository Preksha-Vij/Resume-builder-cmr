import React from 'react';
import html2canvas from 'html2canvas';
import download from 'downloadjs';

const ExportPNG = ({ targetId = 'resume-preview', fileName = 'Resume.png' }) => {
  const handleDownloadPng = async () => {
    const preview = document.getElementById(targetId);
    if (!preview) return alert("Resume preview not found!");

    // PATCH: Temporarily set supported background for html2canvas
    const originalBg = preview.style.background;
    let revert = false;
    const computedBg = window.getComputedStyle(preview).background;
    if (computedBg.includes("oklch")) {
      preview.style.background = "#fff";
      revert = true;
    }

    // Screenshot and export as PNG
    const canvas = await html2canvas(preview, { scale: 2 });
    if (revert) preview.style.background = originalBg;

    canvas.toBlob(blob => download(blob, fileName));
  };

  return (
    <button
      className="flex items-center gap-2 px-4 py-2 text-xs bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300 transition-colors"
      type="button"
      onClick={handleDownloadPng}
    >
      Download as PNG
    </button>
  );
};

export default ExportPNG;
