import React, { PropsWithChildren } from 'react'
import { NoneFound, Link, Icon, ButtonGroup } from '.'

export default ({
  
  items,
  itemTitle = null,
  itemRoute,
  itemActions,

  headingIcon = '',
  heading = '',

  noneFoundButtonText,
  noneFoundButtonRoute = null,

  className = ''

}) => {
  return (
    <div className={className}>

      {heading && (
          <h3 className="font-medium pb-5 flex items-center space-x-1">
            {headingIcon && (
              <Icon name={headingIcon} className="text-chrome-400 dark:text-chrome-600" />
            )}
            <span className="text-chrome-500">{heading}</span>
          </h3>
      )}

      <div role="list" className="space-y-3">

        {items.length ? items.map((item, index) => (

          <ListItem
            key={item.id || index} 
            item={item}
            itemTitle={itemTitle}
            itemRoute={itemRoute}
            itemActions={itemActions} 
            />

        )) : (
        
          <NoneFound
            buttonText={noneFoundButtonText}
            buttonRoute={noneFoundButtonRoute} />
        
        )}

      </div>

    </div>
  )
}

export const ListItem = ({ item, itemTitle = null, itemRoute, itemActions }) => {

  if (typeof itemRoute === 'function') {
    itemRoute = itemRoute(item) 
  } else if (typeof itemRoute !== 'string') {
    itemRoute = null
  }

  let ListItemWrapper = ({ href = null, children, ...props }) => (
    href ? (
      <Link href={href} {...props}>{children}</Link>
    ) : (
      <div {...props}>{children}</div>
    )
  )

  return (
    <div className={`${itemRoute ? 'group ' : ''}rounded-xl bg-chrome-50 dark:bg-chrome-800 overflow-hidden`}>
      <ListItemWrapper href={itemRoute} className="block transition-colors">

        <div className="px-4 py-4 flex items-center sm:px-6">

          <div className={`${itemRoute ? 'group-hover:text-chrome-800 dark:group-hover:text-chrome-200 ' : ''}flex-1 select-all font-medium text-chrome-600 transition-colors truncate`}>
            {itemTitle !== null ? itemTitle(item) : (item.title || item.name)}
          </div>

          <div className="ml-5 flex-shrink-0">
            {itemActions && (
              <ButtonGroup items={typeof itemActions == 'function' ? itemActions(item) : itemActions} />
            )}

            {itemRoute && !itemActions && (
              <Icon
                name="arrow-small-right"
                className="text-chrome-200 dark:text-chrome-700 group-hover:text-chrome-800 dark:group-hover:text-chrome-200 transition-colors"
                fw />
            )}
          </div>

        </div>

      </ListItemWrapper>
    </div>
  )
}