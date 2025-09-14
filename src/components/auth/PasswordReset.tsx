import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle,
  Send,
  Shield
} from "lucide-react";

interface PasswordResetProps {
  onBack: () => void;
}

export const ForgotPassword = ({ onBack }: PasswordResetProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  // Demo user emails for validation
  const validEmails = [
    "eyituoyo@portfolio.com",
    "big7member@portfolio.com", 
    "manager@portfolio.com",
    "vendor@portfolio.com",
    "customer@portfolio.com"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Check if email exists in demo data
    if (!validEmails.includes(email)) {
      setError("No account found with this email address");
      setIsLoading(false);
      return;
    }

    setIsEmailSent(true);
    setIsLoading(false);
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  if (isEmailSent) {
    return (
      <Card className="w-full max-w-md mx-auto backdrop-blur-md bg-white/90 shadow-2xl border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>
            We've sent a password reset link to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              Click the link in the email to reset your password. The link will expire in 15 minutes.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button 
              onClick={handleResendEmail} 
              disabled={isLoading} 
              variant="outline" 
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Sending..." : "Resend Email"}
            </Button>
            
            <Button onClick={onBack} variant="ghost" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or try again.
          </div>
        </CardContent>
      </Card>
    );
  }

    return (
      <Card className="w-full max-w-md mx-auto backdrop-blur-md bg-white/90 shadow-2xl border-white/20">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <Lock className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">Reset Your Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Demo Email Hints */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium mb-2">Demo Reset Emails:</div>
              <div className="space-y-1 text-sm">
                {validEmails.slice(0, 3).map((demoEmail, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="mr-2 mb-1 cursor-pointer hover:bg-muted"
                    onClick={() => setEmail(demoEmail)}
                  >
                    {demoEmail}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 text-xs">Click any email to auto-fill</div>
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Reset Link...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Reset Link
                </>
              )}
            </Button>
            
            <Button onClick={onBack} type="button" variant="ghost" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

interface ResetPasswordFormProps {
  token?: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const ResetPasswordForm = ({ token, onSuccess, onBack }: ResetPasswordFormProps) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.newPassword.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.newPassword) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(formData.newPassword) },
    { text: "Contains number", met: /\d/.test(formData.newPassword) },
    { text: "Contains special character", met: /[!@#$%^&*(),.?\":{}|<>]/.test(formData.newPassword) }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.met);
  const passwordsMatch = formData.newPassword === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!isPasswordValid) {
      setError("Password does not meet requirements");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    onSuccess();
  };

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-md bg-white/90 shadow-2xl border-white/20">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Shield className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Set New Password</CardTitle>
        <CardDescription>
          Choose a strong password for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Password Requirements */}
          {formData.newPassword && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Password Requirements</Label>
              <div className="space-y-1">
                {passwordRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className={`h-4 w-4 rounded-full flex items-center justify-center ${
                      requirement.met 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {requirement.met && <Check className="h-3 w-3" />}
                    </div>
                    <span className={requirement.met ? 'text-green-600' : 'text-muted-foreground'}>
                      {requirement.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Password Match Indicator */}
          {formData.confirmPassword && (
            <div className="flex items-center gap-2 text-sm">
              <div className={`h-4 w-4 rounded-full flex items-center justify-center ${
                passwordsMatch 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {passwordsMatch && <Check className="h-3 w-3" />}
                {!passwordsMatch && <AlertCircle className="h-3 w-3" />}
              </div>
              <span className={passwordsMatch ? 'text-green-600' : 'text-red-600'}>
                {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
              </span>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !isPasswordValid || !passwordsMatch}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating Password...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Reset Password
                </>
              )}
            </Button>
            
            <Button onClick={onBack} type="button" variant="ghost" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Success component
export const PasswordResetSuccess = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-md bg-white/90 shadow-2xl border-white/20">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Password Reset Successful</CardTitle>
        <CardDescription>
          Your password has been updated successfully
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Your account is now secure with your new password. You can now log in using your new credentials.
          </AlertDescription>
        </Alert>

        <Button onClick={onContinue} className="w-full">
          Continue to Login
        </Button>
      </CardContent>
    </Card>
  );
};