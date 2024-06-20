import { createSupabaseServer } from '@/utils/supabase/server'

export default async function UserPage({
  params,
}: {
  params: { fid: string }
}) {
  const { fid } = params

  const supabase = createSupabaseServer()
  const { data } = await supabase
    .from('links')
    .select()
    .eq('fid', fid)
    .limit(1)
    .maybeSingle()

  if (!data) {
    return <div className="max-w-3xl mx-auto py-8 px-6">No Links Found</div>
  }

  const res = await fetch(
    `https://hub.pinata.cloud/v1/userDataByFid?fid=${fid}&user_data_type=USER_DATA_TYPE_PFP`,
    {
      method: 'GET',
    }
  )

  const farcasterUser = await res.json()

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <img
        className="mx-auto w-24 h-24 rounded-full"
        src={farcasterUser.data.userDataBody.value}
        alt=""
      />
      <p className="mt-4 text-center">
        Website:{' '}
        <a className="underline hover:no-underline" href={data.website}>
          {data.website}
        </a>
      </p>
    </div>
  )
}
