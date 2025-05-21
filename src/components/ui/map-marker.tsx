import { COLORFUL_MARKER, type ColorfulMarkerType } from '@/types/map'
import { MapMarker } from 'react-kakao-maps-sdk'

export function ColorfulMapMarker ({ type, ...props }: React.ComponentProps<typeof MapMarker> & {
  type: ColorfulMarkerType
}) {
  return (
    <MapMarker
      image={{
        src: COLORFUL_MARKER[type].src,
        size: {
          width: 29,
          height: 41
        }
      }}
      {...props}
    />
  )
}
