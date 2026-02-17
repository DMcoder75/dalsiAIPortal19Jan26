/**
 * FrequentQueries Component
 * Displays frequently asked questions/popular prompts from the API
 * Shows in the left sidebar below conversations
 */

import React, { useState, useEffect } from 'react'
import { Sparkles, Loader } from 'lucide-react'
import logger from '../lib/logger'

export const FrequentQueries = ({ onQuerySelect }) => {