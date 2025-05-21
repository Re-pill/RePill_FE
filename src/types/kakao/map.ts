export const KAKAO_MAP_API_URL = 'https://dapi.kakao.com/v2/local'

export interface CoordToAddressParams {
  x: string
  y: string
}

export interface CoordToAddressResponse {
  documents: {
    address: {
      address_name: string
    }
    road_address: {
      address_name: string
    }
  }[]
}

export interface SearchByKeywordParams {
  query: string
  x?: string
  y?: string
  radius?: number
}

export interface SearchByKeywordResponse {
  documents: {
    address_name: string
    road_address_name: string
    x: string
    y: string
  }[]
}
