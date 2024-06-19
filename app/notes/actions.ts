'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

const supabase = createClient()

export async function addTodo(formData: FormData) {
  const title = formData.get('title')
  await supabase.from('notes').upsert({ title })
  revalidatePath('/notes')
}
