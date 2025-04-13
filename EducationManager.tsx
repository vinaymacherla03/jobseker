import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Building,
  GripVertical,
  Plus,
  X,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  school: string;
  logo?: string;
  startYear: string;
  endYear: string;
  field: string;
  description?: string;
  location?: string;
  gpa?: string;
}

interface EducationManagerProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

export default function EducationManager({ education, onUpdate }: EducationManagerProps) {
  const [items, setItems] = useState<Education[]>(education);
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

  const handleSave = async (education: Partial<Education>) => {
    setSaving(true);
    setError(null);
    
    try {
      const updatedItems = editingId
        ? items.map(item => item.id === editingId ? { ...item, ...education } : item)
        : [...items, { id: Date.now().toString(), ...education } as Education];
      
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
      {/* Add New Education Button */}
      <button
        onClick={() => setEditingId('new')}
        className="w-full p-4 border-2 border-dashed border-emerald-200 rounded-xl
                 hover:border-emerald-400 hover:bg-emerald-50 transition-colors
                 flex items-center justify-center gap-2 text-emerald-600"
        aria-label="Add new education"
      >
        <Plus className="w-5 h-5" />
        <span>Add Education</span>
      </button>

      {/* Education List */}
      <div className="space-y-4">
        {items.map((edu) => (
          <div
            key={edu.id}
            draggable
            onDragStart={(e) => handleDragStart(e, edu.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, edu.id)}
            className={`group bg-white rounded-xl border border-gray-200 shadow-sm
                     hover:shadow-md transition-all duration-200
                     ${editingId === edu.id ? 'ring-2 ring-emerald-500' : ''}`}
          >
            {editingId === edu.id ? (
              <EducationForm
                education={edu}
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
                      {edu.logo ? (
                        <img
                          src={edu.logo}
                          alt={`${edu.school} logo`}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-emerald-600" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-gray-600">{edu.school}</p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.startYear} - {edu.endYear}</span>
                          {edu.location && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{edu.location}</span>
                            </>
                          )}
                          {edu.gpa && (
                            <>
                              <span className="mx-2">•</span>
                              <span>GPA: {edu.gpa}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="mt-4 text-gray-600 whitespace-pre-line">
                        {edu.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingId(edu.id)}
                      className="p-2 text-gray-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                      aria-label="Edit education"
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

interface EducationFormProps {
  education?: Education;
  onSave: (data: Partial<Education>) => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
}

function EducationForm({ education, onSave, onCancel, saving, error }: EducationFormProps) {
  const [formData, setFormData] = useState({
    degree: education?.degree || '',
    school: education?.school || '',
    field: education?.field || '',
    startYear: education?.startYear || '',
    endYear: education?.endYear || '',
    location: education?.location || '',
    gpa: education?.gpa || '',
    description: education?.description || '',
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
            Degree
          </label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. Bachelor of Science"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field of Study
          </label>
          <input
            type="text"
            value={formData.field}
            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. Computer Science"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            School
          </label>
          <input
            type="text"
            value={formData.school}
            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. Stanford University"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. Stanford, CA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Year
          </label>
          <input
            type="text"
            value={formData.startYear}
            onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. 2018"
            pattern="\d{4}"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Year (or Expected)
          </label>
          <input
            type="text"
            value={formData.endYear}
            onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. 2022"
            pattern="\d{4}"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GPA (Optional)
          </label>
          <input
            type="text"
            value={formData.gpa}
            onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. 3.8"
            pattern="[0-4](\.[0-9]?)?"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          placeholder="Describe your academic achievements, activities, or research..."
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
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 
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