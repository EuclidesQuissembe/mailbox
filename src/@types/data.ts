export interface SubMenu {
  id: number
  name: string
}

export interface Menu {
  id: number
  name: string
  subMenus: SubMenu[]
}

export interface Items {
  id?: number
  subMenuItems: SubMenuItems[]
}

export interface SubMenuItems {
  id: number
  name: string
  subject: string
  owner: string
  users: [string]
}

export interface Auth {
  signed: boolean
  signIn: (email: string, password: string) => boolean
  logout: () => void
}