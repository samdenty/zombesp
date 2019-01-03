import { Link } from '@esprat/connection'

export const sortLinkLastOnline = (aLink: Link, bLink: Link) =>
  aLink.lastOnline === bLink.lastOnline
    ? 0
    : aLink.lastOnline > bLink.lastOnline
      ? -1
      : 1

export const sortLinkLastConnected = (aLink: Link, bLink: Link) =>
  aLink.lastConnected === bLink.lastConnected
    ? 0
    : aLink.lastConnected > bLink.lastConnected
      ? -1
      : 1

export const sortLinkOnline = (aLink: Link, bLink: Link) =>
  aLink.online ? -1 : bLink.online ? 1 : 0
