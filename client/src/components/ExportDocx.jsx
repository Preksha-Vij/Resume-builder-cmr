import React from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const ExportDocx = ({ resumeData }) => {
  const handleDownloadDocx = async () => {
    // Example: add summary and skills, expand as needed
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: "Professional Summary", bold: true, size: 28 }),
                new TextRun({ text: resumeData.professional_summary || "", break: 1 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Skills:", bold: true }),
                new TextRun({ text: (resumeData.skills || []).join(", "), break: 1 }),
              ],
            }),
            // Similarly: add experience, education, etc.
          ],
        },
      ],
    });

    const buffer = await Packer.toBlob(doc);
    saveAs(buffer, 'Resume.docx');
  };

  return (
    <button
      className="flex items-center gap-2 px-4 py-2 text-xs bg-purple-200 text-purple-800 rounded-lg hover:bg-purple-300 transition-colors"
      type="button"
      onClick={handleDownloadDocx}
    >
      Download as DOCX
    </button>
  );
};

export default ExportDocx;
