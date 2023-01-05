import React from '@pckg/preact/compat'
import DeleteUserForm from '@ja-inertia/react/jetstream/Pages/Profile/Partials/DeleteUserForm'
import LogoutOtherBrowserSessions from '@ja-inertia/react/jetstream/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm'
import TwoFactorAuthenticationForm from '@ja-inertia/react/jetstream/Pages/Profile/Partials/TwoFactorAuthenticationForm'
import UpdatePasswordForm from '@ja-inertia/react/jetstream/Pages/Profile/Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from '@ja-inertia/react/jetstream/Pages/Profile/Partials/UpdateProfileInformationForm'
import { useTypedPage } from '@ja-inertia//utils'
import SectionBorder from '@ja-inertia/react/jetstream/components/SectionBorder'
import { Session, Team, NavItem } from '@ja-inertia/react/jetstream/types'
import { AppLayout } from '@blazervel-ui/components'

interface Props {
  team: Team
  teams: Array<Team>
  navigation: Array<NavItem>
  sessions: Session[]
  confirmsTwoFactorAuthentication: boolean
  alerts: Array<object>
}

export default ({ team, teams, navigation, alerts, sessions, confirmsTwoFactorAuthentication }: Props) => {

  const page = useTypedPage()

  return (
    <AppLayout
      navigation={navigation}
      alerts={alerts}
      team={team}
      teams={teams}
    >
      {page.props.jetstream.canUpdateProfileInformation ? (
        <div>
          <UpdateProfileInformationForm user={page.props.user} profilePhotoUrl={page.props.profilePhotoUrl} />
          <SectionBorder />
        </div>
      ) : null}

      {page.props.jetstream.canUpdatePassword ? (
        <div className="mt-10 sm:mt-0">
          <UpdatePasswordForm />

          <SectionBorder />
        </div>
      ) : null}

      {page.props.jetstream.canManageTwoFactorAuthentication ? (
        <div className="mt-10 sm:mt-0">
          <TwoFactorAuthenticationForm
            requiresConfirmation={confirmsTwoFactorAuthentication}
          />

          <SectionBorder />
        </div>
      ) : null}

      <div className="mt-10 sm:mt-0">
        <LogoutOtherBrowserSessions sessions={sessions} />
      </div>

      {page.props.jetstream.hasAccountDeletionFeatures ? (
        <>
          <SectionBorder />

          <div className="mt-10 sm:mt-0">
            <DeleteUserForm />
          </div>
        </>
      ) : null}
    </AppLayout>
  )
}
