import React, { useState } from 'react';
import { useUploadFiles } from '../Uploader/useUploadFiles';

type DragAreaProps = {
  onDrop?: (e: React.DragEvent) => void;
  disabled?: boolean;
};

export const DragAndDropFiles: React.FC<DragAreaProps> = ({
  children,
  disabled = false
}): JSX.Element => {
  const [dragEnter, setDragEnter] = useState(false);

  const uploadFiles = useUploadFiles();

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    uploadFiles(Array.from(e.dataTransfer.files || []));
    setDragEnter(false);
  };

  return (
    <div
      className={dragEnter ? 'disk__drop-area' : 'disk'}
      onDragEnter={!disabled ? onDragEnter : undefined}
      onDragLeave={!disabled ? onDragLeave : undefined}
      onDragOver={!disabled ? onDragEnter : undefined}
      onDrop={!disabled ? onDrop : undefined}
    >
      {dragEnter ? 'Перетащите файлы сюда' : children}
    </div>
  );
};
