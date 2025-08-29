// DogPhotoUpload - Component for handling dog photo uploads and display
// Provides photo preview, upload, and remove functionality with validation

import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const DogPhotoUpload = ({
	dog,
	isEditing,
	onPhotoUpload,
	onPhotoRemove,
}) => {
	const fileInputRef = useRef(null);
	const [isUploading, setIsUploading] = useState(false);

	// Functions
	const handleFileSelect = e => {
		const file = e.target.files[0];
		if (file && onPhotoUpload) {
			// Additional validation before upload
			const maxSize = 5 * 1024 * 1024; // 5MB in bytes
			const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
			
			if (file.size > maxSize) {
				alert('❌ Photo file size must be less than 5MB. Please choose a smaller image.');
				return;
			}
			
			if (!validTypes.includes(file.type)) {
				alert('❌ Please upload a valid image file (JPEG, PNG, or WebP).');
				return;
			}
			
			setIsUploading(true);
			onPhotoUpload(dog.id, file);
			// Note: We'll reset uploading state in the parent component
			setTimeout(() => setIsUploading(false), 2000); // Fallback
		}
		// Reset input to allow re-uploading the same file
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleUploadClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleRemoveClick = () => {
		if (onPhotoRemove) {
			onPhotoRemove(dog.id);
		}
	};

	// Return
	return (
		<div className='text-center mb-6'>
			{/* Hidden file input */}
			<input
				ref={fileInputRef}
				type='file'
				accept='image/jpeg,image/jpg,image/png,image/webp'
				onChange={handleFileSelect}
				className='hidden'
				disabled={!isEditing}
			/>

			{/* Photo Display/Placeholder */}
			<div className='relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4'>
				{dog.photo ? (
					<div className='relative'>
						<img
							src={dog.photo}
							alt={dog.dogName || 'Dog photo'}
							className='w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg'
							onError={e => {
								// Fallback to default if image fails to load
								e.target.style.display = 'none';
								e.target.nextSibling.style.display = 'flex';
							}}
						/>
						{/* Fallback emoji (hidden by default) */}
						<div
							className='w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center justify-center text-4xl sm:text-6xl'
							style={{ display: 'none' }}
						>
							🐕
						</div>
						{/* Remove button (only when editing) */}
						{isEditing && (
							<button
								onClick={handleRemoveClick}
								className='absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 shadow-lg touch-manipulation'
								title='Remove photo'
							>
								✕
							</button>
						)}
					</div>
				) : (
					<div className='w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center justify-center text-4xl sm:text-6xl'>
						🐕
					</div>
				)}
			</div>

			{/* Upload/Change Button */}
			{isEditing && (
				<button
					onClick={handleUploadClick}
					disabled={isUploading}
					className={`font-medium transition-colors duration-200 text-sm sm:text-base min-h-[44px] px-4 py-2 rounded-lg touch-manipulation ${
						isUploading
							? 'bg-gray-400 text-white cursor-not-allowed'
							: 'walkie-button text-white'
					}`}
					type='button'
				>
					{isUploading ? '⏳ Uploading...' : (dog.photo ? '📸 Change Photo' : '📸 Add Photo')}
				</button>
			)}

			{/* View Mode - No Photo Message */}
			{!isEditing && !dog.photo && (
				<p className='text-gray-500 text-sm'>No photo added yet</p>
			)}

			{/* File Guidelines */}
			{isEditing && (
				<div className='mt-2 text-xs text-gray-500'>
					<p>JPEG, PNG, or WebP • Max 5MB</p>
				</div>
			)}
		</div>
	);
};

DogPhotoUpload.propTypes = {
	dog: PropTypes.object.isRequired,
	isEditing: PropTypes.bool.isRequired,
	onPhotoUpload: PropTypes.func,
	onPhotoRemove: PropTypes.func,
};
