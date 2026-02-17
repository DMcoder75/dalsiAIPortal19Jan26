import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
// import { supabase } from '../lib/supabase'
import { loginWithJWT, signupWithGmail, loginWithGmail } from '../lib/jwtAuth'
import { useAuth } from '../contexts/AuthContext'
import { subscriptionManager } from '../lib/subscriptionManager'
import { updateTrackerTier } from '../lib/rateLimitService'
import { migrateGuestConversations } from '../lib/guestMigrationService'
import { migrateGuestDataToRegistered, clearGuestSessionAfterMigration } from '../lib/guestToRegisteredMigration'
import { checkUserExists, checkUserExistsByGoogleId } from '../lib/userExistenceService'
import { getGuestUserId } from '../lib/guestUser'
// Google OAuth handled natively - no custom modals needed
import logo from '../assets/DalSiAILogo2.png'

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: ''
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  if (!isOpen) return null

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccessMessage('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()