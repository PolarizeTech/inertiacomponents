const handleOpenCalendly = () => {
  const wrapper = document.getElementById('calendly_embed_wrapper')
  wrapper.classList.remove('hidden')
  document.body.classList.add('overflow-hidden')
  setTimeout(() => wrapper.classList.remove('opacity-0'), 5)
}

const handleCloseCalendly = () => {
  const wrapper = document.getElementById('calendly_embed_wrapper')
  wrapper.classList.add('opacity-0')
  document.body.classList.remove('overflow-hidden')
  setTimeout(() => wrapper.classList.add('hidden'), 201)
}

export const initCalendly = () => {

  if (
    !import.meta.env.VITE_CALENDLY_LINK ||
    document.getElementById('calendly_embed') !== null
  ) {
    return
  }

  window.calendlyInitiated = true

  let scriptUrl    = 'https://assets.calendly.com/assets/external/widget.js',
      script       = document.createElement('script'),
      embedDiv     = document.createElement('div'),
      wrapperDiv   = document.createElement('div'),
      closeBarrier = document.createElement('div'),
      closeButton  = document.createElement('button'),
      closeIcon    = '<svg style=\"height: 22px; width: 22px;\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z\" /></svg>'
  
  wrapperDiv.id = 'calendly_embed_wrapper'
  embedDiv.id = 'calendly_embed'

  embedDiv.addEventListener('open-calendly', handleOpenCalendly, false)
  embedDiv.addEventListener('close-calendly', handleCloseCalendly, false)

  script.src = scriptUrl

  script.onload = () => {
    const calendlyLink = `${import.meta.env.VITE_CALENDLY_LINK}?${[
      'hide_landing_page_details=1',
      'hide_event_type_details=1',
      'hide_gdpr_banner=1'
    ].join('&')}`

    Calendly.initInlineWidget({
      url: calendlyLink,
      parentElement: document.getElementById('calendly_embed'),
      // prefill: {},
      // utm: {}
    })
  }

  embedDiv.classList = [
    'relative',
    'z-10',
    'w-[400px]',
    'max-w-full',
    'h-[500px]',
    'max-h-full',
    'rounded-3xl',
    'overflow-hidden',
    'bg-white',
    'm-6',
    'md:m-8',
    'shadow-2xl',
  ].join(' ')

  wrapperDiv.classList = [
    'fixed',
    'inset-0',
    'flex',
    'items-center',
    'justify-center',
    'z-[100]',
    'h-screen',
    'w-full',
    'bg-white',
    'bg-opacity-50',
    'transition-all',
    'duration-200',
    
    // Load hidden
    'hidden',
    'opacity-0',
  ].join(' ')

  closeButton.classList = [
    'rounded-full',
    'p-1',
    'absolute',
    'z-20',
    'hover:cursor-pointer',
    'top-4',
    'right-4',
    'bg-chrome-300',
    'bg-opacity-0',
    'hover:bg-opacity-50',
    'transition-all',
    'text-chrome-500',
    'hover:text-chrome-800',
    'flex',
    'items-center',
    'justify-center',
  ].join(' ')

  closeBarrier.classList = [
    'absolute',
    'z-[2]',
    'inset-0',
  ].join(' ')

  closeBarrier.onclick = () => (
    document
      .getElementById('calendly_embed')
      .dispatchEvent(
        new Event('close-calendly')
      )
  )

  closeButton.innerHTML = closeIcon

  closeBarrier.append(closeButton)

  wrapperDiv.append(closeBarrier)
  wrapperDiv.append(embedDiv)

  document.body.append(script)
  document.body.append(wrapperDiv)
}

export const openCalendly = () => {

  if (document.getElementById('calendly_embed') === null) {
    return
  }

  document
    .getElementById('calendly_embed')
    .dispatchEvent(
      new Event('open-calendly')
    )
}