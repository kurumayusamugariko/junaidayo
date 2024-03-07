import { SpComponent } from './SpComponent'
import { PcComponent } from './PcComponent'
import { useMediaQuery } from './UseMediaQuery'

export const ResponsiveComponent = () => {
  const isSp = useMediaQuery('(max-width: 752px)')
  const isTablet = useMediaQuery('(min-width: 752px) and (max-width: 1122px)')

  return (
    <>
      {isSp && <SpComponent />}
      {isTablet && <PcComponent />}
      {!isSp && !isTablet && <PcComponent />}
    </>
  )
}
