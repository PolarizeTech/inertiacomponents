export interface TranslationsConfig {
  translations: object
  locale: string
}

export interface RoutesConfigProps {
  routes: object
}

export interface Link {
  route?: string|Array<string|object>
  href?: string
  method?: string
}

export interface NavLink {
  route?: string|Array<string|object>
  href?: string
  active?: boolean
}

export interface NavItem {
  name: string
  href: string
  icon: string
  current: boolean
}

type DateTime = string

export type Nullable<T> = T | null

export interface User {
  id: number
  name: string
  email: string
  current_team_id: Nullable<number>
  profile_photo_path: Nullable<string>
  profile_photo_url: string
  two_factor_enabled: boolean
  email_verified_at: Nullable<DateTime>
  created_at: DateTime
  updated_at: DateTime
}

export type InertiaSharedProps<T = {}> = T & {
  jetstream: JetstreamSharedProps
  user: User & {
    all_teams?: Team[]
    current_team?: Team
  }
  errorBags: any
  errors: any
}

// Jetstream Types

export interface Team {
  id: number
  name: string
  personal_team: boolean
  created_at: DateTime
  updated_at: DateTime
}

export interface Session {
  id: number
  ip_address: string
  is_current_device: boolean
  agent: {
    is_desktop: boolean
    platform: string
    browser: string
  }
  last_active: DateTime
}

export interface ApiToken {
  id: number
  name: string
  abilities: string[]
  last_used_ago: Nullable<DateTime>
  created_at: DateTime
  updated_at: DateTime
}

export interface JetstreamSharedProps {
  canCreateTeams: boolean
  canManageTwoFactorAuthentication: boolean
  canUpdatePassword: boolean
  canUpdateProfileInformation: boolean
  flash: any
  hasAccountDeletionFeatures: boolean
  hasApiFeatures: boolean
  hasTeamFeatures: boolean
  hasTermsAndPrivacyPolicyFeature: boolean
  managesProfilePhotos: boolean
}

export interface JetstreamTeamPermissions {
  canAddTeamMembers: boolean
  canDeleteTeam: boolean
  canRemoveTeamMembers: boolean
  canUpdateTeam: boolean
}

export interface Role {
  key: string
  name: string
  permissions: string[]
  description: string
}

export interface TeamInvitation {
  id: number
  team_id: number
  email: string
  role: Nullable<string>
  created_at: DateTime
  updated_at: DateTime
}