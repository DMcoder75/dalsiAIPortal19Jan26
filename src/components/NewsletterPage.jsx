import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { 
  Mail, 
  CheckCircle, 
  Brain, 
  Newspaper, 
  TrendingUp,
  Users,
  Bell,
  Star
} from 'lucide-react'
import Navigation from './Navigation'
import Footer from './Footer'
import { supabase } from '../lib/supabase'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [interests, setInterests] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const interestOptions = [
    { id: 'healthcare', label: 'Healthcare AI', icon: Brain },
    { id: 'education', label: 'Education Technology', icon: Users },
    { id: 'product', label: 'Product Updates', icon: TrendingUp },
    { id: 'research', label: 'AI Research', icon: Newspaper },
    { id: 'events', label: 'Events & Webinars', icon: Bell }
  ]

  const benefits = [
    {
      icon: Brain,
      title: "AI Insights",
      description: "Latest developments in artificial intelligence and machine learning"
    },
    {
      icon: TrendingUp,
      title: "Industry Trends",
      description: "Healthcare and education technology trends and analysis"
    },
    {
      icon: Star,
      title: "Exclusive Content",
      description: "Early access to new features, case studies, and research findings"
    },
    {
      icon: Users,
      title: "Community Updates",
      description: "Success stories from our user community and expert interviews"
    }
  ]

  const handleInterestToggle = (interestId) => {
    setInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{
          email,
          first_name: firstName,
          last_name: lastName,
          tags: interests,
          source: 'website'
        }])

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('This email is already subscribed to our newsletter.')
        }
        throw error
      }

      setSubscribed(true)
      setEmail('')
      setFirstName('')
      setLastName('')
      setInterests([])
    } catch (error) {