import { useState } from 'react'
import { X, Check } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'

/**
 * GoogleProfileSetup Component
 * Allows user to review and complete their profile after Google OAuth
 * Includes data disclosure and terms agreement
 */
export default function GoogleProfileSetup({
  isOpen,
  googleData,
  onClose,
  onSubmit,
  isLoading = false
}) {
  const [profileData, setProfileData] = useState({
    firstName: googleData?.given_name || '',
    lastName: googleData?.family_name || '',
    email: googleData?.email || '',
    companyName: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  })
  const [error, setError] = useState('')

  if (!isOpen || !googleData) return null

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!profileData.firstName.trim()) {
      setError('First name is required')
      return
    }
    if (!profileData.lastName.trim()) {
      setError('Last name is required')
      return
    }
    if (!profileData.agreeToTerms) {
      setError('You must agree to the Terms of Service')
      return
    }
    if (!profileData.agreeToPrivacy) {
      setError('You must agree to the Privacy Policy')
      return
    }

    await onSubmit(profileData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border">
          <div>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>Review your information from Google</CardDescription>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Data Disclosure Section */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">📋 Data We're Using</h3>
            <p className="text-sm text-muted-foreground mb-3">
              We'll access the following information from your Google account:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span><strong>Full Name</strong> - For your profile and communications</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span><strong>Email Address</strong> - For account login and notifications</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span><strong>Profile Picture</strong> - To personalize your account</span>
              </li>
            </ul>
          </div>

          {/* Profile Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Your Profile Information</h3>

            {/* First Name */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                First Name *
              </label>
              <Input
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                disabled={isLoading}
                className="bg-input border-border text-foreground"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Last Name *
              </label>
              <Input
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                disabled={isLoading}
                className="bg-input border-border text-foreground"
              />
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Email Address
              </label>
              <Input
                name="email"
                value={profileData.email}
                disabled
                className="bg-muted border-border text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Your Google email (cannot be changed)
              </p>
            </div>

            {/* Company Name */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Company Name (Optional)
              </label>
              <Input
                name="companyName"
                value={profileData.companyName}
                onChange={handleInputChange}
                placeholder="Your company name"
                disabled={isLoading}
                className="bg-input border-border text-foreground"
              />
            </div>
          </div>

          {/* Terms & Privacy Section */}
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                name="agreeToTerms"
                checked={profileData.agreeToTerms}
                onChange={handleInputChange}
                disabled={isLoading}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{' '}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Terms of Service
                </a>
                {' '}*
              </label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="privacy"
                name="agreeToPrivacy"
                checked={profileData.agreeToPrivacy}
                onChange={handleInputChange}
                disabled={isLoading}
                className="mt-1"
              />
              <label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </a>
                {' '}*
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
