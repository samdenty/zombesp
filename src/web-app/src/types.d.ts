type GetComponentProps<T> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : T extends React.ComponentType<infer P> | React.Component<infer P>
    ? P
    : never
