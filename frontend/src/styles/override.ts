import {
  DeepPartial,
  SystemStyleObjectRecord,
  Theme,
  ThemeComponents,
} from '@chakra-ui/react'

// Copy palette from figma as needed
const colors = {
  primary: {
    100: '#F6F7FA',
    200: '#DFE1F2',
    300: '#BCBFE3',
    400: '#868AC3',
    500: '#505798',
    600: '#3B4183',
    700: '#2F3476',
    800: '#222757',
    900: '#1B1E44',
  },
  secondary: {
    100: '#FEF5F5',
    200: '#F7CACA',
    300: '#F2A7A7',
    400: '#ED8585',
    500: '#EB6363',
    600: '#BF5151',
    700: '#994141',
    800: '#6F2F2F',
    900: '#451D1D',
  },
  success: {
    100: '#F0F8F3',
    200: '#E2F1E8',
    300: '#ADD8BE',
    400: '#77BF93',
    500: '#41A669',
    600: '#0C8C3F',
    700: '#097333',
    800: '#075C29',
    900: '#05431#',
  },
  danger: {
    100: '#FFF8F8',
    200: '#F8EAEA',
    300: '#E8C1C1',
    400: '#D88888',
    500: '#C05050',
    600: '#AD4848',
    700: '#9A4040',
    800: '#733030',
    900: '#602828',
  },
  warning: {
    100: '#FDF7F0',
    200: '#FCEFE4',
    300: '#F7D2B1',
    400: '#F1B57E',
    500: '#EC984B',
    600: '#E67C18',
    700: '#BB600B',
    800: '#97510F',
    900: '#6E3B0B',
  },
  neutral: {
    100: '#FBFCFD',
    200: '#F0F0F1',
    300: '#E1E2E4',
    400: '#C9CCCF',
    500: '#ABADB2',
    600: '#999B9F',
    700: '#636467',
    800: '#48494B',
    900: '#242425',
  },
}

const textStyles: SystemStyleObjectRecord = {
  display1: {
    fontSize: '4rem',
    lineHeight: '4.5rem',
    fontWeight: 'bold',
    letterSpacing: '-0.022em',
    fontFeatureSettings: `'cv05' on`,
  },
  display2: {
    fontSize: '2.5rem',
    lineHeight: '3rem',
    fontWeight: 600,
    letterSpacing: '-0.022em',
    fontFeatureSettings: `'cv05' on`,
  },
  h1: {
    fontSize: '3rem',
    lineHeight: '3.5rem',
    fontWeight: 300,
    letterSpacing: '-0.022em',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  h2: {
    fontSize: '1.7rem',
    lineHeight: '2.2rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  h3: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: 600,
    letterSpacing: '-0.019em',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  h4: {
    fontSize: '1.25rem',
    lineHeight: '2rem',
    fontWeight: 600,
    letterSpacing: '-0.017em',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  h5: {
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
    fontWeight: 500,
    letterSpacing: '-0.014em',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  subhead1: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 500,
    letterSpacing: '-0.011em',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  subhead2: {
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
    fontWeight: 500,
    letterSpacing: '-0.006em',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  subhead3: {
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 400,
    letterSpacing: '-0.011em',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: 400,
    letterSpacing: '-0.006em',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  caption1: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontWeight: 500,
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  caption2: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontWeight: 400,
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
  link: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 400,
    letterSpacing: '-0.011em',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
    textDecorationLine: 'underline',
  },
  linkSmall: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: 400,
    letterSpacing: '-0.006em',
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
    textDecorationLine: 'underline',
  },
  legal: {
    fontSize: '0.625rem',
    lineHeight: '0.75rem',
    fontWeight: 400,
    fontFeatureSettings: `'tnum' on, 'lnum' on, 'cv05' on`,
  },
}

const fonts: DeepPartial<Theme['fonts']> = {
  body: 'Inter, sans-serif',
  heading: 'Inter, sans-serif',
}

const styles = {
  global: {
    '#root': {
      minWidth: '100%',
      width: 'fit-content',
    },
    body: {
      background: 'primary.100',
    },
    th: {
      textAlign: 'start',
    },
  },
}

const components: DeepPartial<ThemeComponents> = {
  Avatar: {
    baseStyle: (props: Record<string, any>) => ({
      container: {
        bg: `${props.colorScheme}.500`,
        color: 'white',
      },
    }),
  },
  Button: {
    sizes: {
      md: {
        h: 'auto',
        padding: '10px 16px',
        ...textStyles.subhead1,
      },
    },
    baseStyle: {
      borderRadius: '4px',
      _focus: {
        boxShadow: `0 0 0 4px ${colors.primary[200]}`,
      },
    },
    variants: {
      outline: {
        padding: '9px 15px',
        borderColor: 'primary.500',
        color: 'primary.500',
      },
      stretch: {
        width: '100%',
        paddingTop: '16px',
        paddingBottom: '16px',
      },
      inlineLink: (props) => {
        const { colorScheme: c } = props
        return {
          padding: 0,
          height: 'auto',
          lineHeight: 'normal',
          verticalAlign: 'baseline',
          color: `${c}.500`,
          paddingInline: 0,
          textDecoration: 'underline',
          _active: {
            color: `${c}.700`,
          },
        }
      },
    },
  },
  Checkbox: {
    baseStyle: (props: Record<string, any>) => ({
      control: {
        borderRadius: '4px',
        borderColor: `${props.colorScheme}.500`,
      },
    }),
    sizes: {
      xl: {
        control: { w: 6, h: 6 },
        label: { fontSize: 'lg' },
        icon: { fontSize: '0.75rem' },
      },
    },
  },
  Table: {
    baseStyle: {
      th: {
        textTransform: 'none',
        background: 'primary.200',
      },
      td: {
        verticalAlign: 'top',
        _first: {
          paddingLeft: '32px',
        },
      },
    },
    variants: {
      simple: {
        th: {
          padding: '18px 32px',
          color: 'primary.600',
          ...textStyles.subhead2,
        },
        td: {
          padding: '20px 32px',
        },
      },
    },
  },
  Menu: {
    baseStyle: {
      item: {
        paddingTop: '12px',
        paddingBottom: '12px',

        _focus: {
          background: 'primary.200',
        },

        _hover: {
          background: 'primary.100',
        },
      },
    },
  },
  Modal: {
    baseStyle: (props: Record<string, any>) => ({
      header: {
        background: `${props.colorScheme}.500`,
        color: 'white',
        borderRadius: '24px 24px 0 0',
        padding: '20px 48px',
        ...textStyles.subhead3,
      },
      dialog: {
        borderRadius: '24px',
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        paddingY: 0,
        paddingX: '48px',
      },
      footer: {
        padding: '28px 48px 48px 48px',
        justifyContent: 'flex-start',
      },
    }),
    sizes: {
      create: {
        dialog: { maxW: '42.5rem' },
      },
    },
  },
  Divider: {
    baseStyle: {
      borderColor: 'neutral.300',
      opacity: 1,
    },
  },
  Drawer: {
    baseStyle: {
      header: {
        px: 0,
        pt: '56px',
        pb: 0,
        color: 'primary.700',
        ...textStyles.h3,
      },
      body: {
        px: 0,
        py: '24px',
      },
    },
  },
  Link: {
    baseStyle: {
      textDecoration: 'underline',
    },
  },
  Switch: {
    baseStyle: (props: Record<string, any>) => ({
      track: {
        _disabled: {
          _checked: {
            opacity: 1,
            background: `${props.colorScheme}.400`,
          },
        },
      },
    }),
    variants: {
      coloredThumb: (props: Record<string, any>) => ({
        thumb: {
          background: `${props.colorScheme}.200`,
        },
      }),
    },
  },
  Tabs: {
    sizes: {
      md: {
        tab: {
          ...textStyles.subhead3,
          mx: '16px',
          px: 0,
          pt: 0,
          pb: '4px',
          _first: {
            ml: '32px',
          },
        },
      },
    },
    baseStyle: {
      tabpanel: { p: 0 },
      tab: {
        _focus: {
          boxShadow: 'none',
        },
      },
    },
    variants: {
      line: (props: Record<string, any>) => ({
        tablist: {
          paddingBottom: '2px',
          borderColor: 'neutral.300',
        },
        tab: {
          color: `${props.colorScheme}.300`,
          _selected: {
            color: `${props.colorScheme}.500`,
          },
        },
      }),
    },
  },
  Input: {
    baseStyle: {
      field: {
        _focus: {
          boxShadow: 'none',
        },
      },
    },
    variants: {
      outline: {
        field: {
          borderColor: 'neutral.400',
          background: 'white',
          _focus: {
            borderColor: 'primary.500',
            borderWidth: '2px',
            boxShadow: 'none',
          },
          _hover: {
            borderColor: 'primary.500',
            boxShadow: 'none',
          },
          _disabled: {
            background: 'neutral.200',
            opacity: 1,
            color: 'neutral.500',
          },
        },
      },
    },
    sizes: {
      md: {
        field: {
          ...textStyles.body1,
          px: 4,
          h: '44px',
          borderRadius: 'base',
        },
        addon: {
          ...textStyles.body1,
          px: 4,
          h: '44px',
          borderRadius: 'base',
        },
      },
    },
  },
  Progress: {
    baseStyle: (props: Record<string, any>) => ({
      filledTrack: {
        bgColor: `${props.colorScheme}.300`,
      },
      track: {
        bgColor: 'neutral.200',
      },
    }),
  },
  Radio: {
    baseStyle: (props: Record<string, any>) => ({
      label: {
        color: 'neutral.900',
      },
      control: {
        borderColor: `${props.colorScheme}.500`,
        _checked: {
          background: 'none',
          _before: {
            background: `${props.colorScheme}.500`,
          },
        },
      },
    }),
    sizes: {
      md: {
        label: {
          ...textStyles.body1,
          py: '10px',
          pl: '16px',
        },
        control: {
          height: '24px',
          width: '24px',
          _checked: {
            _before: {
              height: '16px',
              width: '16px',
            },
          },
        },
      },
    },
  },
  Select: {
    baseStyle: {
      field: {
        _focus: {
          boxShadow: 'none',
        },
      },
    },
    variants: {
      outline: {
        field: {
          borderColor: 'neutral.400',
          _focus: {
            borderColor: 'primary.500',
            borderWidth: '2px',
          },
          _hover: {
            borderColor: 'primary.500',
          },
        },
      },
    },
    sizes: {
      md: {
        field: {
          ...textStyles.body1,
          px: 4,
          h: '44px',
          borderRadius: 'base',
        },
        addon: {
          ...textStyles.body1,
          px: 4,
          h: '44px',
          borderRadius: 'base',
        },
      },
    },
  },
  Stat: {
    sizes: {
      text: {
        label: {
          ...textStyles.caption1,
        },
        number: {
          ...textStyles.subhead1,
        },
      },
      md: {
        label: {
          ...textStyles.caption1,
        },
        number: {
          ...textStyles.h3,
        },
      },
    },
    baseStyle: {
      label: {
        color: 'neutral.500',
      },
      number: {
        color: 'neutral.800',
      },
      container: {
        flexShrink: 0,
        flexBasis: 'auto',
      },
    },
  },
  Tooltip: {
    baseStyle: {
      paddingX: '12px',
      paddingY: '8px',
      color: 'white',
      background: 'neutral.900',
      ...textStyles.body2,
    },
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  colors,
  fonts,
  components,
  styles,
  textStyles,
}
