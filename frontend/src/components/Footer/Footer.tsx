import { RestrictedFooter } from '@opengovsg/design-system-react'

function OgpFooter() {
  return (
    <RestrictedFooter
      appName="Spotlight"
      tagline="Shining light on problems faced by public officers"
      footerLinks={[
        {
          label: 'Help Center',
          href: '',
        },
        {
          label: 'Privacy',
          href: '',
        },
        {
          label: 'Terms of Use',
          href: '',
        },
        {
          label: 'Report Vulnerability',
          href: '',
        },
      ]}
    />
  )
}

export default OgpFooter
