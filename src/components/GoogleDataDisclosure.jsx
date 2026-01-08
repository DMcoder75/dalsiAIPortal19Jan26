import { X, Shield, Mail, User, Image as ImageIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

/**
 * GoogleDataDisclosure Component
 * Shows data disclosure before redirecting to Google OAuth
 * Informs user what data will be collected
 */
export default function GoogleDataDisclosure({
  isOpen,
  onClose,
  onContinue,
  isLoading = false
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Sign in with Google</CardTitle>
            <CardDescription>We'll access your Google account information</CardDescription>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Security Notice */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex gap-3">
            <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-600">Secure Connection</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your data is encrypted and secured by Google OAuth
              </p>
            </div>
          </div>

          {/* Data Collection Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              📋 We Will Access:
            </h3>
            <div className="space-y-3">
              {/* Email */}
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email Address</p>
                  <p className="text-xs text-muted-foreground">
                    Used for account login and notifications
                  </p>
                </div>
              </div>

              {/* Name */}
              <div className="flex gap-3">
                <User className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Full Name</p>
                  <p className="text-xs text-muted-foreground">
                    Used for your profile and communications
                  </p>
                </div>
              </div>

              {/* Profile Picture */}
              <div className="flex gap-3">
                <ImageIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Profile Picture</p>
                  <p className="text-xs text-muted-foreground">
                    To personalize your account experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">
              <strong>Privacy:</strong> Your data is protected by our{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . We never share your information with third parties.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onContinue}
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Connecting...' : 'Continue to Google'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
