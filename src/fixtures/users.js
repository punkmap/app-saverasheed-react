import PropTypes from 'prop-types'

const { string, any, arrayOf, shape, bool, objectOf } = PropTypes

export const user1 = {
  shownIntro: true,
  displayName: 'Rasheed Bustamam',
  email: 'rasheed.bustamam@gmail.com',
  emailVerified: true,
  photoURL: 'https://graph.facebook.com/10155588132372213/picture',
  isAnonymous: false,
  uid: 'gDT8uhK31jfl3b9DjFMO6lb8KL33',
  providerData: [
    {
      uid: '10155588132372213',
      displayName: 'Rasheed Bustamam',
      photoURL: 'https://graph.facebook.com/10155588132372213/picture',
      email: 'rasheed.bustamam@gmail.com',
      phoneNumber: null,
      providerId: 'facebook.com',
    },
    {
      uid: '109634673536241894918',
      displayName: 'Rasheed Bustamam',
      photoURL:
        'https://lh6.googleusercontent.com/-Y85aAuUNHy0/AAAAAAAAAAI/AAAAAAAAA6g/9GLltrJuc1U/photo.jpg',
      email: 'rasheed.bustamam@gmail.com',
      phoneNumber: null,
      providerId: 'google.com',
    },
    {
      uid: 'rasheed.bustamam@gmail.com',
      displayName: 'Rasheed Bustamam',
      photoURL: 'https://graph.facebook.com/10155588132372213/picture',
      email: 'rasheed.bustamam@gmail.com',
      phoneNumber: null,
      providerId: 'password',
    },
    {
      displayName: null,
      email: 'rasheed.bustamam@gmail.com',
      phoneNumber: null,
      photoURL: null,
      providerId: 'portis',
      uid: '0x204E3391dF22E7D25ebf2c9884dFE38Be4398A25',
    },
  ],
  activeQuest: 'QmPKwbQSuraVkoJ31tyhRqgd8gqL1SRFNZHuULcdrjGH43',
  address: '0x204E3391dF22E7D25ebf2c9884dFE38Be4398A25',
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU0MDMzNzM1NSwiZXhwIjoxNTQwMzQwOTU1LCJpc3MiOiJ4eW8tbmV0d29yay0xNTIyODAwMDExODA0QGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6Inh5by1uZXR3b3JrLTE1MjI4MDAwMTE4MDRAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiMHgyMDRlMzM5MWRmMjJlN2QyNWViZjJjOTg4NGRmZTM4YmU0Mzk4YTI1In0.gXqjj0WyNob5gAdaQL_8JTyWviOSDdP658s4QgPbTF51LWJYboPDLQs4En-AL0dgDkursz0ZcfvduGtTNndA51xeRtVQGW-lg4QqDPPG64lNckzn38a4Pr6y_Mp1FCEf0xHO75UCDTmWe9grmFdku1i1gdqs0YfAe29pao9NwAPRc03kcqCOQM05L7O_aV0uGsFHcGnT6z0lcsga5XY2f90O8cGB5KXEM8W2anUna1tzCOGlGQjOIhD8ax8AGNPOOFt2kkSnloE4Rl9QX_tEMxkFOQ9LR4De9kZ1wOLVU4fkICChzUYGnjSF4f8M4UQjNctfstJhMlguJZyFbMHenw',
  checkins: {
    QmPKwbQSuraVkoJ31tyhRqgd8gqL1SRFNZHuULcdrjGH43: [
      {
        createdAt: '1540934679658',
        id: 'poi.2360370',
        quadkey: '0230132212123123131300',
      },
      {
        createdAt: '1541011581077',
        id: 'poi.2362169',
        quadkey: '0230132212123123023211',
      },
    ],
  },
}

export const user2 = {
  shownIntro: false,
  displayName: 'Rasheed Bustamam',
  email: 'rasheed.bustamam@gmail.com',
  emailVerified: true,
  photoURL: 'https://graph.facebook.com/10155588132372213/picture',
  isAnonymous: false,
  uid: 'gDT8uhK31jfl3b9DjFMO6lb8KL33',
  providerData: [
    {
      uid: '10155588132372213',
      displayName: 'Rasheed Bustamam',
      photoURL: 'https://graph.facebook.com/10155588132372213/picture',
      email: 'rasheed.bustamam@gmail.com',
      phoneNumber: null,
      providerId: 'facebook.com',
    },
    {
      uid: '109634673536241894918',
      displayName: 'Rasheed Bustamam',
      photoURL:
        'https://lh6.googleusercontent.com/-Y85aAuUNHy0/AAAAAAAAAAI/AAAAAAAAA6g/9GLltrJuc1U/photo.jpg',
      email: 'rasheed.bustamam@gmail.com',
      phoneNumber: null,
      providerId: 'google.com',
    },
    {
      uid: 'rasheed.bustamam@gmail.com',
      displayName: 'Rasheed Bustamam',
      photoURL: 'https://graph.facebook.com/10155588132372213/picture',
      email: 'rasheed.bustamam@gmail.com',
      phoneNumber: null,
      providerId: 'password',
    },
    {
      displayName: null,
      email: 'rasheed.bustamam@gmail.com',
      phoneNumber: null,
      photoURL: null,
      providerId: 'portis',
      uid: '0x204E3391dF22E7D25ebf2c9884dFE38Be4398A25',
    },
  ],
  activeQuest: 'QmPKwbQSuraVkoJ31tyhRqgd8gqL1SRFNZHuULcdrjGH43',
  address: '0x204E3391dF22E7D25ebf2c9884dFE38Be4398A25',
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU0MDMzNzM1NSwiZXhwIjoxNTQwMzQwOTU1LCJpc3MiOiJ4eW8tbmV0d29yay0xNTIyODAwMDExODA0QGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6Inh5by1uZXR3b3JrLTE1MjI4MDAwMTE4MDRAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiMHgyMDRlMzM5MWRmMjJlN2QyNWViZjJjOTg4NGRmZTM4YmU0Mzk4YTI1In0.gXqjj0WyNob5gAdaQL_8JTyWviOSDdP658s4QgPbTF51LWJYboPDLQs4En-AL0dgDkursz0ZcfvduGtTNndA51xeRtVQGW-lg4QqDPPG64lNckzn38a4Pr6y_Mp1FCEf0xHO75UCDTmWe9grmFdku1i1gdqs0YfAe29pao9NwAPRc03kcqCOQM05L7O_aV0uGsFHcGnT6z0lcsga5XY2f90O8cGB5KXEM8W2anUna1tzCOGlGQjOIhD8ax8AGNPOOFt2kkSnloE4Rl9QX_tEMxkFOQ9LR4De9kZ1wOLVU4fkICChzUYGnjSF4f8M4UQjNctfstJhMlguJZyFbMHenw',
  checkins: {
    QmPKwbQSuraVkoJ31tyhRqgd8gqL1SRFNZHuULcdrjGH43: [
      {
        createdAt: '1540934679658',
        id: 'poi.2360370',
        quadkey: '0230132212123123131300',
      },
      {
        createdAt: '1541011581077',
        id: 'poi.2362169',
        quadkey: '0230132212123123023211',
      },
    ],
  },
}

export default [user1, user2]

const checkinPropTypes = objectOf(
  arrayOf(
    shape({
      createdAt: string.isRequired,
      id: string.isRequired,
      quadkey: string.isRequired,
    }),
  ),
)

export const userPropTypes = shape({
  shownIntro: bool,
  emailVerified: bool,
  isAnonymous: bool,
  uid: string.isRequired,
  username: string,
  displayName: string,
  email: string.isRequired,
  photoURL: string,
  providerData: arrayOf(
    shape({
      uid: string.isRequired,
      displayName: string,
      photoURL: string,
      email: string,
      phoneNumber: string,
      providerId: string.isRequired,
    }),
  ),
  activeQuest: string,
  address: string,
  checkins: checkinPropTypes,
  completedQuests: arrayOf(any),
})
