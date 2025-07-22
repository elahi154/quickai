import React, { useEffect, useState } from 'react'
import { Gem, Sparkles } from 'lucide-react'
import CreationIteam from '../components/CreationIteam'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

const Dashboard = () => {
  const [creations, setCreations] = useState([])
  const [plan, setPlan] = useState('Free') // ✅ new plan state
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded) {
      console.log('Clerk User:', user)
    }
  }, [isLoaded, user])

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if (data.success) {
        setCreations(data.creations)
        setPlan(data.plan === 'premium' ? 'Premium' : 'Free') // ✅ update plan from backend
      } else {
        toast.error(data.message || 'Failed to fetch creations')
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while fetching creations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoaded) {
      getDashboardData()
    }
  }, [isLoaded])

  return (
    <div className='h-full overflow-y-scroll p-6'>
      <div className='flex justify-start gap-4 flex-wrap'>

        {/* Total Creations Card */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white' />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-xl font-semibold'>{plan}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white' />
          </div>
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className='flex justify-center items-center h-3/4'>
          <div className='w-11 h-11 animate-spin rounded-full border-3 border-t-transparent border-purple-500'></div>
        </div>
      ) : (
        <div className='mt-6 space-y-3'>
          <p className='text-slate-600'>Recent Creations</p>
          {creations.map((item) => <CreationIteam key={item.id} item={item} />)}
        </div>
      )}

      {/* Bottom Section: Recent Creations Again */}
      <div className='space-y-3'>
        <p className='mt-6 mb-4'>Recent Creations</p>
        {creations.map((item) => <CreationIteam key={item.id} item={item} />)}
      </div>
    </div>
  )
}

export default Dashboard
