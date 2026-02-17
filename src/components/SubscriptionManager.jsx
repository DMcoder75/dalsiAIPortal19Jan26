/**
 * Subscription Manager Component
 * Displays current subscription and allows tier changes
 */

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { Check, AlertCircle, Loader, ChevronRight } from 'lucide-react'
import { subscriptionManager } from '../lib/subscriptionManager'

export default function SubscriptionManager({ userId, onSubscriptionChange }) {
  const [currentSubscription, setCurrentSubscription] = useState(null)
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [changingTo, setChangingTo] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState([])

  // Load subscription and plans on mount
  useEffect(() => {
    loadSubscriptionData()
  }, [userId])

  const loadSubscriptionData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [subscription, availablePlans] = await Promise.all([
        subscriptionManager.getCurrentSubscription(userId),
        subscriptionManager.getAvailablePlans()
      ])

      setCurrentSubscription(subscription)
      setPlans(availablePlans)
    } catch (err) {