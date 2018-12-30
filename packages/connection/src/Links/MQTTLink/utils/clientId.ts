export const createClientId = () =>
  `@esprat/link#${Math.random()
    .toString(16)
    .substr(2, 8)}`
