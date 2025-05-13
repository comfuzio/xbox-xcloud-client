import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
  } from 'react'
  import { Button } from '@heroui/react'
  
  interface ViewportGridProps {
    drawPagination?: boolean
    maxHeight?: number
    children: React.ReactNode
  }
  
  const PAGINATION_HEIGHT = 0
  const GAP_SIZE = 16
  const ITEM_WIDTH = 250
  const ITEM_HEIGHT = 250+(GAP_SIZE*1)
  
  const ViewportGrid: React.FC<ViewportGridProps> = ({
    drawPagination = false,
    maxHeight = -1,
    children,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [itemsPerPage, setItemsPerPage] = useState<number>(Infinity)
    const [page, setPage] = useState<number>(0)
  
    const childrenArray = useMemo(() => React.Children.toArray(children), [children])
    const totalPages = Math.ceil(childrenArray.length / itemsPerPage)
  
    const updateLayout = useCallback(() => {
        const container = containerRef.current
        if (!container) return
      
        let availableHeight =
          maxHeight < 0
            ? window.innerHeight - container.getBoundingClientRect().top - 80
            : maxHeight
      
        if (drawPagination) {
          availableHeight -= PAGINATION_HEIGHT
        }
      
        container.style.height = `${availableHeight}px`
      
        const itemsPerRow = Math.floor(container.clientWidth / ITEM_WIDTH)
        const itemsPerCol = Math.floor(availableHeight / ITEM_HEIGHT)
        const fitCount = Math.max(itemsPerRow * itemsPerCol, 6)

        console.log('Sizing debug:', itemsPerRow, itemsPerCol, fitCount, container.clientWidth, availableHeight)
      
        setItemsPerPage(fitCount)
      
        const newTotalPages = Math.ceil(childrenArray.length / fitCount)
        if (page >= newTotalPages) {
          setPage(0)
        }
      }, [drawPagination, maxHeight, childrenArray.length, page])
      
  
    useEffect(() => {
      updateLayout()
  
      const resizeObserver = new ResizeObserver(updateLayout)
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current)
      }
  
      return () => {
        resizeObserver.disconnect()
      }
    }, [updateLayout])
  
    const visibleChildren = useMemo(() => {
      const offset = page * itemsPerPage
      return childrenArray.slice(offset, offset + itemsPerPage)
    }, [page, itemsPerPage, childrenArray])
  
    const handlePageChange = (newPage: number) => {
      setPage(newPage)
      window.scrollTo({ top: 0 })
    }
  
    const renderPagination = () => {
      const buttons = []
  
      buttons.push(
        <Button
          key="prev"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="btn-small"
        >
          Previous
        </Button>
      )
  
      for (let i = 0; i < totalPages; i++) {
        const shouldShow =
          i === 0 ||
          i === totalPages - 1 ||
          (i >= page - 2 && i <= page + 2)
  
        if (shouldShow) {
          buttons.push(
            <Button
              key={i}
              onClick={() => handlePageChange(i)}
              color={ page === i ? 'primary' : 'default' }
            >
              {i + 1}
            </Button>
          )
        } else if (
          i === page - 3 ||
          i === page + 3
        ) {
          buttons.push(
            <Button
              key={`ellipsis-${i}`}
              isDisabled
            >
              ...
            </Button>
          )
        }
      }
  
      buttons.push(
        <Button
          key="next"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="btn-small"
        >
          Next
        </Button>
      )
  
      return <div id="component_viewportgrid_pagination">{ buttons.map((button) => (<>{button} &nbsp;</>)) }</div>
    }
  
    return (
      <>
        <div
          ref={containerRef}
          className={ "flex items-center text-center flex-wrap justify-start gap-4" }
          style={{
            // display: 'grid',
            // gridTemplateColumns: `repeat(auto-fill, minmax(${ITEM_WIDTH}px, 1fr))`,
            // gap: `${GAP_SIZE}px`,
            justifyItems: 'center',
            alignItems: 'start',
            // overflow: 'hidden',
            height: maxHeight < 0 ? 'auto' : maxHeight,
          }}
        >
          {visibleChildren.map((child, index) => (
            <div
              key={index}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
              }}
            >
              {React.isValidElement(child) ? React.cloneElement(child) : child}
            </div>
          ))}
        </div>
        {drawPagination && renderPagination()}
      </>
    )
  }
  
  export default ViewportGrid
  