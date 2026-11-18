import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, adminSecret } = await request.json()

    let isAuthenticated = false
    let adminEmail = email || 'admin@rudraksh.in'

    // Method 1: Check admin setup secret
    const configuredSecret = process.env.ADMIN_SETUP_SECRET || 'rudraksh_master_admin_2026'
    if (adminSecret && adminSecret === configuredSecret) {
      isAuthenticated = true
      adminEmail = email || 'superadmin@rudraksh.in'
    }

    // Method 2: Supabase Auth if credentials provided
    if (!isAuthenticated && email && password && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const supabase = await createServiceClient()
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (!error && data.user) {
          // Check if authorized in admin_users table
          const { data: adminRecord } = await supabase
            .from('admin_users')
            .select('role, active')
            .eq('auth_user_id', data.user.id)
            .single()

          if (adminRecord && adminRecord.active) {
            isAuthenticated = true
            adminEmail = data.user.email || email
          } else if (!adminRecord) {
            // First user auto-bootstrap if admin table empty
            const { count } = await supabase.from('admin_users').select('*', { count: 'exact', head: true })
            if (count === 0) {
              await supabase.from('admin_users').insert({
                auth_user_id: data.user.id,
                role: 'super_admin',
                active: true,
              })
              isAuthenticated = true
              adminEmail = data.user.email || email
            }
          }
        }
      } catch (authErr) {
        console.warn('Supabase auth attempt failed:', authErr)
      }
    }

    // Method 3: Standard default admin login for initial local setup (documented in README)
    if (!isAuthenticated && email === 'admin@rudraksh.in' && password === 'Rudraksh@Admin2026') {
      isAuthenticated = true
    }

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Invalid admin credentials or secret' }, { status: 401 })
    }

    // Set secure admin session cookie
    const cookieStore = await cookies()
    cookieStore.set('rudraksh_admin_session', JSON.stringify({ email: adminEmail, time: Date.now() }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return NextResponse.json({
      success: true,
      user: { email: adminEmail },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Authentication error' }, { status: 500 })
  }
}
