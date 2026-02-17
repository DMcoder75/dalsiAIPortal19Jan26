import { useState } from 'react'
import { Button } from './ui/button'
import { Menu, X, ChevronDown, User, CreditCard, LogOut } from 'lucide-react'
import logo from '../assets/DalSiAILogo2.png'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
 const [isMenuOpen, setIsMenuOpen] = useState(false)
 const [showUserMenu, setShowUserMenu] = useState(false)
 const isHomePage = window.location.pathname === '/'
 const { user, loading, logout } = useAuth()
