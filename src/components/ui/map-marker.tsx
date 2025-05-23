import { COLORFUL_MARKER, type ColorfulMarkerType } from '@/types/map'
import { MapMarker } from 'react-kakao-maps-sdk'

export function ColorfulMapMarker ({ type, bigger = false, ...props }: React.ComponentProps<typeof MapMarker> & {
  type: ColorfulMarkerType
  bigger?: boolean
}) {
  return (
    <MapMarker
      image={{
        src: COLORFUL_MARKER[type].src,
        size: {
          width: bigger ? 29 * 2 : 29,
          height: bigger ? 41 * 2 : 41
        }
      }}
      {...props}
    />
  )
}
