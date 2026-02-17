import { useEffect, useState } from 'react'
import { handleGmailCallback } from '../lib/jwtAuth'
import { subscriptionManager } from '../lib/subscriptionManager'
import { useAuth } from '../contexts/AuthContext'
import logger from '../lib/logger'

export default function GmailCallback() {
  const { login } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const processCallback = async () => {
      // Prevent duplicate processing
      if (isProcessing) {