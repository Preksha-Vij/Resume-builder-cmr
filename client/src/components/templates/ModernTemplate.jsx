// import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

// const ModernTemplate = ({ data, accentColor }) => {
// 	const formatDate = (dateStr) => {
// 		if (!dateStr) return "";
// 		const [year, month] = dateStr.split("-");
// 		return new Date(year, month - 1).toLocaleDateString("en-US", {
// 			year: "numeric",
// 			month: "short"
// 		});
// 	};

// 	return (
// 		<div className="max-w-4xl mx-auto bg-white text-gray-800">
// 			{/* Header */}
// 			<header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
// 				<h1 className="text-4xl font-light mb-3">
// 					{data.personal_info?.full_name || "Your Name"}
// 				</h1>

// 				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ">
// 					{data.personal_info?.email && (
// 						<div className="flex items-center gap-2">
// 							<Mail className="size-4" />
// 							<span>{data.personal_info.email}</span>
// 						</div>
// 					)}
// 					{data.personal_info?.phone && (
// 						<div className="flex items-center gap-2">
// 							<Phone className="size-4" />
// 							<span>{data.personal_info.phone}</span>
// 						</div>
// 					)}
// 					{data.personal_info?.location && (
// 						<div className="flex items-center gap-2">
// 							<MapPin className="size-4" />
// 							<span>{data.personal_info.location}</span>
// 						</div>
// 					)}
// 					{data.personal_info?.linkedin && (
// 						<a target="_blank" href={data.personal_info?.linkedin} className="flex items-center gap-2">
// 							<Linkedin className="size-4" />
// 							<span className="break-all text-xs">{data.personal_info.linkedin.split("https://www.")[1] ? data.personal_info.linkedin.split("https://www.")[1] : data.personal_info.linkedin}</span>
// 						</a>
// 					)}
// 					{data.personal_info?.website && (
// 						<a target="_blank" href={data.personal_info?.website} className="flex items-center gap-2">
// 							<Globe className="size-4" />
// 							<span className="break-all text-xs">{data.personal_info.website.split("https://")[1] ? data.personal_info.website.split("https://")[1] : data.personal_info.website}</span>
// 						</a>
// 					)}
// 				</div>
// 			</header>

// 			<div className="p-8">
// 				{/* Professional Summary */}
// 				{data.professional_summary && (
// 					<section className="mb-8">
// 						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
// 							Professional Summary
// 						</h2>
// 						<p className="text-gray-700 ">{data.professional_summary}</p>
// 					</section>
// 				)}

// 				{/* Experience */}
// 				{data.experience && data.experience.length > 0 && (
// 					<section className="mb-8">
// 						<h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
// 							Experience
// 						</h2>

// 						<div className="space-y-6">
// 							{data.experience.map((exp, index) => (
// 								<div key={index} className="relative pl-6 border-l border-gray-200">

// 									<div className="flex justify-between items-start mb-2">
// 										<div>
// 											<h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
// 											<p className="font-medium" style={{ color: accentColor }}>{exp.company}</p>
// 										</div>
// 										<div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
// 											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
// 										</div>
// 									</div>
// 									{exp.description && (
// 										<div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">
// 											{exp.description}
// 										</div>
// 									)}
// 								</div>
// 							))}
// 						</div>
// 					</section>
// 				)}

// 				{/* Projects */}
// 				{data.project && data.project.length > 0 && (
// 					<section className="mb-8">
// 						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
// 							Projects
// 						</h2>

// 						<div className="space-y-6">
// 							{data.project.map((p, index) => (
// 								<div key={index} className="relative pl-6 border-l border-gray-200" style={{borderLeftColor: accentColor}}>


// 									<div className="flex justify-between items-start">
// 										<div>
// 											<h3 className="text-lg font-medium text-gray-900">{p.name}</h3>
// 										</div>
// 									</div>
// 									{p.description && (
// 										<div className="text-gray-700 leading-relaxed text-sm mt-3">
// 											{p.description}
// 										</div>
// 									)}
// 								</div>
// 							))}
// 						</div>
// 					</section>
// 				)}

// 				<div className="grid sm:grid-cols-2 gap-8">
// 					{/* Education */}
// 					{data.education && data.education.length > 0 && (
// 						<section>
// 							<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
// 								Education
// 							</h2>

// 							<div className="space-y-4">
// 								{data.education.map((edu, index) => (
// 									<div key={index}>
// 										<h3 className="font-semibold text-gray-900">
// 											{edu.degree} {edu.field && `in ${edu.field}`}
// 										</h3>
// 										<p style={{ color: accentColor }}>{edu.institution}</p>
// 										<div className="flex justify-between items-center text-sm text-gray-600">
// 											<span>{formatDate(edu.graduation_date)}</span>
// 											{edu.gpa && <span>GPA: {edu.gpa}</span>}
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 						</section>
// 					)}

// 					{/* Skills */}
// 					{data.skills && data.skills.length > 0 && (
// 						<section>
// 							<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
// 								Skills
// 							</h2>

// 							<div className="flex flex-wrap gap-2">
// 								{data.skills.map((skill, index) => (
// 									<span
// 										key={index}
// 										className="px-3 py-1 text-sm text-white rounded-full"
// 										style={{ backgroundColor: accentColor }}
// 									>
// 										{skill}
// 									</span>
// 								))}
// 							</div>
// 						</section>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default ModernTemplate;
import React from "react";

// Props: data (resumeData), accentColor (string)
const ModernTemplate = ({ data, accentColor }) => (
  <div
    className="w-full max-w-[800px] mx-auto bg-white text-gray-900 rounded-lg shadow-lg p-8"
    style={{
      fontFamily: '"Segoe UI", Arial, sans-serif',
      minHeight: 1000,
    }}
  >
    {/* Header with Photo and Name */}
    <div className="flex flex-row gap-8 items-center border-b pb-4 mb-6">
      <div>
  {data.personal_info?.image ? (
    <img
      src={data.personal_info.image}
      alt="Profile"
      className="w-36 h-36 object-cover "
      style={{
        //borderColor: accentColor,
        borderRadius: 0,    // SQUARE not CIRCLE!
        background: "#fff", // fallback
      }}
    />
  ) : (
    <div
      className="w-36 h-36 flex items-center justify-center border-4 text-gray-400"
      style={{
        borderColor: accentColor,
        borderRadius: 0,
        fontSize: "1rem",
        background: "#fff",
      }}
    >
      No Photo
    </div>
  )}
</div>

      <div className="flex-1">
        <h1 className="text-3xl font-bold" style={{ color: accentColor }}>
          {data.personal_info?.full_name}
        </h1>
        <p className="text-lg">{data.personal_info?.profession}</p>
        <div className="text-sm mt-1">
          <span className="block">{data.personal_info?.email}</span>
          <span className="block">{data.personal_info?.phone}</span>
          <span className="block">{data.personal_info?.location}</span>
        </div>
      </div>
    </div>

    {/* Professional Summary */}
    {data.professional_summary && (
      <section className="mb-6">
        <h2 className="text-xl font-bold" style={{ color: accentColor }}>
          Professional Summary
        </h2>
        <p>{data.professional_summary}</p>
      </section>
    )}

    {/* Education */}
    {data.education?.length > 0 && (
      <section className="mb-6">
        <h2 className="text-xl font-bold" style={{ color: accentColor }}>
          Education
        </h2>
        <ul>
          {data.education.map(e => (
            <li key={e.institution} className="mb-1">
              <b>{e.degree}</b> {e.field && `in ${e.field}`}, {e.institution} ({e.graduation_date})
              {e.gpa && <span>, GPA: {e.gpa}</span>}
            </li>
          ))}
        </ul>
      </section>
    )}

    {/* Projects */}
    {data.project?.length > 0 && (
      <section className="mb-6">
        <h2 className="text-xl font-bold" style={{ color: accentColor }}>
          Projects
        </h2>
        <ul>
          {data.project.map(p => (
            <li key={p.name} className="mb-1">
              <b>{p.name}</b> {p.type && `(${p.type})`}<br/>
              <span className="text-sm">{p.description}</span>
            </li>
          ))}
        </ul>
      </section>
    )}

    {/* Experience */}
    {data.experience?.length > 0 && (
      <section className="mb-6">
        <h2 className="text-xl font-bold" style={{ color: accentColor }}>
          Experience
        </h2>
        <ul>
          {data.experience.map(exp => (
            <li key={exp.company + exp.position} className="mb-1">
              <b>{exp.position}</b> @ {exp.company} 
              <br/>
              <span className="text-sm">{exp.start_date} - {exp.is_current ? "Present" : exp.end_date}</span>
              <div className="text-sm">{exp.description}</div>
            </li>
          ))}
        </ul>
      </section>
    )}

    {/* Skills */}
    {data.skills?.length > 0 && (
      <section className="mb-6">
        <h2 className="text-xl font-bold" style={{ color: accentColor }}>
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-gray-100 rounded-full border text-xs" style={{ borderColor: accentColor }}>
              {skill}
            </span>
          ))}
        </div>
      </section>
    )}
  </div>
);

export default ModernTemplate;
