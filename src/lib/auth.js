import { supabase } from './supabase'
import bcrypt from 'bcryptjs'

/**
 * Hash password using bcrypt
 * More secure than SHA-256 with built-in salting
 * 
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Bcrypt hashed password
 */
export const hashPassword = async (password) => {
  try {
    // Generate salt with cost factor of 10 (good balance of security and performance)
    const salt = await bcrypt.genSalt(10)
    
    // Hash password with salt
    const hashedPassword = await bcrypt.hash(password, salt)
    