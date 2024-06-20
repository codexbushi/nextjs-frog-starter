import { createSupabaseServer } from '@/utils/supabase/server'

type FarcasterUser = {
  pfp: string
  displayName: string
  bio: string
}

async function getFarcasterUser(fid: string) {
  const res = await fetch(
    `https://hub.pinata.cloud/v1/userDataByFid?fid=${fid}`,
    {
      method: 'GET',
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  const user = data.messages.reduce(
    (acc: FarcasterUser, user) => {
      if (user.data.userDataBody.type === 'USER_DATA_TYPE_PFP') {
        acc.pfp = user.data.userDataBody.value
      }

      if (user.data.userDataBody.type === 'USER_DATA_TYPE_DISPLAY') {
        acc.displayName = user.data.userDataBody.value
      }

      if (user.data.userDataBody.type === 'USER_DATA_TYPE_BIO') {
        acc.bio = user.data.userDataBody.value
      }

      return acc
    },
    {
      pfp: '',
      displayName: '',
      bio: '',
    }
  )

  return user
}

export default async function UserPage({
  params,
}: {
  params: { fid: string }
}) {
  const { fid } = params

  const supabase = createSupabaseServer()
  const { data: linksData } = await supabase
    .from('links')
    .select()
    .eq('fid', fid)
    .limit(1)
    .maybeSingle()

  const farcasterUser = await getFarcasterUser(fid)

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <img className="w-24 h-24 rounded-full" src={farcasterUser.pfp} alt="" />
      <p className="mt-4">{farcasterUser.displayName}</p>
      <p>{farcasterUser.bio}</p>
      {!linksData && <p className="mt-4">No Links Found</p>}
      {linksData && (
        <p className="mt-4">
          Website:{' '}
          <a className="underline hover:no-underline" href={linksData.website}>
            {linksData.website}
          </a>
        </p>
      )}
    </div>
  )
}
