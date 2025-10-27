import React from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import MinimalImageTemplate from './templates/MinimalImageTemplate';
import ExportPDF from './ExportPDF';

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div>
      {/* Printable and exportable resume */}
      <div id="resume-preview" className={`w-full bg-gray-100 border border-gray-200 print:shadow-none print:border-none ${classes}`}>
        {renderTemplate()}
      </div>
      {/* Print/export CSS for correct page size and shadow/border hiding */}
      <style>
        {`
          @page {
            size: letter;
            margin: 0;
          }
          @media print {
            html, body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
            }
            body * {
              visibility: hidden;
            }
            #resume-preview, #resume-preview * {
              visibility: visible;
            }
            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>
      {/* Download as PDF button (should NOT be inside resume-preview for export) */}
      <div className="mt-4">
        <ExportPDF />
      </div>
    </div>
  );
};

export default ResumePreview;
