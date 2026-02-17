import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import logo from '../assets/DalSiAILogo2.png'
import Breadcrumb from '../components/Breadcrumb'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('verifying') // verifying, success, error
  const [message, setMessage] = useState('Verifying your email...')
  const [showBreadcrumb] = useState(true)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token')
        const email = searchParams.get('email')

        if (!token || !email) {
          setStatus('error')
          setMessage('Invalid verification link. Please check your email and try again.')
          return
        }

        // Check if user exists
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, email, email_verified')
          .eq('id', token)
          .eq('email', email)
          .single()

        if (userError || !userData) {
          setStatus('error')
          setMessage('Invalid verification link or user not found.')
          return
        }

        // Check if already verified
        if (userData.email_verified) {
          setStatus('success')
          setMessage('Your email is already verified! You can now sign in.')
          return
        }

        // Update user as verified
        const { error: updateError } = await supabase
          .from('users')
          .update({
            email_verified: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', token)

        if (updateError) {
          throw updateError
        }

        // Create a welcome notification
        await supabase.from('notifications').insert([{
          user_id: token,
          title: 'Welcome to Dalsi AI!',
          message: 'Your email has been verified successfully. Start exploring our AI solutions.',
          type: 'success'
        }])

        setStatus('success')
        setMessage('Email verified successfully! You can now sign in to your account.')

      } catch (error) {