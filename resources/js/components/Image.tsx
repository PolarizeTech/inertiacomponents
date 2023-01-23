export default function ({ src, aspectRatio = '', className = '', style = '', div = false, children, ...props }) {

  aspectRatio = aspectRatio ? `aspect-${aspectRatio}` : ''

  const Img = (
    <img
      src={src}
      className={`${className} block max-w-full h-auto`}
      style={style}
      {...props} />
  )

  const Div = (
    <div
      className={`${className} bg-no-repeat bg-cover ${aspectRatio}`}
      style={`background-image: url(${src}); ${style}`}
    >
      {children}
    </div>
  )

  if (!src) {
    return (
      <></>
    )
  }

  return div ? Div : Img
}