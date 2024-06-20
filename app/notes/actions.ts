'use server'

import { createSupabaseServer } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

const supabase = createSupabaseServer()

export async function addTodo(formData: FormData) {
  const title = formData.get('title')
  await supabase.from('notes').upsert({ title })
  revalidatePath('/notes')
}
