import { createSupabaseServer } from '@/utils/supabase/server'

export default async function UserPage({
  params,
}: {
  params: { fid: string }
}) {
  const supabase = createSupabaseServer()
  const { data } = await supabase
    .from('links')
    .select()
    .eq('fid', params.fid)
    .limit(1)
    .maybeSingle()

  if (!data) {
    return <div className="max-w-3xl mx-auto py-8 px-6">No Links Found</div>
  }

  const res = await fetch('https://hub.pinata.cloud/v1/userDataByFid', {
    method: 'GET',
  })

  const farcasterUser = await res.json()
  console.log('farcaster', farcasterUser)

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      Website:{' '}
      <a className="underline hover:no-underline" href={data.website}>
        {data.website}
      </a>
    </div>
  )
}
