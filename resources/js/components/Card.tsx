
export const Card = ({ xs = false, sm = false, lg = false, className = '', shadow = false, children }) => (
  <div className={`${className} ${shadow ? 'shadow-md ' : ''}w-full border rounded-xl border-chrome-50 dark:border-chrome-800 bg-chrome-50 dark:bg-chrome-800 p-4 sm:p-6`}>
    {children}
  </div>
)