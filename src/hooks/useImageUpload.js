import { useState, useCallback } from 'react';

const useImageUpload = () => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return '只支持 JPG, PNG, WEBP 格式的图片哦 🐕';
    }
    if (file.size > 5 * 1024 * 1024) {
      return '图片太大啦，不能超过 5MB 哦 🦴';
    }
    return null;
  };

  const handleFile = useCallback((file) => {
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleUpload = useCallback((e) => {
    const file = e.target.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const reset = useCallback(() => {
    setPreview(null);
    setError(null);
    setIsUploading(false);
    setDragging(false);
  }, []);

  return {
    preview,
    error,
    isUploading,
    dragging,
    handleUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFile,
    setIsUploading,
    reset
  };
};

export default useImageUpload;