import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectForm from '../components/ProjectForm';
import SkillsForm from '../components/SkillsForm';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { runATSChecks } from '../utils/atsCheck';
import ExportPDF from '../components/ExportPDF';
import ExportPNG from '../components/ExportPNG';
import ExportDocx from '../components/ExportDocx';


const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  // Resume state
  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  // Section navigation state
  const [sections, setSections] = useState([
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const activeSection = sections[activeSectionIndex];
  const [removeBackground, setRemoveBackground] = useState(false);

  // AI suggestions state
  const [aiSuggestions, setAISuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [jobDescription, setJobDescription] = useState('');

  useEffect(() => {
    loadExistingResume();
    // eslint-disable-next-line
  }, []);

  // Load resume from backend
  const loadExistingResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Save resume changes
  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);
      // Remove image from updatedResumeData
      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image;
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append('resumeData', JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image);

      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } });
      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  // Change resume visibility
  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  // Download/Print
  const downloadResume = () => {
    window.print();
  };

  // Share resume
  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert('Share not supported on this browser.');
    }
  };

  // AI Suggestions (frontend handler)
  const getAISuggestions = async () => {
    setLoadingSuggestions(true);
    setAISuggestions([]);
    try {
      const { data } = await api.post('/api/ai/suggestions', {
        resume: resumeData,
        jobDescription
      }, { headers: { Authorization: token } });
      setAISuggestions(data.suggestions);
    } catch (err) {
      setAISuggestions(['Could not fetch suggestions.']);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // ATS missing sections
  const missingSections = runATSChecks(resumeData);

  // --- JSX Return Starts ---
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left Panel - Form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* Progress Bar */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }} />

              {/* Section Navigation with Drag-and-Drop */}
              <DragDropContext
                onDragEnd={(result) => {
                  if (!result.destination) return;
                  const newSections = Array.from(sections);
                  const [removed] = newSections.splice(result.source.index, 1);
                  newSections.splice(result.destination.index, 0, removed);
                  setSections(newSections);
                  setActiveSectionIndex((prev) =>
                    prev === result.source.index
                      ? result.destination.index
                      : prev === result.destination.index
                        ? result.source.index
                        : prev
                  );
                }}
              >
                <Droppable droppableId="section-list" direction="horizontal">
                  {(provided) => (
                    <div
                      className="flex gap-3 mb-6 border-b border-gray-300 py-1"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {sections.map((section, idx) => (
                        <Draggable key={section.id} draggableId={section.id} index={idx}>
                          {(provided, snapshot) => (
                            <button
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setActiveSectionIndex(idx)}
                              className={`flex flex-col items-center text-xs px-2 py-1 border-b-2
                                ${activeSectionIndex === idx
                                  ? 'border-blue-500 text-blue-600 font-semibold'
                                  : 'border-transparent text-gray-500'
                                }
                                ${snapshot.isDragging ? 'bg-blue-50' : ''}
                              `}
                              type="button"
                              style={{ ...provided.draggableProps.style, cursor: 'grab' }}
                            >
                              <section.icon className="size-5 mb-1" />
                              {section.name}
                            </button>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {/* ATS Feedback Bar */}
              {missingSections.length > 0 ? (
                <div className="mb-4 px-3 py-2 bg-red-50 text-red-700 rounded flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2"/><path d="M12 8v4m0 4h.01" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span><b>ATS Warning:</b> Missing important section(s): <b>{missingSections.join(', ')}</b></span>
                </div>
              ) : (
                <div className="mb-4 px-3 py-2 bg-green-50 text-green-700 rounded flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span><b>ATS-Ready!</b> All key sections are present.</span>
                </div>
              )}

              {/* AI Feedback Area */}
              <div className="mb-4">
                <label className="block text-sm mb-1 font-semibold">Paste Job Description (for AI Suggestions):</label>
                <textarea
                  className="w-full border rounded p-2 text-xs"
                  rows={3}
                  placeholder="Paste job description here..."
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                />
                <button
                  onClick={getAISuggestions}
                  disabled={loadingSuggestions || !jobDescription}
                  className="mt-2 px-4 py-1 rounded text-white bg-blue-500 hover:bg-blue-600 text-xs"
                >{loadingSuggestions ? 'Generating...' : 'Get AI Suggestions'}</button>
                {aiSuggestions.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-xs text-blue-700 bg-blue-50 rounded p-2">
                    {aiSuggestions.map((s, idx) => <li key={idx}>{s}</li>)}
                  </ul>
                )}
              </div>

              {/* Template/color pickers and next/prev buttons */}
              <div className='flex justify-between items-center mb-6'>
                <div className='flex items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>
                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
                      className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'
                      disabled={activeSectionIndex === 0}>
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button onClick={() => setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`}
                    disabled={activeSectionIndex === sections.length - 1}>
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                )}
                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />
                )}
                {activeSection.id === 'experience' && (
                  <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                )}
                {activeSection.id === 'education' && (
                  <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                )}
                {activeSection.id === 'projects' && (
                  <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
                )}
                {activeSection.id === 'skills' && (
                  <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                )}
              </div>
              <button onClick={() => { toast.promise(saveResume, { loading: 'Saving...' }) }}
                className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div className='relative w-full'>
              <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                {resumeData.public && (
                  <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                    <Share2Icon className='size-4' /> Share
                  </button>
                )}
                <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors'>
                  {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
                  {resumeData.public ? 'Public' : 'Private'}
                </button>
                <button onClick={downloadResume} className='flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                  <DownloadIcon className='size-4' /> Download
                </button>
                <ExportDocx resumeData={resumeData} />
              </div>
            </div>
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ResumeBuilder;
