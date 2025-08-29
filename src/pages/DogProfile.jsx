// DogProfile - Main page for managing multiple dog profiles
// Coordinates multiple sub-components and handles business logic

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OwnerInfoForm } from '../components/OwnerInfoForm';
import { DogTabsNav } from '../components/DogTabsNav';
import { DogProfileForm } from '../components/DogProfileForm';
import { ProfileActions } from '../components/ProfileActions';

export const DogProfile = () => {
	const navigate = useNavigate();

	// Default dog data
	const createDefaultDog = () => ({
		id: Date.now().toString(),
		dogName: '',
		breed: '',
		age: '',
		size: '',
		energy: '',
		friendliness: '',
		walkingPreferences: [],
		photo: null, // Base64 encoded photo or null
	});

	// Default profile with owner info and multiple dogs
	const defaultProfile = {
		ownerName: 'Sarah Johnson',
		dogs: [
			{
				id: '1',
				dogName: 'Buddy',
				breed: 'Golden Retriever',
				age: '3 years old',
				size: 'Large',
				energy: 'High',
				friendliness: 'Very Friendly',
				walkingPreferences: ['Morning walks', 'Beach areas', 'Social groups'],
				photo: null,
			},
		],
	};

	// Component state
	const [isEditing, setIsEditing] = useState(false);
	const [profile, setProfile] = useState(defaultProfile);
	const [selectedDogId, setSelectedDogId] = useState('1');
	const [validationErrors, setValidationErrors] = useState({});

	// Load profile from localStorage on component mount
	useEffect(() => {
		const savedProfile = localStorage.getItem('walkieWalkie_dogProfile');
		if (savedProfile) {
			try {
				const parsedProfile = JSON.parse(savedProfile);
				// Migrate old single dog format to new multiple dogs format
				if (parsedProfile.dogName && !parsedProfile.dogs) {
					const migratedProfile = {
						ownerName: parsedProfile.ownerName || 'Dog Owner',
						dogs: [
							{
								id: '1',
								dogName: parsedProfile.dogName,
								breed: parsedProfile.breed,
								age: parsedProfile.age,
								size: parsedProfile.size,
								energy: parsedProfile.energy,
								friendliness: parsedProfile.friendliness,
								walkingPreferences: parsedProfile.walkingPreferences || [],
								photo: parsedProfile.photo || null,
							},
						],
					};
					setProfile(migratedProfile);
					// Save migrated format
					localStorage.setItem('walkieWalkie_dogProfile', JSON.stringify(migratedProfile));
				} else {
					// Ensure all dogs have photo field for backward compatibility
					const updatedProfile = {
						...parsedProfile,
						dogs: parsedProfile.dogs.map(dog => ({
							...dog,
							photo: dog.photo || null,
						})),
					};
					setProfile(updatedProfile);
					if (updatedProfile.dogs?.length > 0) {
						setSelectedDogId(updatedProfile.dogs[0].id);
					}
				}
			} catch (error) {
				console.error('Error loading dog profile:', error);
			}
		}
	}, []);

	// Validation functions
	const validateField = (name, value, dogId = null) => {
		const errors = { ...validationErrors };
		const errorKey = dogId ? `${dogId}_${name}` : name;

		// Clear existing error
		delete errors[errorKey];

		// Required field validation
		if (['ownerName', 'dogName', 'breed', 'age', 'size', 'energy', 'friendliness'].includes(name)) {
			if (!value || value.trim() === '') {
				errors[errorKey] = 'This field is required';
			}
		}

		// Age validation
		if (name === 'age' && value) {
			const ageRegex = /^\d+\s*(years?|months?|yrs?|mos?)\s*(old)?$/i;
			if (!ageRegex.test(value.trim())) {
				errors[errorKey] = 'Enter age like "3 years old" or "8 months"';
			}
		}

		// Dog name validation
		if (name === 'dogName' && value && dogId) {
			const isDuplicate = profile.dogs.some(
				dog => dog.id !== dogId && dog.dogName.toLowerCase() === value.toLowerCase()
			);
			if (isDuplicate) {
				errors[errorKey] = 'A dog with this name already exists';
			}
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	// Handle owner input changes
	const handleOwnerInputChange = e => {
		const { name, value } = e.target;
		setProfile(prev => ({
			...prev,
			[name]: value,
		}));
		validateField(name, value);
	};

	// Handle dog input changes
	const handleDogInputChange = e => {
		const { name, value } = e.target;
		const selectedDog = profile.dogs.find(dog => dog.id === selectedDogId);
		if (!selectedDog) return;

		setProfile(prev => ({
			...prev,
			dogs: prev.dogs.map(dog => (dog.id === selectedDogId ? { ...dog, [name]: value } : dog)),
		}));
		validateField(name, value, selectedDogId);
	};

	// Handle adding walking preference
	const handleAddPreference = (dogId, preference) => {
		setProfile(prev => ({
			...prev,
			dogs: prev.dogs.map(dog =>
				dog.id === dogId
					? {
							...dog,
							walkingPreferences: [...dog.walkingPreferences, preference],
					  }
					: dog
			),
		}));
	};

	// Handle removing walking preference
	const handleRemovePreference = (dogId, indexToRemove) => {
		setProfile(prev => ({
			...prev,
			dogs: prev.dogs.map(dog =>
				dog.id === dogId
					? {
							...dog,
							walkingPreferences: dog.walkingPreferences.filter(
								(_, index) => index !== indexToRemove
							),
					  }
					: dog
			),
		}));
	};

	// Handle photo upload
	const handlePhotoUpload = (dogId, file) => {
		// Convert to base64
		const reader = new FileReader();
		reader.onload = e => {
			const base64Photo = e.target.result;

			// Optional: Compress image if it's very large (basic implementation)
			const img = new Image();
			img.onload = () => {
				// If image is very large, we could resize it here
				// For now, just store the base64 directly
				setProfile(prev => ({
					...prev,
					dogs: prev.dogs.map(dog => (dog.id === dogId ? { ...dog, photo: base64Photo } : dog)),
				}));

				// Show success message
				const selectedDog = profile.dogs.find(dog => dog.id === dogId);
				const dogName = selectedDog?.dogName || 'Your dog';
				console.log(`✅ Photo uploaded successfully for ${dogName}!`);
			};
			img.src = base64Photo;
		};
		reader.onerror = () => {
			alert('❌ Error uploading photo. Please try again.');
		};
		reader.readAsDataURL(file);
	};

	// Handle photo removal
	const handlePhotoRemove = dogId => {
		if (window.confirm('Are you sure you want to remove this photo?')) {
			setProfile(prev => ({
				...prev,
				dogs: prev.dogs.map(dog => (dog.id === dogId ? { ...dog, photo: null } : dog)),
			}));
		}
	};

	// Add new dog
	const handleAddDog = () => {
		const newDog = createDefaultDog();
		setProfile(prev => ({
			...prev,
			dogs: [...prev.dogs, newDog],
		}));
		setSelectedDogId(newDog.id);
		setIsEditing(true);
	};

	// Delete dog
	const handleDeleteDog = dogId => {
		if (profile.dogs.length <= 1) {
			alert('You must have at least one dog profile.');
			return;
		}

		if (window.confirm('Are you sure you want to delete this dog profile?')) {
			setProfile(prev => ({
				...prev,
				dogs: prev.dogs.filter(dog => dog.id !== dogId),
			}));

			// If deleted dog was selected, select the first remaining dog
			if (selectedDogId === dogId) {
				const remainingDogs = profile.dogs.filter(dog => dog.id !== dogId);
				if (remainingDogs.length > 0) {
					setSelectedDogId(remainingDogs[0].id);
				}
			}

			// Clear validation errors for deleted dog
			const newErrors = { ...validationErrors };
			Object.keys(newErrors).forEach(key => {
				if (key.startsWith(`${dogId}_`)) {
					delete newErrors[key];
				}
			});
			setValidationErrors(newErrors);
		}
	};

	// Handle save changes
	const handleSave = () => {
		// Validate all fields
		let hasErrors = false;

		// Validate owner
		if (!validateField('ownerName', profile.ownerName)) {
			hasErrors = true;
		}

		// Validate all dogs
		profile.dogs.forEach(dog => {
			['dogName', 'breed', 'age', 'size', 'energy', 'friendliness'].forEach(field => {
				if (!validateField(field, dog[field], dog.id)) {
					hasErrors = true;
				}
			});
		});

		if (hasErrors) {
			alert('❌ Please fix all validation errors before saving.');
			return;
		}

		try {
			localStorage.setItem('walkieWalkie_dogProfile', JSON.stringify(profile));
			setIsEditing(false);
			setValidationErrors({});
			alert('🎉 Profile saved successfully!');
		} catch (error) {
			console.error('Error saving profile:', error);
			alert('❌ Error saving profile. Please try again.');
		}
	};

	// Handle cancel editing
	const handleCancel = () => {
		// Reload from localStorage or use default
		const savedProfile = localStorage.getItem('walkieWalkie_dogProfile');
		if (savedProfile) {
			try {
				const parsedProfile = JSON.parse(savedProfile);
				setProfile(parsedProfile);
				if (parsedProfile.dogs?.length > 0) {
					setSelectedDogId(parsedProfile.dogs[0].id);
				}
			} catch (error) {
				setProfile(defaultProfile);
				setSelectedDogId('1');
			}
		} else {
			setProfile(defaultProfile);
			setSelectedDogId('1');
		}
		setIsEditing(false);
		setValidationErrors({});
	};

	// Get selected dog
	const selectedDog = profile.dogs.find(dog => dog.id === selectedDogId);

	// Helper function to get field error
	const getFieldError = (fieldName, dogId = null) => {
		const errorKey = dogId ? `${dogId}_${fieldName}` : fieldName;
		return validationErrors[errorKey];
	};

	// Helper function to check if field has error
	const hasFieldError = (fieldName, dogId = null) => {
		return Boolean(getFieldError(fieldName, dogId));
	};

	// Return
	return (
		<div className='walkie-background min-h-screen'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
				{/* Page Header */}
				<div className='text-center mb-6 sm:mb-8'>
					<h1 className='walkie-main-title text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4'>
						🐕 Dog Profiles {isEditing && <span className='text-orange-500'>- Editing</span>}
					</h1>
					<p className='walkie-subtitle text-base sm:text-lg px-4'>
						{isEditing
							? "Edit your furry friends' profiles and walking preferences"
							: "Manage your furry friends' profiles and walking preferences"}
					</p>
				</div>

				{/* Owner Information */}
				<OwnerInfoForm
					profile={profile}
					isEditing={isEditing}
					onInputChange={handleOwnerInputChange}
					validationErrors={validationErrors}
				/>

				{/* Dog Selection Tabs */}
				<DogTabsNav
					dogs={profile.dogs}
					selectedDogId={selectedDogId}
					onDogSelect={setSelectedDogId}
					onAddDog={handleAddDog}
					onDeleteDog={handleDeleteDog}
				/>

				{/* Selected Dog Profile */}
				{selectedDog && (
					<DogProfileForm
						dog={selectedDog}
						isEditing={isEditing}
						validationErrors={validationErrors}
						onInputChange={handleDogInputChange}
						onAddPreference={handleAddPreference}
						onRemovePreference={handleRemovePreference}
						onPhotoUpload={handlePhotoUpload}
						onPhotoRemove={handlePhotoRemove}
					/>
				)}

				{/* Action Buttons */}
				<ProfileActions
					isEditing={isEditing}
					onSave={handleSave}
					onCancel={handleCancel}
					onEdit={() => setIsEditing(true)}
				/>
			</div>
		</div>
	);
};
