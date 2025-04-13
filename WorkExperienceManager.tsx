import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  Building,
  GripVertical,
  Plus,
  X,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  logo?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  location: string;
}

interface WorkExperienceManagerProps {
  experiences: WorkExperience[];
  onUpdate: (experiences: WorkExperience[]) => void;
}

export default function WorkExperienceManager({ experiences, onUpdate }: WorkExperienceManagerProps) {
  const [items, setItems] = useState<WorkExperience[]>(experiences);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
    setDraggedId(null);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId) {
      const draggedIndex = items.findIndex(item => item.id === draggedId);
      const targetIndex = items.findIndex(item => item.id === targetId);
      
      const newItems = [...items];
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);
      
      setItems(newItems);
    }
  };

  const handleSave = async (experience: Partial<WorkExperience>) => {
    setSaving(true);
    setError(null);
    
    try {
      const updatedItems = editingId
        ? items.map(item => item.id === editingId ? { ...item, ...experience } : item)
        : [...items, { id: Date.now().toString(), ...experience } as WorkExperience];
      
      await onUpdate(updatedItems);
      setItems(updatedItems);
      setEditingId(null);
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    onUpdate(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Add New Experience Button */}
      <button
        onClick={() => setEditingId('new')}
        className="w-full p-4 border-2 border-dashed border-indigo-200 rounded-xl
                 hover:border-indigo-400 hover:bg-indigo-50 transition-colors
                 flex items-center justify-center gap-2 text-indigo-600"
        aria-label="Add new work experience"
      >
        <Plus className="w-5 h-5" />
        <span>Add Experience</span>
      </button>

      {/* Experience List */}
      <div className="space-y-4">
        {items.map((experience) => (
          <div
            key={experience.id}
            draggable
            onDragStart={(e) => handleDragStart(e, experience.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, experience.id)}
            className={`group bg-white rounded-xl border border-gray-200 shadow-sm
                     hover:shadow-md transition-all duration-200
                     ${editingId === experience.id ? 'ring-2 ring-indigo-500' : ''}`}
          >
            {editingId === experience.id ? (
              <ExperienceForm
                experience={experience}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
                saving={saving}
                error={error}
              />
            ) : (
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      {experience.logo ? (
                        <img
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-indigo-600" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {experience.title}
                        </h3>
                        <p className="text-gray-600">{experience.company}</p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600 whitespace-pre-line">
                      {experience.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingId(experience.id)}
                      className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                      aria-label="Edit experience"
                    >
                      <GripVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface ExperienceFormProps {
  experience?: WorkExperience;
  onSave: (data: Partial<WorkExperience>) => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
}

function ExperienceForm({ experience, onSave, onCancel, saving, error }: ExperienceFormProps) {
  const [formData, setFormData] = useState({
    title: experience?.title || '',
    company: experience?.company || '',
    location: experience?.location || '',
    startDate: experience?.startDate || '',
    endDate: experience?.endDate || '',
    current: experience?.current || false,
    description: experience?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Senior Software Engineer"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. TechCorp Inc."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. San Francisco, CA"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="month"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="month"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              disabled={formData.current}
              required={!formData.current}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={formData.current}
            onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          I currently work here
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe your role, responsibilities, and achievements..."
          required
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 bg-white border border-gray-300 
                   rounded-lg hover:bg-gray-50 transition-colors min-w-[100px]"
          disabled={saving}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                   transition-colors flex items-center justify-center gap-2 min-w-[100px]"
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Save
            </>
          )}
        </button>
      </div>
    </form>
  );
}