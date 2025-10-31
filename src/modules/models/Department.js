import { supabase } from '@/lib/supabaseClient'

export default class Department {
  constructor({ id, name, floor, tenant, created_at }) {
    this.id = id
    this.name = name
    this.floor = floor
    this.tenant = tenant
    this.created_at = created_at
  }

  static async create({ name, floor, tenant }) {
    const { data, error } = await supabase
      .from('departments')
      .insert([{ name, floor, tenant }])
      .select()
      .single()
    if (error) throw error
    return new Department(data)
  }

  static async getAll() {
    const { data, error } = await supabase.from('departments').select('*')
    if (error) throw error
    return data.map((dept) => new Department(dept))
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return new Department(data)
  }

}
