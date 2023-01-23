import { Link } from '.'

export default function ({ className = '', breadcrumbs }) {

  const last = (key, array) => (key + 1) === array.length
  
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol role="list" className="flex items-center space-x-1">
        
        {breadcrumbs.map((breadcrumb, key) => (

          <li key={`${key}_${breadcrumb.name.replace(' ', '_').toLowerCase()}`} className="flex items-center space-x-1">

            {key > 0 && (
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-5 w-4 text-chrome-300 dark:text-chrome-800"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"></path>
              </svg>
            )}

            {breadcrumb.href && !last(key, breadcrumbs) ? (

              <Link
                href={breadcrumb.href}
                title={breadcrumb.name}
                className="text-sm text-chrome-400 dark:text-chrome-700 transition-colors hover:text-chrome-600 dark:hover:text-chrome-600"
              >
                {breadcrumb.name}
              </Link>

            ) : (

              <span className="cursor-default text-sm text-chrome-600 dark:text-chrome-600">
                {breadcrumb.name}
              </span>

            )}

          </li>

        ))}

      </ol>
    </nav>
  )
}