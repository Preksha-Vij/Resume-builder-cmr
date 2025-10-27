import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportPDF = ({ targetId = 'resume-preview', fileName = 'Resume.pdf' }) => {
  const handleDownloadPdf = async () => {
    const preview = document.getElementById(targetId);
    if (!preview) return alert('Resume preview not found!');

    // PATCH: Temporarily set supported background color for html2canvas
    const originalBg = preview.style.background;
    let revert = false;
    const computedBg = window.getComputedStyle(preview).background;
    if (computedBg.includes("oklch")) {
      preview.style.background = "#fff"; // fallback to supported color
      revert = true;
    }

    // Screenshot and export as PDF
    const canvas = await html2canvas(preview, { scale: 2 });
    if (revert) preview.style.background = originalBg;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
  };

  return (
    <button
      className="flex items-center gap-2 px-4 py-2 text-xs bg-yellow-200 text-yellow-800 rounded-lg hover:bg-yellow-300 transition-colors"
      type="button"
      onClick={handleDownloadPdf}
    >
      Download as PDF
    </button>
  );
};

export default ExportPDF;
