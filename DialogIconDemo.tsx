import React from 'react';
import DialogIcon from './DialogIcon';

export default function DialogIconDemo() {
  return (
    <div className="flex items-center justify-center gap-8 p-8">
      <div className="text-center">
        <DialogIcon variant="light" size={64} />
        <p className="mt-2 text-sm text-gray-600">Light Variant</p>
      </div>
      
      <div className="text-center">
        <DialogIcon variant="dark" size={64} />
        <p className="mt-2 text-sm text-gray-600">Dark Variant</p>
      </div>

      {/* Size Variants */}
      <div className="flex items-end gap-4">
        <div className="text-center">
          <DialogIcon variant="light" size={32} />
          <p className="mt-2 text-sm text-gray-600">32px</p>
        </div>
        <div className="text-center">
          <DialogIcon variant="light" size={48} />
          <p className="mt-2 text-sm text-gray-600">48px</p>
        </div>
        <div className="text-center">
          <DialogIcon variant="light" size={64} />
          <p className="mt-2 text-sm text-gray-600">64px</p>
        </div>
      </div>
    </div>
  );
}