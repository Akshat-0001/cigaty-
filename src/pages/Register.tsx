import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building2,
  Phone,
  MapPin,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
  Briefcase,
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import { authHelpers, dbHelpers, storageHelpers } from '../lib/supabase';

type RegistrationStep = 1 | 2 | 3;

interface DocumentFile extends File {
  preview?: string;
  docType?: 'photo_id' | 'company_registration_doc' | 'proof_of_address' | 'vat_certificate';
}

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');

  // Step 1: Account Details
  const [accountData, setAccountData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    position: '',
    email: '',
    primaryPhone: '',
    secondaryPhone: '',
    preferredContact: 'Primary Phone',
    password: '',
    confirmPassword: '',
  });

  // Step 2: Company Details
  const [companyData, setCompanyData] = useState({
    companyName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zipCode: '',
    country: '',
    registrationNumber: '',
    vatNumber: '',
    directorName: '',
  });

  // Step 3: Documents
  const [documents, setDocuments] = useState<{
    photoId: DocumentFile | null;
    companyReg: DocumentFile | null;
    proofOfAddress: DocumentFile | null;
    vatCert: DocumentFile | null;
  }>({
    photoId: null,
    companyReg: null,
    proofOfAddress: null,
    vatCert: null,
  });

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'Spain', 'Italy', 'Netherlands', 'Belgium', 'Switzerland',
    'Austria', 'Ireland', 'Portugal', 'Denmark', 'Sweden', 'Norway',
    'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Greece', 'Other'
  ];

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccountData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileSelect = (docType: 'photoId' | 'companyReg' | 'proofOfAddress' | 'vatCert', file: File) => {
    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file)
    }) as DocumentFile;
    
    setDocuments(prev => ({ ...prev, [docType]: fileWithPreview }));
  };

  const removeDocument = (docType: 'photoId' | 'companyReg' | 'proofOfAddress' | 'vatCert') => {
    if (documents[docType]?.preview) {
      URL.revokeObjectURL(documents[docType]!.preview!);
    }
    setDocuments(prev => ({ ...prev, [docType]: null }));
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!accountData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!accountData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!accountData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!accountData.primaryPhone.trim()) newErrors.primaryPhone = 'Primary phone is required';
    if (!accountData.password) {
      newErrors.password = 'Password is required';
    } else if (accountData.password.length < 12) {
      newErrors.password = 'Password must be at least 12 characters';
    }
    if (accountData.password !== accountData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!companyData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!companyData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!companyData.city.trim()) newErrors.city = 'City is required';
    if (!companyData.country) newErrors.country = 'Country is required';
    if (!companyData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
    if (!companyData.directorName.trim()) newErrors.directorName = 'Director name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!documents.photoId) newErrors.photoId = 'Photo ID is required';
    if (!documents.companyReg) newErrors.companyReg = 'Company registration document is required';
    if (!documents.proofOfAddress) newErrors.proofOfAddress = 'Proof of address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setGeneralError('');
    
    if (currentStep === 1 && validateStep1()) {
      toast.success('Step 1 completed!');
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      toast.success('Step 2 completed!');
      setCurrentStep(3);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as RegistrationStep);
      setErrors({});
      setGeneralError('');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) {
      return;
    }

    setIsSubmitting(true);
    setGeneralError('');

    try {
      // Step 1: Sign up user
      const { data: authData, error: authError } = await authHelpers.signUp(
        accountData.email,
        accountData.password
      );

      if (authError) {
        // Handle specific Supabase auth errors
        if (authError.includes('already registered') || authError.includes('already been registered')) {
          setGeneralError('This email is already registered. Please use a different email or try logging in.');
        } else {
          setGeneralError(authError);
        }
        setIsSubmitting(false);
        return;
      }

      if (!authData?.user) {
        setGeneralError('Failed to create user account');
        setIsSubmitting(false);
        return;
      }

      const userId = authData.user.id;

      // Wait a moment to ensure user is fully created in database
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 2: Insert profile
      console.log('🔵 Step 2: Inserting profile for user:', userId);
      const { error: profileError } = await dbHelpers.insertProfile(userId, {
        first_name: accountData.firstName,
        middle_name: accountData.middleName || undefined,
        last_name: accountData.lastName,
        position: accountData.position || undefined,
        primary_phone: accountData.primaryPhone,
        secondary_phone: accountData.secondaryPhone || undefined,
        preferred_contact: accountData.preferredContact,
      });

      if (profileError) {
        console.error('❌ Profile insert failed:', profileError);
        toast.error(`Profile Error: ${profileError}`);
        setGeneralError(`Profile Error: ${profileError}`);
        setIsSubmitting(false);
        return;
      }
      console.log('✅ Profile inserted successfully');
      toast.success('Profile created successfully!');

      // Step 3: Insert company
      console.log('🔵 Step 3: Inserting company for user:', userId);
      const { error: companyError } = await dbHelpers.insertCompany(userId, {
        company_name: companyData.companyName,
        address_line1: companyData.addressLine1,
        address_line2: companyData.addressLine2 || undefined,
        city: companyData.city,
        zip_code: companyData.zipCode || undefined,
        country: companyData.country,
        registration_number: companyData.registrationNumber,
        vat_number: companyData.vatNumber || undefined,
        director_name: companyData.directorName,
      });

      if (companyError) {
        console.error('❌ Company insert failed:', companyError);
        toast.error(`Company Error: ${companyError}`);
        setGeneralError(`Company Error: ${companyError}`);
        setIsSubmitting(false);
        return;
      }
      console.log('✅ Company inserted successfully');
      toast.success('Company information saved!');

      // Step 4: Upload documents
      console.log('🔵 Step 4: Uploading documents...');
      const uploadPromises = [];

      if (documents.photoId) {
        uploadPromises.push(
          storageHelpers.uploadDocument(userId, documents.photoId, 'photo_id')
            .then(({ data, error }) => {
              if (error) {
                console.error('❌ Photo ID upload failed:', error);
                throw new Error(error || 'Failed to upload photo ID');
              }
              console.log('✅ Photo ID uploaded');
              if (data) {
                return dbHelpers.insertDocument(userId, 'photo_id', data.path);
              }
              throw new Error('Failed to upload photo ID');
            })
        );
      }

      if (documents.companyReg) {
        uploadPromises.push(
          storageHelpers.uploadDocument(userId, documents.companyReg, 'company_registration_doc')
            .then(({ data, error }) => {
              if (error) {
                console.error('❌ Company reg upload failed:', error);
                throw new Error(error || 'Failed to upload company registration');
              }
              console.log('✅ Company reg uploaded');
              if (data) {
                return dbHelpers.insertDocument(userId, 'company_registration_doc', data.path);
              }
              throw new Error('Failed to upload company registration');
            })
        );
      }

      if (documents.proofOfAddress) {
        uploadPromises.push(
          storageHelpers.uploadDocument(userId, documents.proofOfAddress, 'proof_of_address')
            .then(({ data, error }) => {
              if (error) {
                console.error('❌ Proof of address upload failed:', error);
                throw new Error(error || 'Failed to upload proof of address');
              }
              console.log('✅ Proof of address uploaded');
              if (data) {
                return dbHelpers.insertDocument(userId, 'proof_of_address', data.path);
              }
              throw new Error('Failed to upload proof of address');
            })
        );
      }

      if (documents.vatCert) {
        uploadPromises.push(
          storageHelpers.uploadDocument(userId, documents.vatCert, 'vat_certificate')
            .then(({ data, error }) => {
              if (error) {
                console.error('❌ VAT cert upload failed:', error);
                throw new Error(error || 'Failed to upload VAT certificate');
              }
              console.log('✅ VAT cert uploaded');
              if (data) {
                return dbHelpers.insertDocument(userId, 'vat_certificate', data.path);
              }
              throw new Error('Failed to upload VAT certificate');
            })
        );
      }

      console.log('🔵 Waiting for all document uploads to complete...');
      const uploadToast = toast.loading('Uploading documents...');
      await Promise.all(uploadPromises);
      toast.success('All documents uploaded successfully!', { id: uploadToast });
      console.log('✅ All documents uploaded and recorded successfully!');

      // Success - navigate to application received
      console.log('✅ Registration complete! Redirecting...');
      toast.success('🎉 Registration complete! Redirecting...', { duration: 2000 });
      setTimeout(() => {
        navigate('/application-received');
      }, 1000);
    } catch (error: any) {
      console.error('❌ Registration error:', error);
      toast.error(error.message || 'An error occurred during registration');
      setGeneralError(error.message || 'An error occurred during registration');
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Account Details' },
    { number: 2, title: 'Company Details' },
    { number: 3, title: 'Document Upload' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full space-y-8 relative z-10"
      >
        {/* Logo and Title */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center space-x-3 mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <img 
                src="/assets/logo.png" 
                alt="CIGATY Logo" 
                className="w-16 h-16 object-contain"
              />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-light">CIGATY</h2>
              <p className="text-xs text-gold">India’s First B2B Liquor Exchange</p>
            </div>
          </Link>
          
          <h1 className="text-3xl font-bold text-light">Create Your Account</h1>
          <p className="mt-2 text-gray-400">
            Join the world's leading B2B drinks marketplace
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: currentStep === step.number ? 1.1 : 1,
                      backgroundColor: currentStep >= step.number ? '#D4AF37' : '#2a2a2a',
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step.number ? 'text-dark' : 'text-gray-400'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle size={24} />
                    ) : (
                      step.number
                    )}
                  </motion.div>
                  <span className={`text-xs mt-2 ${
                    currentStep >= step.number ? 'text-gold' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.number ? 'bg-gold' : 'bg-dark-light'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="card bg-dark-lighter/80 backdrop-blur-lg"
        >
          {generalError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-wine/20 border border-wine rounded-lg flex items-start"
            >
              <AlertCircle className="w-5 h-5 text-wine mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-light">{generalError}</p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Account Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={accountData.firstName}
                    onChange={handleAccountChange}
                    error={errors.firstName}
                    placeholder="John"
                    icon={<User size={20} />}
                    required
                  />
                  <Input
                    label="Middle Name"
                    name="middleName"
                    value={accountData.middleName}
                    onChange={handleAccountChange}
                    placeholder="Michael"
                    icon={<User size={20} />}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={accountData.lastName}
                    onChange={handleAccountChange}
                    error={errors.lastName}
                    placeholder="Doe"
                    icon={<User size={20} />}
                    required
                  />
                </div>

                <Input
                  label="Position"
                  name="position"
                  value={accountData.position}
                  onChange={handleAccountChange}
                  placeholder="CEO, Sales Director, etc."
                  icon={<Briefcase size={20} />}
                />

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={accountData.email}
                  onChange={handleAccountChange}
                  error={errors.email}
                  placeholder="john@company.com"
                  icon={<Mail size={20} />}
                  required
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Primary Phone"
                    name="primaryPhone"
                    type="tel"
                    value={accountData.primaryPhone}
                    onChange={handleAccountChange}
                    error={errors.primaryPhone}
                    placeholder="+1 (234) 567-890"
                    icon={<Phone size={20} />}
                    required
                  />
                  <Input
                    label="Secondary Phone"
                    name="secondaryPhone"
                    type="tel"
                    value={accountData.secondaryPhone}
                    onChange={handleAccountChange}
                    placeholder="+1 (234) 567-891"
                    icon={<Phone size={20} />}
                  />
                </div>

                <div>
                  <label className="block text-light font-medium mb-2">
                    Preferred Contact Method <span className="text-wine">*</span>
                  </label>
                  <select
                    name="preferredContact"
                    value={accountData.preferredContact}
                    onChange={handleAccountChange}
                    className="input-field"
                  >
                    <option value="Primary Phone">Primary Phone</option>
                    <option value="Email">Email</option>
                  </select>
                </div>

                <div className="relative">
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={accountData.password}
                    onChange={handleAccountChange}
                    error={errors.password}
                    placeholder="••••••••••••"
                    icon={<Lock size={20} />}
                    helperText="Minimum 12 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-11 text-gray-400 hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={accountData.confirmPassword}
                  onChange={handleAccountChange}
                  error={errors.confirmPassword}
                  placeholder="••••••••••••"
                  icon={<Lock size={20} />}
                  required
                />
              </motion.div>
            )}

            {/* Step 2: Company Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Input
                  label="Company Name"
                  name="companyName"
                  value={companyData.companyName}
                  onChange={handleCompanyChange}
                  error={errors.companyName}
                  placeholder="Your Company Ltd."
                  icon={<Building2 size={20} />}
                  required
                />

                <Input
                  label="Address Line 1"
                  name="addressLine1"
                  value={companyData.addressLine1}
                  onChange={handleCompanyChange}
                  error={errors.addressLine1}
                  placeholder="123 Business Street"
                  icon={<MapPin size={20} />}
                  required
                />

                <Input
                  label="Address Line 2"
                  name="addressLine2"
                  value={companyData.addressLine2}
                  onChange={handleCompanyChange}
                  placeholder="Suite 100"
                  icon={<MapPin size={20} />}
                />

                <div className="grid md:grid-cols-3 gap-6">
                  <Input
                    label="City"
                    name="city"
                    value={companyData.city}
                    onChange={handleCompanyChange}
                    error={errors.city}
                    placeholder="New York"
                    icon={<MapPin size={20} />}
                    required
                  />
                  <Input
                    label="ZIP / Postal Code"
                    name="zipCode"
                    value={companyData.zipCode}
                    onChange={handleCompanyChange}
                    placeholder="10001"
                    icon={<MapPin size={20} />}
                  />
                  <div>
                    <label className="block text-light font-medium mb-2">
                      Country <span className="text-wine">*</span>
                    </label>
                    <select
                      name="country"
                      value={companyData.country}
                      onChange={handleCompanyChange}
                      className="input-field"
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-wine text-sm mt-1">{errors.country}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Company Registration Number"
                    name="registrationNumber"
                    value={companyData.registrationNumber}
                    onChange={handleCompanyChange}
                    error={errors.registrationNumber}
                    placeholder="12345678"
                    icon={<FileText size={20} />}
                    required
                  />
                  <Input
                    label="VAT Number (Optional)"
                    name="vatNumber"
                    value={companyData.vatNumber}
                    onChange={handleCompanyChange}
                    placeholder="GB123456789"
                    icon={<FileText size={20} />}
                  />
                </div>

                <Input
                  label="Director Name"
                  name="directorName"
                  value={companyData.directorName}
                  onChange={handleCompanyChange}
                  error={errors.directorName}
                  placeholder="Full name of company director"
                  icon={<User size={20} />}
                  required
                  helperText="Enter the primary director's name"
                />
              </motion.div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-light mb-2">Upload Required Documents</h3>
                  <p className="text-gray-400 mb-6">
                    Please upload clear copies of the following documents. Supported formats: PDF, PNG, JPG (Max 10MB per file)
                  </p>

                  {/* Photo ID */}
                  <DocumentUploadField
                    label="Photo ID (Passport, Driver's License, or National ID)"
                    required
                    file={documents.photoId}
                    error={errors.photoId}
                    onSelect={(file) => handleFileSelect('photoId', file)}
                    onRemove={() => removeDocument('photoId')}
                  />

                  {/* Company Registration */}
                  <DocumentUploadField
                    label="Company Registration Document"
                    required
                    file={documents.companyReg}
                    error={errors.companyReg}
                    onSelect={(file) => handleFileSelect('companyReg', file)}
                    onRemove={() => removeDocument('companyReg')}
                  />

                  {/* Proof of Address */}
                  <DocumentUploadField
                    label="Proof of Address (Utility Bill, Bank Statement)"
                    required
                    file={documents.proofOfAddress}
                    error={errors.proofOfAddress}
                    onSelect={(file) => handleFileSelect('proofOfAddress', file)}
                    onRemove={() => removeDocument('proofOfAddress')}
                  />

                  {/* VAT Certificate (Optional) */}
                  <DocumentUploadField
                    label="VAT Certificate (Optional)"
                    required={false}
                    file={documents.vatCert}
                    onSelect={(file) => handleFileSelect('vatCert', file)}
                    onRemove={() => removeDocument('vatCert')}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}
            
            <div className={currentStep === 1 ? 'ml-auto' : ''}>
              {currentStep < 3 ? (
                <Button
                  variant="secondary"
                  onClick={handleNext}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Login Link */}
        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-gold hover:text-gold-light font-semibold transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

// Document Upload Field Component
interface DocumentUploadFieldProps {
  label: string;
  required: boolean;
  file: DocumentFile | null;
  error?: string;
  onSelect: (file: File) => void;
  onRemove: () => void;
}

const DocumentUploadField = ({ label, required, file, error, onSelect, onRemove }: DocumentUploadFieldProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxSize: 10 * 1024 * 1024,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onSelect(acceptedFiles[0]);
      }
    },
  });

  return (
    <div className="mb-6">
      <label className="block text-light font-medium mb-2">
        {label} {required && <span className="text-wine">*</span>}
      </label>

      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-gold bg-gold/10'
              : error
              ? 'border-wine bg-wine/10'
              : 'border-dark-light hover:border-gold/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 text-gold mx-auto mb-2" />
          {isDragActive ? (
            <p className="text-light">Drop the file here...</p>
          ) : (
            <>
              <p className="text-light text-sm mb-1">Drag & drop or click to select</p>
              <p className="text-xs text-gray-400">PDF, PNG, JPG up to 10MB</p>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-dark rounded-lg border border-dark-light">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-gold" />
            <div>
              <p className="text-light font-medium text-sm">{file.name}</p>
              <p className="text-xs text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-wine transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {error && (
        <p className="text-wine text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Register;
